import { Link } from "react-router-dom";
import { simplifiedNote } from "./NoteList";

const NoteCard = ({ id, title, tags }: simplifiedNote) => {
	return (
		<Link
			to={`/${id}`}
			className="rounded-md outline-none ring-1 ring-gray-300 transition-all hover:-translate-y-[2px] hover:shadow-md focus:ring-2 focus:ring-indigo-500  "
		>
			<div className="flex flex-col items-center justify-center gap-2 rounded-md p-4 outline-none ">
				<h2 className="text-lg">{title}</h2>
				{tags.length > 0 && (
					<div className="flex flex-wrap justify-center gap-1">
						{tags.map(tag => (
							<span
								className="rounded-md bg-indigo-500 py-[2px] px-2  text-xs font-bold text-gray-100"
								key={tag.id}
							>
								{tag.label}
							</span>
						))}
					</div>
				)}
			</div>
		</Link>
	);
};
export default NoteCard;