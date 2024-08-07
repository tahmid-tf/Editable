import FuseLoading from '@fuse/core/FuseLoading';
import { useGetAllUsersQuery } from './UsersPageApi';
import { Typography } from '@mui/material';
import DataTable from 'app/shared-components/data-table/DataTable';
import CustomTableHeader from 'app/shared-components/data-table/CustomTableHeader';
import CustomPagination from 'app/shared-components/data-table/CustomPagination';
import { useEffect, useMemo, useState } from 'react';
import UsersTableHeader from './UsersTableHeader';
import { useNavigate } from 'react-router';

const UsersPage = () => {
	const [page, setPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);
	const [search, setSearch] = useState('');

	const navigation = useNavigate();

	const { data, isLoading } = useGetAllUsersQuery({ page, rowPerPage, search });

	const column = useMemo(
		() => [
			{
				id: 'users_name',
				accessorKey: 'users_name',
				header: 'Name',
				Cell: ({ row }) => (
					<p>
						<span
							className="cursor-pointer text-[#001AFF] underline"
							onClick={() => navigation(`/admin/single-user/${row?.original?.users_email}`)}
						>
							{row?.original?.users_name}
						</span>
					</p>
				)
			},
			{
				id: 'users_phone',
				accessorKey: 'users_phone',
				header: 'Phone Number',
				Cell: ({ row }) => `${row?.original?.users_phone}`
			},
			{
				id: 'users_email',
				accessorKey: 'users_email',
				header: 'Email',
				Cell: ({ row }) => `${row?.original?.users_email}`
			},
			{
				id: 'total_order_count',
				accessorKey: 'total_order_count',
				header: 'Total Orders',
				Cell: ({ row }) => `${row?.original?.total_order_count}`
			}
		],
		[data]
	);

	useEffect(() => {
		if (data?.data) {
			setPage(Number(data?.data?.current_page));
			setRowPerPage(Number(data?.data?.per_page));
		}
	}, [data]);
	if (isLoading) {
		return <FuseLoading />;
	}
	return (
		<div>
			<div className="bg-white px-[26px] py-[36px]">
				<Typography
					sx={{ color: '#868686', fontSize: 20, fontWeight: 700, lineHeight: '20px', marginBottom: 3 }}
				>
					Users
				</Typography>

				<DataTable
					isLoading={isLoading}
					data={data?.data?.data}
					columns={column}
					enableColumnActions={false}
					enableRowActions={false}
					enableGrouping={false}
					enableColumnDragging={false}
					enableRowSelection={false}
					// enableTopToolbar={false}
					enablePagination={false}
					enableBottomToolbar={false}
					muiTableBodyProps={{
						sx: {
							//stripe the rows, make odd rows a darker color
							'& tr:hover > td:after': {
								backgroundColor: 'transparent !important'
							}
						}
					}}
					renderTopToolbar={() => (
						<UsersTableHeader
							search={search}
							setSearch={setSearch}
							setPage={setPage}
							totalUsers={data?.total_ordered_user_count}
							additionalStyles={data?.additional_style_count}
							base={data?.base_style_count}
						/>
					)}
				/>
				<CustomPagination
					totalPage={data?.data?.last_page}
					page={page}
					setPage={setPage}
					rowPerPage={rowPerPage}
					setRowPerPage={setRowPerPage}
				/>
			</div>
		</div>
	);
};

export default UsersPage;
