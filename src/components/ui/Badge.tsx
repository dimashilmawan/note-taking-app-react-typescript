import { Tag } from "../../App";

type BadgeProps = {
	tag: Tag;
};

const Badge = ({ tag }: BadgeProps) => {
	return (
		<span
			className="rounded-md bg-indigo-500 py-[2px] px-2  text-xs font-bold text-gray-100"
			key={tag.id}
		>
			{tag.label}
		</span>
	);
};
export default Badge;
