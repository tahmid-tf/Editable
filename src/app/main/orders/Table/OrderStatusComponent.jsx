import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCompleteOrderMutation, useUpdateOrderStatusMutation } from '../orderApi';
import { orderStatusOptions, SnackbarTypeEnum } from 'src/app/appUtils/constant';
import clsx from 'clsx';
import { useAppDispatch } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import DriveLinkProviderComponent from 'app/shared-components/DriveLinkProviderComponent';

const OrderStatusComponent = ({ row }) => {
	const [updateOrderStatus] = useUpdateOrderStatusMutation();
	const [completeOrder, { isLoading }] = useCompleteOrderMutation();
	const [orderStatusValues, setOrderStatusValues] = useState('');
	const [driveLink, setDriveLink] = useState('');
	const [driveLinkError, setDriveLinkError] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useAppDispatch();

	const handleOrderStatusChanges = async (order_id, event) => {
		const order_status = event.target.value;
		setOrderStatusValues(order_status);
		if (order_status === 'pending' || order_status === 'cancelled') {
			try {
				const res = await updateOrderStatus({ order_status, order_id });
				console.log(res);
				if (res.data) {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: res.data.data }));
				} else {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: res.error.data.data }));
					setOrderStatusValues(row?.original?.order_status);
				}
			} catch (error) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: error.data.data }));
				setOrderStatusValues(row?.original?.order_status);
			}
		} else if (order_status === 'completed') {
			setOpenModal(true);
		}
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setOrderStatusValues(row?.original?.order_status);
	};
	const handleSubmit = async () => {
		if (driveLink?.length) {
			try {
				const res = await completeOrder({
					order_status: orderStatusValues,
					order_id: row?.original?.id,
					uploaded_drive_link: driveLink
				});
				console.log(res);
				if (res.data) {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: res.data.data }));
                    setOpenModal(false)
				} else {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: res.error.data.data }));
					setOrderStatusValues(row?.original?.order_status);
				}
			} catch (error) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: error.data.data }));
				setOrderStatusValues(row?.original?.order_status);
			}
		} else {
			setDriveLinkError('Drive Link is Required');
		}
	};
	useEffect(() => {
		setDriveLinkError('');
	}, [driveLink]);
	return (
		<Typography
			className={clsx(
				'inline-flex items-center px-[8px] py-[2px] rounded-full w-full ',
				(orderStatusValues || row?.original?.order_status) === 'pending' && 'bg-[#FFCC00] text-black',
				(orderStatusValues || row?.original?.order_status) === 'completed' && 'bg-[#039855] text-white ',
				(orderStatusValues || row?.original?.order_status) === 'cancelled' && 'bg-[#CB1717] text-white',
				(orderStatusValues || row?.original?.order_status) === 'preview' && 'bg-[#CBCBCB] text-Black'
			)}
		>
			<select
				value={orderStatusValues ? orderStatusValues : row?.original?.order_status}
				onChange={(event) => handleOrderStatusChanges(row?.original?.id, event)}
				className={clsx(
					'inline-flex items-center !w-full text-[12px]',
					(orderStatusValues || row?.original?.order_status) === 'pending' && 'bg-[#FFCC00] text-black',
					(orderStatusValues || row?.original?.order_status) === 'completed' && 'bg-[#039855] text-white ',
					(orderStatusValues || row?.original?.order_status) === 'cancelled' && 'bg-[#CB1717] text-white',
					(orderStatusValues || row?.original?.order_status) === 'preview' && 'bg-[#CBCBCB] text-Black'
				)}
				defaultChecked={row?.original?.order_status}
			>
				{orderStatusOptions?.map((orderData, i) => (
					<option
						className="bg-white text-black"
						value={orderData.value}
						key={i}
					>
						{orderData.name}
					</option>
				))}
			</select>
			<DriveLinkProviderComponent
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				handleSubmit={handleSubmit}
				error={driveLinkError}
				setDriveLink={setDriveLink}
				isLoading={isLoading}
			/>
		</Typography>
	);
};

export default OrderStatusComponent;
