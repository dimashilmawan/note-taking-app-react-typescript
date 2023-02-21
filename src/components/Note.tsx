import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";

import ReactMarkdown from "react-markdown";
import Button from "./ui/Button";

const Note = () => {
	const note = useNote();
	return (
		<div>
			<div className="flex p-4">
				<div className="flex-1">
					<h2 className="">{note.title}</h2>
					{note.tags.length > 0 && (
						<div className="flex flex-wrap gap-1">
							{note.tags.map(tag => (
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
				<div className="flex items-start gap-3">
					<Link to={`/${note.id}/edit`} tabIndex={-1}>
						<Button title="Edit" />
					</Link>
					<Button title="delete" style="delete" />
					<Link to="/" tabIndex={-1}>
						<Button title="back" style="secondary" />
					</Link>
				</div>
			</div>
			<div>
				<ReactMarkdown>{note.markdown}</ReactMarkdown>
			</div>
		</div>
	);
};
export default Note;
