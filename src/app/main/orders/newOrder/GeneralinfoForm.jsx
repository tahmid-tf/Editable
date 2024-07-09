import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from 'app/store/hooks';
import { addOrderGeneralInfo } from '../orderSlice';

const validationSchema = Yup.object().shape({
	userEmail: Yup.string().email('Invalid email format').required('Required'),
	userPhone: Yup.string().required('Required'),
	orderType: Yup.string().required('Required'),
	orderName: Yup.string().required('Required'),
	categoryType: Yup.string().required('Required'),
	paymentStatus: Yup.string().required('Required')
});

const GeneralinfoForm = ({ onClose, successAlert }) => {
	const dispatch = useAppDispatch();
	return (
		<div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto">
			<Formik
				initialValues={{
					userEmail: 'john.doe@gmail.com',
					userPhone: '+44 7848 107162',
					orderType: '',
					orderName: '',
					categoryType: '',
					paymentStatus: ''
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					// successAlert();
					// onClose();
					dispatch(
						addOrderGeneralInfo({
							email: values?.userEmail,
							phone: values?.userPhone,
							order_type: values?.orderType,
							order_name: values?.orderName,
							category: values?.categoryType,
							payment_status: values?.paymentStatus
						})
					);
				}}
				className="rounded-xl"
			>
				{({ isSubmitting }) => (
					<Form className="space-y-4 ">
						<div className="flex items-center justify-between">
							<p className="text-2xl font-bold text-[#868686]">General Info</p>
							<button onClick={onClose}>
								<IoClose size={24} />
							</button>
						</div>
						<div className="form-group">
							<label
								htmlFor="userEmail"
								className="block text-md font-semibold text-black mt-16"
							>
								User Email
							</label>
							<Field
								type="email"
								name="userEmail"
								placeholder="Enter Email Address"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="userEmail"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="userPhone"
								className="block text-md font-semibold text-black mt-16"
							>
								User Phone
							</label>
							<Field
								type="text"
								name="userPhone"
								placeholder="Enter Phone Number"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="userPhone"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="orderType"
								className="block text-md font-semibold text-black mt-16"
							>
								Select Order Type
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="orderType"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							>
								<option value="">Select Order Type</option>
								<option value="pending">Standard</option>
								<option value="pending">Express</option>
							</Field>
							<ErrorMessage
								name="orderType"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="orderName"
								className="block text-md font-semibold text-black mt-16"
							>
								Order Name
							</label>
							<Field
								type="text"
								name="orderName"
								placeholder="Enter Order Name"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="orderName"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="categoryType"
								className="block text-md font-semibold text-black mt-16"
							>
								Select a Category
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="categoryType"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							>
								<option value="">Select Category Type</option>
								<option value="wedding">Wedding</option>
								<option value="headshot_portraits">Headshot Portraits</option>
								<option value="travel_photos">Travel Photos</option>
							</Field>
							<ErrorMessage
								name="categoryType"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="paymentStatus"
								className="block text-md font-semibold text-black mt-16"
							>
								Payment Status
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="paymentStatus"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							>
								<option value="">Select Payment Status</option>
								<option value="pending">Pending</option>
								<option value="successful">Successful</option>
								<option value="successful">Failed</option>
							</Field>
							<ErrorMessage
								name="paymentStatus"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="pt-32 pb-24">
							<button
								type="submit"
								disabled={isSubmitting}
								// onClick={onClose}
								className="w-full h-[38px] py-2 px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff]"
							>
								Proceed
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default GeneralinfoForm;
