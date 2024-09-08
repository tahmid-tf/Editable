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
							height: '100%',
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							p: '32px 0 32px 40px',
							boxShadow: 'none',
							bgcolor: '#F2F4F5'
						}}
					>
						<CardContent
							sx={{ display: 'flex', flexDirection: 'column', gap: '4px', p: 0, pb: '0 !important' }}
						>
							<Typography
								fontWeight={600}
								fontSize={'21px'}
								lineHeight={'25px'}
							>
								{name}
							</Typography>
							<Typography
								fontWeight={400}
								fontSize={'14px'}
								lineHeight={'16px'}
							>
								{phone}
							</Typography>
							<Typography
								fontWeight={400}
								fontSize={'14px'}
								lineHeight={'16px'}
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
							height: '100%',
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							p: '32px 0 32px 40px',
							boxShadow: 'none',
							bgcolor: '#F2F4F5'
						}}
					>
						<CardContent
							sx={{ display: 'flex', flexDirection: 'column', gap: '4px', p: 0, pb: '0 !important' }}
						>
							<Typography
								fontWeight={400}
								fontSize={'14px'}
								lineHeight={'16px'}
							>
								Total Orders
							</Typography>
							<Typography
								fontWeight={600}
								fontSize={'48px'}
								lineHeight={'48px'}
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
							height: '100%',
							backgroundColor: '#F6F6F6',
							borderRadius: 5,
							p: '32px 0 32px 40px',
							boxShadow: 'none',
							bgcolor: '#F2F4F5'
						}}
					>
						<CardContent
							sx={{ display: 'flex', flexDirection: 'column', gap: '4px', p: 0, pb: '0 !important' }}
						>
							<Typography
								fontWeight={400}
								fontSize={'14px'}
								lineHeight={'16px'}
							>
								Total Spend
							</Typography>
							<Typography
								fontWeight={600}
								fontSize={'48px'}
								lineHeight={'48px'}
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
