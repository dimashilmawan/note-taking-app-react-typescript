import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";

type NewNoteProps = {
	onCreateNote: (noteData: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const NewNote = ({ onCreateNote, onAddTag, availableTags }: NewNoteProps) => {
	return (
		<div className="p-4">
			<h1>New Note</h1>
			<NoteForm
				onCreateNote={onCreateNote}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</div>
	);
};
export default NewNote;
