type TitleProps = {
	title: string;
	styles?: string;
};

const Title = ({ title, styles }: TitleProps) => {
	return (
		<h1
			className={`text-3xl font-semibold text-gray-700 ${styles ? styles : ""}`}
		>
			{title}
		</h1>
	);
};
export default Title;
