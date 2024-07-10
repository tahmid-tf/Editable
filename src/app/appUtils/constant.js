import dayjs from 'dayjs';

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
	},
	{
		name: 'Preview Edit',
		value: 'preview'
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
