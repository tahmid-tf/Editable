import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, Radio, Checkbox } from '@mui/material';
import { BiSolidShoppingBag } from 'react-icons/bi';
import { useState } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from 'app/store/hooks';
import {
	addCullingPrice,
	addExpressAmount,
	addMainStylePrice,
	addOrderAmount,
	addPreviewEditPrice,
	addRetouchingPice,
	addSubTotalAmount
} from '../../orderSlice';
import { useEffect } from 'react';

export default function PriceCard({ priceInfo, formValue, orderType, setOrderType, categoryName }) {
	const dispatch = useAppDispatch();

	const mainStylePrice = useCallback(() => {
		const value = formValue?.imageQuantity * parseFloat(priceInfo?.category?.style_price);
		const calculatedValue = value && formValue?.selectedStyle ? value : 0;
		dispatch(addMainStylePrice(Math.round(calculatedValue)));
		return Math.round(calculatedValue);
	}, [formValue?.imageQuantity, priceInfo?.category?.style_price, formValue?.selectedStyle]);

	const cullingPrice = useCallback(() => {
		const value = formValue?.imageQuantity * parseFloat(priceInfo?.category?.culling_price);
		const calculatedValue = value && formValue?.additionalEdits?.culling ? value : 0;
		dispatch(addCullingPrice(Math.round(calculatedValue)));
		return Math.round(calculatedValue);
	}, [formValue?.imageQuantity, priceInfo?.category?.culling_price, formValue?.additionalEdits?.culling]);

	const skinRetouchingPrice = useCallback(() => {
		const value = formValue?.imageQuantity * parseFloat(priceInfo?.category?.skin_retouch_price);
		const calculatedValue = value && formValue?.additionalEdits?.skinRetouching ? value : 0;
		dispatch(addRetouchingPice(Math.round(calculatedValue)));
		return Math.round(calculatedValue);
	}, [formValue?.imageQuantity, priceInfo?.category?.skin_retouch_price, formValue?.additionalEdits?.skinRetouching]);

	const previewEditPrice = useCallback(() => {
		const value = formValue?.imageQuantity * parseFloat(priceInfo?.category?.preview_edit_price);
		const calculatedValue = value && formValue?.additionalEdits?.previewEdits ? value : 0;
		dispatch(addPreviewEditPrice(Math.round(calculatedValue)));
		return Math.round(calculatedValue);
	}, [formValue?.imageQuantity, priceInfo?.category?.preview_edit_price, formValue?.additionalEdits?.previewEdits]);

	const amount = mainStylePrice() + cullingPrice() + skinRetouchingPrice() + previewEditPrice();

	const expressDeliveryAmount = useCallback(() => {
		const calculatedValue = amount * (30 / 100);
		dispatch(addExpressAmount(Math.round(calculatedValue)));
		return calculatedValue ? Math.round(calculatedValue) : 0;
	}, [amount]);

	const totalPrice = useCallback(() => {
		const calculatedValue = orderType === 'express' ? amount + expressDeliveryAmount() : amount;
		dispatch(addOrderAmount(calculatedValue ? Math.round(calculatedValue) : 0));
		dispatch(addSubTotalAmount(amount));
		return calculatedValue ? Math.round(calculatedValue) : 0;
	}, [amount, orderType]);

	const handleCheckboxChange = () => {
		setOrderType(orderType === 'standard' ? 'express' : 'standard');
	};
	return (
		<Card
			sx={{
				position: 'relative',
				boxShadow: '0px 0px 20px 0px #00000014',
				'&:hover': {
					bgcolor: 'white',
					outline: 'solid #C9C9C9'
				}
			}}
		>
			<CardContent
				sx={{
					width: 360,
					cursor: 'default'
				}}
				className="h-full bg-white"
			>
				<div className="p-10">
					{/* card header */}
					<div className="flex flex-col justify-center items-center">
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
						<p className="text-[20px] text-[#474747]">Basic Charge ({categoryName})</p>
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
								<p className="text-[16px] text-[#707070]">Culling ({formValue?.imageQuantity} items)</p>
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
									checked={orderType === 'express'}
									onChange={handleCheckboxChange}
								/>
								<p className="text-[18px] text-[#707070]">Express Delivery</p>
							</div>
							<p className="text-[18px] font-semibold">USD {expressDeliveryAmount()}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
