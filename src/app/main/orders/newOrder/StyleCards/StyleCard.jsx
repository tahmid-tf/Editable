import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Radio, Checkbox } from '@mui/material';
import cardImage from '../../../../../assets/images/pick-a-style/cardimage.png';
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
			className="bg-[#F8F8F8]"
			sx={{
				maxWidth: 326,
				width: '100%',
				position: 'relative',
				border:'1px solid #C9C9C9',
				boxShadow:'none'
			}}
			onClick={() => handleChange({ target: { value } })}
		>
			<CardActionArea
				sx={{
					height: 472
				}}
				className=""
			>
				<Control
					checked={selectedValue}
					onChange={(e) => e.stopPropagation()} // Prevent event bubbling
					value={value}
					name="style-selection"
					sx={{ position: 'absolute', top: 8, left: 22 }}
				/>
				<CardMedia
					className="px-32 pt-[53px]"
					component="img"
					image={imageUrlCompleter(image)}
					alt="Style Image"
				/>
				<CardContent className="px-32 h-full">
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						className="font-600"
						style={{ fontFamily: 'Roboto', fontSize: '24px' }}
					>
						{title}
					</Typography>
					{description?.length ? (
						description?.split(',').map((item, i) => (
							<Typography
								key={i}
								className="py-5 text-[15px]"
								variant="body2"
							>
								<li>{item}</li>
							</Typography>
						))
					) : (
						<></>
					)}
					{warning_text && <p className="pt-16 text-[12px] text-[#CB1717] font-bold">{warning_text}</p>}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
