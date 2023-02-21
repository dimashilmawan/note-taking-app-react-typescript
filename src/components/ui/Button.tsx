import { MouseEvent } from "react";

type ButtonProps = {
	title: string;
	type?: "button" | "submit";
	style?: "primary" | "secondary" | "delete";
	onClick?: (e?: MouseEvent) => void;
};

const Button = ({
	title,
	onClick,
	type = "button",
	style = "primary",
}: ButtonProps) => {
	let buttonStyle;

	switch (style) {
		case "primary":
			buttonStyle = "btn-primary";
			break;
		case "secondary":
			buttonStyle = "btn-secondary";
			break;
		case "delete":
			buttonStyle = "btn-delete";
			break;
	}

	return (
		<button className={`btn ${buttonStyle}`} type={type} onClick={onClick}>
			{title}
		</button>
	);
};
export default Button;
