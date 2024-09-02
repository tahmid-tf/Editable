import { useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { json, Link, useNavigate } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';
import StyleCard from './StyleCards/StyleCard';
import PriceCard from './StyleCards/PriceCard';
import NewOrderNav from './NewOrderNav';
import {
	useGetValueForOrderCalculationForUserMutation,
	useGetValueForOrderCalculationMutation,
	usePlaceOrderMutation
} from '../orderApi';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectOrderState } from '../orderSlice';
import { getMaxThreshold } from 'src/app/appUtils/appUtils';
import dayjs from 'dayjs';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import PaymentModal from './PaymentModal';
import PaymentSuccessModal from './PaymentSuccessModal';

// Validation Schema
const validationSchema = Yup.object({
	selectedStyle: Yup.string().required('A style is required'),
	maxThreshold: Yup.number(),
	imageQuantity: Yup.number()
		.required('Image amount is required')
		.test('min-value', function (value) {
			const { maxThreshold } = this.parent;
			if (maxThreshold !== undefined && value !== undefined) {
				if (value < maxThreshold) {
					return this.createError({
						message: `Minimum image quantity should be ${maxThreshold}`
					});
				}
			}
			return true;
		}),
	driveLink: Yup.string().required('Drive link is required'),
	cullDownTotalImages: Yup.string().when('additionalEdits.culling', (culling) =>
		culling[0] ? Yup.string().required('Cull down total images is required.') : Yup.string()
	),
	imageSelectionMethodCulling: Yup.string().when('additionalEdits.culling', (culling) =>
		culling[0] ? Yup.string().required('Please select one option') : Yup.string()
	),
	imageSelectionMethodSkinRetouching: Yup.string().when('additionalEdits.skinRetouching', (skinRetouching) =>
		skinRetouching[0] ? Yup.string().required('Please select one option') : Yup.string()
	)
});
const initialValues = {
	selectedStyle: '',
	selectedMainStyleId: 0,
	selectedAdditionalStyleId: [],
	additionalStyle: [],
	additionalEdits: {
		culling: false,
		skinRetouching: false,
		previewEdits: false
	},
	imageQuantity: '',
	driveLink: '',
	cullDownTotalImages: '',
	imageSelectionMethodCulling: '',
	imageSelectionMethodSkinRetouching: '',
	maxThreshold: 0
};
const PickStyle = ({ onPickStyleSubmit, allStyleData }) => {
	const orderState = useAppSelector(selectOrderState);
	const dispatch = useAppDispatch();

	const userRole = useAppSelector(selectUserRole);
	const [showCullingInputs, setShowCullingInputs] = useState(false);
	const [showSkinRetouchingInputs, setshowSkinRetouchingInputsInputs] = useState(false);
	const [orderCalcValue, setOrderCalcValue] = useState({});
	const [isBasicColorSelected, setIsBasicColorSelected] = useState(false);
	const [orderType, setOrderType] = useState(orderState.order_type);

	const [paymentModalInfo, setPaymentModalInfo] = useState(null);
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [openPaymentSuccessModal, setOpenPaymentSuccessModal] = useState(false);

	const [getValueForOrderCalculation, { data }] =
		userRole === 'admin'
			? useGetValueForOrderCalculationMutation()
			: useGetValueForOrderCalculationForUserMutation();

	const [placeOrder, { isLoading }] = usePlaceOrderMutation();

	const styleData = allStyleData?.filter((data) => data?.additional_style === 'no');
	const additionalData = allStyleData?.filter((data) => data?.additional_style === 'yes');
	console.log(allStyleData);
	const handleCullingChange = (e, setFieldValue) => {
		const isChecked = e.target.checked;
		setFieldValue('additionalEdits.culling', isChecked);
		setShowCullingInputs(isChecked);
	};
	const handleSkinRetouchingChange = (e, setFieldValue) => {
		const isChecked = e.target.checked;
		setFieldValue('additionalEdits.skinRetouching', isChecked);
		setshowSkinRetouchingInputsInputs(isChecked);
	};

	// culling skinretuching and additional info => Image Quantity showing

	const [firstSelected, setFirstSelected] = useState('');
	const [showInput, setShowInput] = useState({
		culling: false,
		skinRetouching: false,
		default: true // Show input in default section initially
	});

	const handleCheckboxChange = (name, checked, setFieldValue, values) => {
		setFieldValue(`additionalEdits.${name}`, checked);

		if (checked && !firstSelected) {
			setFirstSelected(name);
			setShowInput({
				culling: name === 'culling',
				skinRetouching: name === 'skinRetouching',
				default: false
			});
		} else if (!checked && firstSelected === name) {
			setFirstSelected('');

			if (name === 'culling' && values.additionalEdits.skinRetouching) {
				setFirstSelected('skinRetouching');
				setShowInput({
					culling: false,
					skinRetouching: true,
					default: false
				});
			} else if (name === 'skinRetouching' && values.additionalEdits.culling) {
				setFirstSelected('culling');
				setShowInput({
					culling: true,
					skinRetouching: false,
					default: false
				});
			} else {
				setShowInput({
					culling: false,
					skinRetouching: false,
					default: true
				});
			}
		} else if (checked) {
			if (firstSelected === 'culling' && name === 'skinRetouching') {
				setShowInput({
					culling: true,
					skinRetouching: false,
					default: false
				});
			} else if (firstSelected === 'skinRetouching' && name === 'culling') {
				setShowInput({
					culling: false,
					skinRetouching: true,
					default: false
				});
			}
		}
	};

	const handleMainStyleClick = async (e, id, values, setFieldValue) => {
		setFieldValue('selectedStyle', e.target.value);
		setFieldValue('selectedMainStyleId', id);
		setIsBasicColorSelected(false);
		await getValueForOrderCalculation({
			category_id: orderState.category,
			styles_array: [id, ...values?.selectedAdditionalStyleId]
		}).then((calculatedData) => {
			const maxThreshold = getMaxThreshold(calculatedData?.data, values.additionalEdits);
			setFieldValue('maxThreshold', maxThreshold);
			setOrderCalcValue(calculatedData.data);
		});
	};
	const handleAdditionalStyleClick = async (e, additionalStyleId, values, setFieldValue) => {
		const allAdditionalStyles = new Set(values.additionalStyle);
		const allAdditionalStylesId = new Set(values.selectedAdditionalStyleId);

		if (allAdditionalStyles.has(e.target.value) && allAdditionalStylesId.has(additionalStyleId)) {
			allAdditionalStyles.delete(e.target.value);
			allAdditionalStylesId.delete(additionalStyleId);

			await getValueForOrderCalculation({
				category_id: orderState.category,
				styles_array: [values.selectedMainStyleId, ...Array.from(allAdditionalStylesId)]
			}).then((calculatedData) => {
				const maxThreshold = getMaxThreshold(calculatedData?.data, values.additionalEdits);
				setFieldValue('maxThreshold', maxThreshold);
				setOrderCalcValue(calculatedData.data);
			});
		} else {
			allAdditionalStyles.add(e.target.value);
			allAdditionalStylesId.add(additionalStyleId);

			await getValueForOrderCalculation({
				category_id: orderState.category,
				styles_array: [values.selectedMainStyleId, ...values?.selectedAdditionalStyleId, additionalStyleId]
			}).then((calculatedData) => {
				const maxThreshold = getMaxThreshold(calculatedData?.data, values.additionalEdits);
				setFieldValue('maxThreshold', maxThreshold);
				setOrderCalcValue(calculatedData.data);
			});
		}

		setFieldValue('additionalStyle', Array.from(allAdditionalStyles));
		setFieldValue('selectedAdditionalStyleId', Array.from(allAdditionalStylesId));
	};

	const handlePaymentModalClose = () => {
		setOpenPaymentModal(false);
	};
	const handlePaymentSuccessModalClose = () => {
		setOpenPaymentSuccessModal(false);
		onPickStyleSubmit();
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values) => {
				const userInfo = {
					users_email: orderState.email,
					users_phone: orderState.phone
				};
				const orderInfo = {
					order_type: orderType,
					order_name: orderState.order_name,
					category_id: orderState.category,
					order_status: 'pending',
					editors_id: '1'
				};
				const styleInfo = {
					file_uploaded_by_user: values.driveLink,
					styles_array: JSON.stringify([values.selectedMainStyleId, ...values.selectedAdditionalStyleId]),
					number_of_images_provided: values.imageQuantity,
					culling: values.additionalEdits.culling ? 'yes' : 'no',
					images_culled_down_to: `${values?.cullDownTotalImages}`,
					select_image_culling_type: values?.imageSelectionMethodCulling,
					skin_retouching: values.additionalEdits.skinRetouching ? 'yes' : 'no',
					skin_retouching_type: values?.imageSelectionMethodSkinRetouching,
					preview_edits: values.additionalEdits.previewEdits ? 'yes' : 'no'
				};
				const paymentInfo = {
					payment_status: orderState.payment_status,
					amount: `${orderState.amount}`
				};
				const body = {
					...userInfo,
					...orderInfo,
					...styleInfo,
					...paymentInfo
				};

				if (userRole.includes('user')) {
					setPaymentModalInfo({
						...orderInfo,
						...styleInfo,
						...paymentInfo,
						amount: Number(paymentInfo?.amount)
					});
					setOpenPaymentModal(true);
				} else {
					const response = await placeOrder(body);

					if (response.data) {
						dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response?.data?.message }));
						onPickStyleSubmit();
					} else {
						dispatch(
							openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.message })
						);
					}
				}
			}}
		>
			{({ values, errors, touched, setFieldValue }) => {
				console.log({ values });
				return (
					<Form>
						<div className="py-[40px]">
							<NewOrderNav />
						</div>
						<div className="flex">
							<div className="w-full">
								<div>
									<p className="text-[32px] font-bold text-[#868686] pb-36">Pick a style</p>
								</div>
								<div className="pr-[100px]">
									<Grid
										container
										spacing={5}
									>
										{styleData.map((styleInfo, i) => (
											<Grid
												key={i}
												item
												md={12}
												lg={6}
												xl={4}
											>
												<Field
													name="selectedStyle"
													type="radio"
													value={styleInfo?.style_name}
													as={StyleCard}
													title={styleInfo?.style_name}
													description={styleInfo?.description}
													id={styleInfo?.id}
													image={styleInfo?.upload_image}
													selectedValue={values.selectedStyle === styleInfo?.style_name}
													handleChange={(e) =>
														handleMainStyleClick(e, styleInfo?.id, values, setFieldValue)
													}
												/>
											</Grid>
										))}
									</Grid>
									<div className="mt-60">
										<div>
											<p className="text-[32px] font-bold text-[#868686] py-36">
												Additional Color Styles
											</p>
										</div>
										<div>
											<Grid
												container
												spacing={5}
											>
												{additionalData.map((styleInfo, i) => (
													<Grid
														key={i}
														item
														md={12}
														lg={6}
														xl={4}
													>
														<Field
															name="additionalStyle"
															type="checkbox"
															value={styleInfo.style_name}
															as={StyleCard}
															title={styleInfo.style_name}
															description={styleInfo.description}
															id={styleInfo.id}
															image={styleInfo?.upload_image}
															selectedValue={values.additionalStyle.includes(
																styleInfo.style_name
															)}
															handleChange={(e) =>
																handleAdditionalStyleClick(
																	e,
																	styleInfo.id,
																	values,
																	setFieldValue
																)
															}
														/>
													</Grid>
												))}
											</Grid>
										</div>
									</div>
									{/* ==================== Additional Edits ==================== */}
									<div className="mt-60">
										<div>
											<p className="text-[32px] font-bold text-[#422323] py-36">
												Additional Edits
											</p>
										</div>

										{/* -------------------- Culling -------------------- */}
										<div className="flex items-center">
											<label
												htmlFor="cullingCheckbox"
												className="cursor-pointer flex items-center"
											>
												<Field
													className="cursor-pointer"
													style={{ width: '20px', height: '20px' }}
													type="checkbox"
													name="additionalEdits.culling"
													id="cullingCheckbox"
													checked={values.additionalEdits.culling}
													disabled={orderCalcValue?.culling !== 'yes'}
													onChange={(e) => {
														handleCheckboxChange(
															'culling',
															e.target.checked,
															setFieldValue,
															values
														);
														handleCullingChange(e, setFieldValue);
														const maxThreshold = getMaxThreshold(
															orderCalcValue,
															values.additionalEdits
														);
														setFieldValue('maxThreshold', maxThreshold);
													}}
												/>
												<span
													className={clsx(
														'pl-5 text-[20px] font-bold',
														orderCalcValue?.culling === 'yes'
															? 'text-black'
															: 'text-[#868686]'
													)}
												>
													Culling
												</span>
											</label>
										</div>
										{showInput.culling && (
											<div className="mt-20">
												<div className="">
													<label
														htmlFor="imageQuantity"
														className="font-semibold"
														style={{
															lineHeight: '20px',
															fontSize: '14px'
														}}
													>
														How many images are you sending us?
													</label>
													<Field
														type="number"
														name="imageQuantity"
														placeholder=""
														className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
														min="0"
													/>
													<ErrorMessage
														name="imageQuantity"
														component="div"
														className="text-red-500 text-xs mt-1"
													/>
												</div>
											</div>
										)}
										{showCullingInputs && (
											<div className="mt-20">
												<div className="mt-16">
													<label
														htmlFor="cullDownTotalImages"
														className="font-semibold"
														style={{
															lineHeight: '20px',
															fontSize: '14px'
														}}
													>
														How many images should we cull down to?
													</label>
													<Field
														type="number"
														name="cullDownTotalImages"
														placeholder=""
														className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
														min="0"
													/>
													<ErrorMessage
														name="cullDownTotalImages"
														component="div"
														className="text-red-500 text-xs mt-1"
													/>
												</div>
												<div className="mt-16">
													<label
														htmlFor="imageSelectionMethodCulling"
														className="font-semibold"
														style={{
															lineHeight: '20px',
															fontSize: '14px'
														}}
													>
														How would you like us to select your images?
													</label>
													<Field
														as="select"
														name="imageSelectionMethodCulling"
														className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
													>
														<option
															value=""
															label="Select method"
														/>
														<option
															value="Star"
															label="Star"
														/>
														<option
															value="Color"
															label="Color"
														/>
													</Field>
													<ErrorMessage
														name="imageSelectionMethodCulling"
														component="div"
														className="text-red-500 text-xs mt-1"
													/>
												</div>
											</div>
										)}

										{/* --------------------  Skin Retouching -------------------- */}
										{!isBasicColorSelected && (
											<div className="flex items-center mt-[30px]">
												<label
													htmlFor="skinRetouchingCheckbox"
													className="cursor-pointer flex items-center"
												>
													<Field
														className="cursor-pointer"
														style={{ width: '20px', height: '20px' }}
														name="additionalEdits.skinRetouching"
														type="checkbox"
														id="skinRetouchingCheckbox"
														disabled={orderCalcValue?.skin_retouch !== 'yes'}
														checked={values.additionalEdits.skinRetouching}
														onChange={(e) => {
															handleCheckboxChange(
																'skinRetouching',
																e.target.checked,
																setFieldValue,
																values
															);
															handleSkinRetouchingChange(e, setFieldValue);
															const maxThreshold = getMaxThreshold(
																orderCalcValue,
																values.additionalEdits
															);
															setFieldValue('maxThreshold', maxThreshold);
														}}
													/>
													<span
														className={clsx(
															'pl-5 text-[20px] font-bold',
															orderCalcValue?.skin_retouch === 'yes'
																? 'text-black'
																: 'text-[#868686]'
														)}
													>
														Skin Retouching
													</span>
												</label>
											</div>
										)}
										{/* showSkinRetouchingInputs */}
										{showInput.skinRetouching && (
											<div className="">
												<label
													htmlFor="imageQuantity"
													className="font-semibold"
													style={{
														lineHeight: '20px',
														fontSize: '14px'
													}}
												>
													How many images are you sending us?
												</label>
												<Field
													type="number"
													name="imageQuantity"
													placeholder=""
													className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
													min="0"
												/>
												<ErrorMessage
													name="imageQuantity"
													component="div"
													className="text-red-500 text-xs mt-1"
												/>
											</div>
										)}
										{showSkinRetouchingInputs && !isBasicColorSelected && (
											<div className="mt-20">
												<div className="mt-16">
													<label
														htmlFor="imageSelectionMethodSkinRetouching"
														className="font-semibold"
														style={{
															lineHeight: '20px',
															fontSize: '14px'
														}}
													>
														How would you like us to select the images for skin retouching?
													</label>
													<Field
														as="select"
														name="imageSelectionMethodSkinRetouching"
														className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
													>
														<option
															value=""
															label="Select method"
														/>
														<option
															value="allImages"
															label="All Images"
														/>
														<option
															value="portraitsOnly"
															label="Portraits Only"
														/>
														<option
															value="tenPercent"
															label="Best 10% of Culled Down/Final Editable Images"
														/>
														{/* Add more options as needed */}
													</Field>
													<ErrorMessage
														name="imageSelectionMethodSkinRetouching"
														component="div"
														className="text-red-500 text-xs mt-1"
													/>
												</div>
											</div>
										)}

										{/* -------------------- Preview Edits -------------------- */}
										<div className="flex items-center mt-[30px]">
											<label
												htmlFor="previewEditsCheckbox"
												className="cursor-pointer flex items-center"
											>
												<Field
													className="cursor-pointer"
													style={{ width: '20px', height: '20px' }}
													name="additionalEdits.previewEdits"
													type="checkbox"
													id="previewEditsCheckbox"
													checked={values.additionalEdits.previewEdits}
													disabled={orderCalcValue?.preview_edits !== 'yes'}
													onChange={(e) => {
														setFieldValue('additionalEdits.previewEdits', e.target.checked);

														const maxThreshold = getMaxThreshold(
															orderCalcValue,
															values.additionalEdits
														);
														setFieldValue('maxThreshold', maxThreshold);
													}}
												/>
												<span
													className={clsx(
														'pl-5 text-[20px] font-bold',
														orderCalcValue?.preview_edits === 'yes'
															? 'text-black'
															: 'text-[#868686]'
													)}
												>
													Preview Edits
												</span>
											</label>
											<Tooltip
												color="red"
												placement="right"
												title={
													<span
														style={{ fontSize: '16px' }}
														className=""
													>
														The Preview Edit service provides a preview of approximately 10%
														of the culled or final editable images, for your consideration
														and approval.
													</span>
												}
												componentsProps={{
													tooltip: {
														sx: {
															fontSize: '16px',
															backgroundColor: 'white', // Customize the background color
															color: 'black', // Customize the text color
															boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
															padding: '20px',
															borderRadius: '20px'
														}
													}
												}}
											>
												<button
													onClick={() => {
														console.log('info icon clicked');
													}}
													type="button"
												>
													<AiFillInfoCircle className="ml-8" />
												</button>
											</Tooltip>
										</div>
									</div>
									{/* ==================== Additional Info ==================== */}
									<div className="my-60">
										<div>
											<p className="text-[32px] font-bold text-[#868686] pt-36">
												Additional Info
											</p>
										</div>
										{/* showCullingInputs */}
										{/* {!showCullingInputs && !showSkinRetouchingInputs && ( */}
										{showInput.default && (
											<div className="pt-36">
												<label
													htmlFor="imageQuantity"
													className="font-semibold"
													style={{
														lineHeight: '20px',
														fontSize: '14px'
													}}
												>
													How many images are you sending us?
												</label>
												<Field
													type="number"
													name="imageQuantity"
													placeholder=""
													className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
													min="0"
												/>
												<ErrorMessage
													name="imageQuantity"
													component="div"
													className="text-red-500 text-xs mt-1"
												/>
											</div>
										)}
										<div className="mt-32">
											<label
												htmlFor="driveLink"
												className="font-semibold"
												style={{
													lineHeight: '20px',
													fontSize: '14px'
												}}
											>
												Google Drive link with your images
											</label>
											<Field
												type="text"
												name="driveLink"
												placeholder="Paste your URL here"
												className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
											/>
											<ErrorMessage
												name="driveLink"
												component="div"
												className="text-red-500 text-xs mt-1"
											/>
										</div>
									</div>
									<div className="w-[400px] text-[12px] font-medium">
										<p>Please ensure that:</p>
										<div className="pl-5">
											<div className="flex">
												<p>1.</p>
												<p className="pl-8">
													All the images have finished uploading in the drive before placing
													the order.
												</p>
											</div>
											<div className="flex">
												<p>2.</p>
												<p className="pl-5">
													Your images are either RAW photos, JPG photos, or Smart Preview
													Enabled Lightroom Catalogs.
												</p>
											</div>
										</div>

										<p>
											Find out how to create your own Smart Preview Enabled Lightroom Catalogs{' '}
											<Link
												to="#"
												className=""
												style={{ textDecoration: 'none' }}
											>
												here
											</Link>
											.
										</p>
									</div>
									<div className="pt-32 pb-24">
										<button
											type="submit"
											className="w-[332px] h-[38px] py-2  px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff] font-[20px] flex justify-center items-center gap-5"
										>
											Place Order
											{isLoading ? (
												<Box
													sx={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center'
													}}
												>
													<CircularProgress
														sx={{ color: 'white' }}
														size={20}
													/>
												</Box>
											) : (
												''
											)}
										</button>
									</div>
									{errors.selectedStyle && touched.selectedStyle ? (
										<div style={{ color: 'red' }}>{errors.selectedStyle}</div>
									) : null}
								</div>
							</div>
							<div
								className=""
								style={{ position: 'sticky', top: 78, alignSelf: 'flex-start' }}
							>
								<PriceCard
									priceInfo={orderCalcValue}
									formValue={values}
									orderType={orderType}
									setOrderType={setOrderType}
									categoryName={orderState.category_name}
								/>
							</div>
							<PaymentModal
								paymentModalInfo={paymentModalInfo}
								setPaymentModalInfo={setPaymentModalInfo}
								openPaymentModal={openPaymentModal}
								handlePaymentModalClose={handlePaymentModalClose}
								setOpenPaymentSuccessModal={setOpenPaymentSuccessModal}
							/>
							<PaymentSuccessModal
								handlePaymentSuccessModalClose={handlePaymentSuccessModalClose}
								openPaymentSuccessModal={openPaymentSuccessModal}
								paymentModalInfo={{
									...paymentModalInfo,
									categoryName: orderState?.category_name,
									selectedStyle: values?.selectedStyle
								}}
							/>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default PickStyle;
