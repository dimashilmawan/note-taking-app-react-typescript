type ButtonProps = {
	title: string;
	type?: "button" | "submit";
	style?: "primary" | "secondary" | "delete";
	onClick?: () => void;
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
			buttonStyle =
				"bg-indigo-500 text-gray-100 hover:bg-opacity-90  focus:ring-indigo-400  ";
			break;
		case "secondary":
			buttonStyle =
				"text-gray-500 ring-1 ring-gray-500 hover:bg-gray-500 hover:text-gray-100";
			break;
		case "delete":
			buttonStyle =
				"bg-red-500 text-gray-100 hover:bg-opacity-90  focus:ring-red-400 ";
			break;
	}

	return (
		<button
			className={`rounded-md px-3 py-1 font-semibold capitalize outline-none focus:ring-1 focus:ring-offset-2 ${buttonStyle}`}
			type={type}
			onClick={onClick}
		>
			{title}
		</button>
	);
};
export default Button;
