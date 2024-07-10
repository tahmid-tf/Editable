import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Radio, Checkbox } from '@mui/material';
import { BiSolidShoppingBag } from 'react-icons/bi';
import { useState } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from 'app/store/hooks';
import { addOrderAmount } from '../../orderSlice';

export default function PriceCard({ priceInfo, formValue }) {
	// const [isChecked, setIsChecked] = useState(true);
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useAppDispatch();
	let amount = 0;
	const expressDeliveryAmount = useCallback(() => {
		const calculatedValue = amount * (30 / 100);
		return calculatedValue ? calculatedValue : 0;
	}, [amount, priceInfo]);

	let totalPrice = useCallback(() => {
		const calculatedValue = isChecked ? amount + expressDeliveryAmount() : amount;
		dispatch(addOrderAmount(calculatedValue ? calculatedValue : 0));
		return calculatedValue ? calculatedValue : 0;
	}, [amount, isChecked, priceInfo]);

	const mainStylePrice = useCallback(() => {
		const calculatedValue = formValue?.imageQuantity * parseFloat(priceInfo?.category?.style_price);
		return calculatedValue ? calculatedValue : 0;
	}, [formValue?.imageQuantity, priceInfo?.category?.style_price]);
	const cullingPrice = useCallback(() => {
		const calculatedValue = formValue?.imageQuantity * parseFloat(priceInfo?.category?.culling_price);
		return calculatedValue ? calculatedValue : 0;
	}, [formValue?.imageQuantity, priceInfo?.category?.style_price]);
	const skinRetouchingPrice = useCallback(() => {
		const calculatedValue = formValue?.imageQuantity * parseFloat(priceInfo?.category?.skin_retouch_price);
		return calculatedValue ? calculatedValue : 0;
	}, [formValue?.imageQuantity, priceInfo?.category?.style_price]);
	const previewEditPrice = useCallback(() => {
		const calculatedValue = formValue?.imageQuantity * parseFloat(priceInfo?.category?.preview_edit_price);
		return calculatedValue ? calculatedValue : 0;
	}, [formValue?.imageQuantity, priceInfo?.category?.style_price]);

	if (formValue?.selectedStyle && mainStylePrice()) {
		amount += mainStylePrice();
	}
	if (formValue?.additionalEdits?.culling && cullingPrice()) {
		amount += cullingPrice();
	}
	if (formValue?.additionalEdits?.skinRetouching && skinRetouchingPrice()) {
		amount += skinRetouchingPrice();
	}
	if (formValue?.additionalEdits?.previewEdits && previewEditPrice()) {
		amount += previewEditPrice();
	}

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked); // Toggle the isChecked state

		if (isChecked) {
			console.log('call a function to change order type expressed to Standerd');
		}
	};
	return (
		<Card
			sx={{
				position: 'relative',
				// boxShadow: 4,
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)'
			}}
			// onClick={() => handleChange({ target: { value } })}
		>
			<CardActionArea
				sx={{
					width: 440,
					height: 595,
					cursor: 'default'
				}}
				className=""
			>
				<CardContent className="h-full bg-white">
					<div className="p-10">
						{/* card header */}
						<div className="flex flex-col justify-center items-center">
							<div className="flex items-center justify-center w-[92px] h-[92px] bg-[#7d7d7d34] rounded-full">
								<BiSolidShoppingBag size={50} />
							</div>
							<div className="pt-20 pb-36">
								<p
									className="font-600 text-[#121212]"
									style={{ fontFamily: 'Roboto', fontSize: '38px' }}
								>
									USD {totalPrice()}
								</p>
							</div>
						</div>
						{/* title */}
						<div
							style={{
								borderBottom: '2px solid #EDEDED',
								paddingBottom: '8px'
							}}
						>
							<p className="text-[20px] text-[#474747]">Basic Charge (Wedding Category)</p>
						</div>
						{/* sub total */}
						<div
							style={{ borderBottom: '2px dashed #EDEDED' }}
							className="pt-[26px] pb-10"
						>
							{formValue?.selectedStyle ? (
								<div className="py-10  flex items-center justify-between ">
									<p className="text-[16px] text-[#707070]">
										{formValue?.selectedStyle} ({formValue?.imageQuantity} items)
									</p>
									<p className="text-[16px] text-[#121212] font-semibold">${mainStylePrice()}</p>
								</div>
							) : (
								<></>
							)}
							{formValue?.additionalEdits?.culling ? (
								<div className="py-10  flex items-center justify-between">
									<p className="text-[16px] text-[#707070]">
										Culling ({formValue?.imageQuantity} items)
									</p>
									<p className="text-[16px] text-[#121212] font-semibold">${cullingPrice()}</p>
								</div>
							) : (
								<></>
							)}
							{formValue?.additionalEdits?.skinRetouching ? (
								<div className="py-10  flex items-center justify-between">
									<p className="text-[16px] text-[#707070]">
										Skin Retouching ({formValue?.imageQuantity} items)
									</p>
									<p className="text-[16px] text-[#121212] font-semibold">${skinRetouchingPrice()}</p>
								</div>
							) : (
								<></>
							)}
							{formValue?.additionalEdits?.previewEdits ? (
								<div className="py-10  flex items-center justify-between">
									<p className="text-[16px] text-[#707070]">
										Preview Edit ({formValue?.imageQuantity} items)
									</p>
									<p className="text-[16px] text-[#121212] font-semibold">${previewEditPrice()}</p>
								</div>
							) : (
								<></>
							)}
						</div>
						{/* Total */}
						<div className="pt-10">
							<div className="py-10  flex items-center justify-between">
								<p className="text-[18px] pl-[32px] text-[#707070]">Amount</p>
								<p className="text-[18px] font-semibold">USD {amount}</p>
							</div>
							<div className="py-10  flex items-center justify-between">
								<div className="flex justify-center items-center">
									{/* <Checkbox size="" color="primary" /> */}
									<Checkbox
										size="small"
										color="primary"
										checked={isChecked}
										onChange={handleCheckboxChange}
									/>
									<p className="text-[18px] text-[#707070]">Express Delivery</p>
								</div>
								<p className="text-[18px] font-semibold">USD {expressDeliveryAmount()}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
