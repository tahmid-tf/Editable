import dayjs from 'dayjs';
import standard from '../../../public/assets/images/standard.svg';
import express from '../../../public/assets/images/express.svg';
import custom from '../../../public/assets/images/custom.svg';
import calanderIcon from '../../../public/assets/icons/calanderIcon.svg';
import earningIcon from '../../../public/assets/icons/EarningsIcon.svg';

export const orderStatusOptions = [
	{
		name: 'Order Status',
		value: ''
	},
	{
		name: 'Pending',
		value: 'pending'
	},
	{
		name: 'Completed',
		value: 'completed'
	},
	{
		name: 'Cancelled',
		value: 'cancelled'
	}
];
export const paymentStatusOptions = [
	{
		name: 'Payment Status',
		value: ''
	},
	{
		name: 'Pending',
		value: 'pending'
	},
	{
		name: 'Successful',
		value: 'successful'
	},
	{
		name: 'Failed',
		value: 'failed'
	}
];
export const editorOptions = [
	{
		name: 'Assign Editor',
		value: ''
	},
	{
		name: 'Ayman',
		value: 'ayman'
	},
	{
		name: 'Jon deo',
		value: 'jon_deo'
	},
	{
		name: 'Tahmid',
		value: 'Tahmid'
	}
];

export const datePickerShortcutsItems = [
	{
		label: 'This Week',
		getValue: () => {
			const today = dayjs();
			return [today.startOf('week'), today.endOf('week')];
		}
	},
	{
		label: 'Last Week',
		getValue: () => {
			const today = dayjs();
			const prevWeek = today.subtract(7, 'day');
			return [prevWeek.startOf('week'), prevWeek.endOf('week')];
		}
	},
	{
		label: 'Last 7 Days',
		getValue: () => {
			const today = dayjs();
			return [today.subtract(7, 'day'), today];
		}
	},
	{
		label: 'Current Month',
		getValue: () => {
			const today = dayjs();
			return [today.startOf('month'), today.endOf('month')];
		}
	},
	{
		label: 'Next Month',
		getValue: () => {
			const today = dayjs();
			const startOfNextMonth = today.endOf('month').add(1, 'day');
			return [startOfNextMonth, startOfNextMonth.endOf('month')];
		}
	},
	{ label: 'Reset', getValue: () => [null, null] }
];

export const SnackbarTypeEnum = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'waring',
	DELETE: 'delete'
};

export const orderTypeInfo = [
	{
		type: 'standard',
		title: 'Standard Delivery',
		image: standard,
		subTitles: [
			{
				text: 'Estimated Delivery within 15 Days',
				icon: calanderIcon
			}
		],
		description:
			'I would like something edited as per Editable style and guidelines. I do not need it to follow my own style. I can choose from their existing presets.'
	},
	{
		type: 'express',
		title: 'Express',
		image: express,
		subTitles: [
			{
				text: 'Estimated Delivery within 07 Days',
				icon: calanderIcon
			},
			{
				text: '30% surplus on Standard Price',
				icon: earningIcon
			}
		],
		description:
			'I would like something edited as per Editable style and guidelines. I do not need it to follow my own style. I can choose from their existing presets.'
	},

	{
		type: 'custom',
		title: 'Custom',
		image: custom,
		subTitles: [
			{
				text: 'Delivery time based on editing needs',
				icon: calanderIcon
			}
		],
		description:
			'I am a photographer, or a brand, that has recurring photo editing needs, that I would like completed according to my style.'
	}
];
