import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const CustomRowAction = ({ row, handleDeleteClick, handleEditClick }) => {
	return (
		<div className="flex gap-5">
			<button
				type="button"
				onClick={() => handleDeleteClick(row)}
			>
				<FuseSvgIcon
					className="text-48"
					size={24}
					color="action"
				>
					material-outline:delete_forever
				</FuseSvgIcon>
			</button>
			<button
				type="button"
				onClick={() => handleEditClick(row)}
			>
				<FuseSvgIcon
					className="text-48"
					size={24}
					color="action"
				>
					heroicons-outline:pencil-alt
				</FuseSvgIcon>
			</button>
		</div>
	);
};

export default CustomRowAction;
