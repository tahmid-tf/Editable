import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import _ from '@lodash';
import loginImg from '../../../../src/assets/images/auth/auth.png';
import JwtSignInForm from 'src/app/auth/services/jwt/components/JwtSignInForm';

const tabs = [
	{
		id: 'jwt',
		title: 'JWT',
		logo: 'assets/images/logo/jwt.svg',
		logoClass: 'h-40 p-4 bg-black rounded-12'
	}
];

/**
 * The sign in page.
 */
function SignInPage() {
	const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

	function handleSelectTab(id) {
		setSelectedTabId(id);
	}

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				// sx={{ backgroundColor: "primary.main" }}
				sx={{
					backgroundImage: `url('${loginImg}')`, // Replace with your image path
					backgroundSize: 'cover', // Cover the entire box
					backgroundPosition: 'center' // Center the image
				}}
			></Box>
			<Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-center md:rounded-none md:p-64 md:shadow-none">
				<CardContent className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
					{/* <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" /> */}

					<Typography className="mt-32 text-4xl text-[#868686] font-extrabold leading-tight tracking-tight">
						Login to Editable
					</Typography>
					<JwtSignInForm />
					<div className="mt-20 flex justify-center items-baseline font-medium">
						<Typography>Don't have an account?</Typography>
						<Link
							className="ml-4"
							to="/sign-up"
						>
							Sign up
						</Link>
					</div>
				</CardContent>
			</Paper>
		</div>
	);
}

export default SignInPage;
