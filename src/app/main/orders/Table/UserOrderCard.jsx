import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const UserOrderCard = ({ data, setOrderType }) => {
	const handleProceedClick = () => {
		setOrderType(data?.type);
	};
	return (
		<Card
			sx={{
				maxWidth: 370,
				height: '100%',
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<Box>
				<CardMedia
					sx={{ height: '230px', borderRadius: '8px' }}
					image={data?.image}
					title="green iguana"
				/>
				<CardContent sx={{ p: '16px 0 0 0 !important' }}>
					<Typography
						gutterBottom
						variant="h5"
						// component="div"
						className="font-semibold"
					>
						{data?.title}
					</Typography>
					<Box className="flex flex-col gap-[4px] mb-10">
						{data?.subTitles?.map((subtitle, i) => {
							const { icon, text } = subtitle;
							return (
								<Box className="flex gap-5 items-center">
									<img
										src={icon}
										alt={icon}
									/>
									<Typography className="text-[12px] leading-[18px]">{text}</Typography>
								</Box>
							);
						})}
					</Box>
					<Typography className="text-[14px] leading-[20px]">{data?.description}</Typography>
				</CardContent>
			</Box>
			<CardActions>
				<Button
					className="mt-10 w-full bg-[#146ef5ef] flex justify-center items-center gap-5 "
					color="primary"
					variant="contained"
					sx={{
						borderRadius: '5px',
						':hover': {
							backgroundColor: '#0066ff'
						}
					}}
					aria-label="Register"
					size="large"
					onClick={handleProceedClick}
				>
					Proceed
				</Button>
			</CardActions>
		</Card>
	);
};

export default UserOrderCard;
