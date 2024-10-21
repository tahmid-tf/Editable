import { Box, Checkbox, Radio } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { imageUrlCompleter } from 'src/app/appUtils/appUtils';

export default function StyleCard({
	title,
	warning_text,
	selectedValue,
	handleChange,
	value,
	type,
	description,
	image
}) {
	const Control = type === 'checkbox' ? Checkbox : Radio;

	return (
		<Card
			className="bg-white cursor-pointer "
			sx={{
				width: '100%',
				position: 'relative',
				border: '1px solid #C9C9C9',
				boxShadow: 'none',
				borderRadius: '4px'
			}}
			onClick={() => handleChange({ target: { value } })}
		>
			<Box className=" flex justify-between">
				<Box sx={{ display: 'flex', padding: '24px', columnGap: '41px', alignItems: 'center' }}>
					<CardMedia
						className=" w-[262px] h-fit"
						component="img"
						image={imageUrlCompleter(image)}
						alt="Style Image"
					/>

					<Box className=" h-full">
						<Typography className="font-semibold text-[18px] leading-[28px] mb-5">{title}</Typography>
						{description?.length ? (
							<Typography className="font-[400] text-[14px] leading-[21px]">{description}</Typography>
						) : (
							<></>
						)}
						{warning_text && <p className="pt-16 text-[12px] text-[#CB1717] font-[600]">{warning_text}</p>}
					</Box>
				</Box>

				<Control
					checked={selectedValue}
					onChange={(e) => e.stopPropagation()} // Prevent event bubbling
					value={value}
					name="style-selection"
					className="h-fit !text-[#146ef5ef] mt-[10px] mr-[5px]"
				/>
			</Box>
		</Card>
	);
}
