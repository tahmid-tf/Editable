import React from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import OrderTable from './Table/OrderTable';
import PickStyle from './newOrder/PickStyle';
import { Box, InputLabel } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/base';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Orders() {
	const { t } = useTranslation('orderPage');
	return (
		<div>
			<div className="bg-white px-36 mt-10">
				
				<OrderTable />
				{/* <PickStyle /> */}
			</div>
		</div>
	);
}

export default Orders;
