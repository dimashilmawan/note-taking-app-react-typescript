type TitleProps = {
	title: string;
	styles?: string;
};

const Title = ({ title, styles }: TitleProps) => {
	return (
		<h1 className={`text-2xl font-semibold ${styles ? styles : ""}`}>
			{title}
		</h1>
	);
};
export default Title;
