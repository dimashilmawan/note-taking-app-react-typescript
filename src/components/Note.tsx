import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";

import ReactMarkdown from "react-markdown";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const Note = () => {
	const note = useNote();
	return (
		<div className="p-4">
			<div className="flex ">
				<div className="flex-1">
					<h2 className="">{note.title}</h2>
					{note.tags.length > 0 && (
						<div className="flex flex-wrap gap-1">
							{note.tags.map(tag => (
								<Badge key={tag.id} tag={tag} />
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
			<div className="mt-6">
				<ReactMarkdown>{note.markdown}</ReactMarkdown>
			</div>
		</div>
	);
};
export default Note;
