import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useJwtAuth from 'src/app/auth/services/jwt/useJwtAuth';
import { Typography } from '@mui/material';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useAppDispatch } from 'app/store/hooks';
// import { Link } from 'react-router-dom';
/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		// add phone number
		whatsappNumber: z
			.string()
			.nonempty('You must enter your phone number')
			.regex(/^\+?[1-9]\d{1,14}$/, 'You must enter a valid phone number'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});
const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	whatsappNumber: '',
	acceptTermsConditions: false
};

function JwtSignUpForm() {
	const dispatch = useAppDispatch();
	const { signUp } = useJwtAuth();
	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	async function onSubmit(formData) {
		try {
			const { displayName, email, password, whatsappNumber } = formData;
			await signUp({
				name: displayName,
				password,
				email,
				phone: whatsappNumber
			});

			dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: 'Sign up successful' }));
		} catch (error) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: error?.response?.data?.message }));
			errors.forEach(({ message, type }) => {
				setError(type, { type: 'manual', message });
			});
		}
	}

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
		>
			<Controller
				name="displayName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Your Name"
						autoFocus
						type="text"
						autoComplete="off"
						error={!!errors.displayName}
						helperText={errors?.displayName?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Your Email"
						type="email"
						autoComplete="off"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="whatsappNumber"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Your Whatsapp Number"
						type="tel"
						autoComplete="off"
						error={!!errors.whatsappNumber}
						helperText={errors?.whatsappNumber?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Password"
						type="password"
						autoComplete="off"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Retype Password"
						type="password"
						autoComplete="off"
						error={!!errors.passwordConfirm}
						helperText={errors?.passwordConfirm?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label={
								<Typography>
									By checking this box, you are accepting the{' '}
									<span className="text-[#001AFF]">
										{/* <Link
											to="#"
											style={{ textDecoration: 'none' }}
										>
											terms of use
										</Link> */}
									</span>{' '}
									set by Editable
								</Typography>
							}
							control={
								<Checkbox
									size="small"
									{...field}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/>

			<Button
				className="mt-24 w-full "
				color="primary"
				variant="contained"
				aria-label="Register"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Signup
			</Button>
		</form>
	);
}

export default JwtSignUpForm;
