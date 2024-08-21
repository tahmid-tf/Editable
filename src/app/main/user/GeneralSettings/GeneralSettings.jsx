import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { useResetPasswordMutation } from './GeneralSettingsApi';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';

const schema = z
	.object({
		displayName: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		oldPassword: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		newPassword: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		// add phone number
		whatsappNumber: z
			.string()
			.nonempty('You must enter your phone number')
			.regex(/^\+?[1-9]\d{1,14}$/, 'You must enter a valid phone number')
	})
	.refine((data) => data.newPassword === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});

const GeneralSettings = () => {
	const userInfo = useAppSelector(selectUser);
	const [resentPassword] = useResetPasswordMutation();
	const dispatch = useAppDispatch();
	const defaultValues = {
		displayName: userInfo?.name,
		email: userInfo?.email,
		oldPassword: '',
		newPassword: '',
		passwordConfirm: '',
		whatsappNumber: userInfo?.phone
	};
	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	async function onSubmit(formData) {
		const { oldPassword, newPassword } = formData;
		const response = await resentPassword({
			old_password: oldPassword,
			new_password: newPassword
		});
		console.log(response);

		if (response.data) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response?.data?.message }));
		} else {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.error }));
		}
	}

	return (
		<div>
			<div className="px-36">
				<div>
					<p className="text-[20px] font-bold text-[#868686] py-36">General Settings</p>
				</div>
				<form
					name="registerForm"
					noValidate
					className=" pb-[5em] flex w-[30em] flex-col justify-center"
					onSubmit={handleSubmit(onSubmit)}
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
								type="name"
								onChange={() => {}}
								error={!!errors.displayName}
								helperText={errors?.displayName?.message}
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
								onChange={() => {}}
								error={!!errors.whatsappNumber}
								helperText={errors?.whatsappNumber?.message}
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
								onChange={() => {}}
								error={!!errors.email}
								helperText={errors?.email?.message}
								variant="outlined"
								required
								fullWidth
							/>
						)}
					/>

					<Controller
						name="oldPassword"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-24"
								label="Enter Old Password"
								type="password"
								error={!!errors.oldPassword}
								helperText={errors?.oldPassword?.message}
								variant="outlined"
								required
								fullWidth
							/>
						)}
					/>
					<Controller
						name="newPassword"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-24"
								label="New Password"
								type="password"
								error={!!errors.newPassword}
								helperText={errors?.newPassword?.message}
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
								error={!!errors.passwordConfirm}
								helperText={errors?.passwordConfirm?.message}
								variant="outlined"
								required
								fullWidth
							/>
						)}
					/>

					<Button
						className="mt-24 w-full bg-[#146ef5ef] "
						color="primary"
						variant="contained"
						sx={{
							borderRadius: '5px',
							':hover': {
								backgroundColor: '#0066ff'
							}
						}}
						aria-label="Register"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						type="submit"
						size="large"
					>
						Save Changes
					</Button>
				</form>
			</div>
		</div>
	);
};

export default GeneralSettings;
