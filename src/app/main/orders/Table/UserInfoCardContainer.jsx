import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { formatNumber } from 'src/app/appUtils/appUtils';

const UserInfoCardContainer = ({ name, phone, email, totalOrders, totalSpend }) => {
	return (
		<Box mb={5}>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={3}
				>
					<Card
						sx={{
							width: '100%',
							minHeight: 200,
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
							<Typography
								fontWeight={500}
								fontSize={'14px'}
								lineHeight={'20px'}
							>
								{name}
							</Typography>
							<Typography
								fontWeight={500}
								fontSize={'14px'}
								lineHeight={'20px'}
							>
								{phone}
							</Typography>
							<Typography
								fontWeight={500}
								fontSize={'14px'}
								lineHeight={'20px'}
							>
								{email}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Card
						sx={{
							width: '100%',
							minHeight: 200,
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Typography
								fontWeight={500}
								fontSize={'14px'}
								lineHeight={'20px'}
							>
								Total Orders
							</Typography>
							<Typography
								fontWeight={700}
								fontSize={'26px'}
								lineHeight={'20px'}
							>
								{totalOrders}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					xs={3}
				>
					<Card
						sx={{
							width: '100%',
							minHeight: 200,
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Typography
								fontWeight={500}
								fontSize={'14px'}
								lineHeight={'20px'}
							>
								Total Spend
							</Typography>
							<Typography
								fontWeight={700}
								fontSize={'26px'}
								lineHeight={'20px'}
							>
								{formatNumber(totalSpend)}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default UserInfoCardContainer;
