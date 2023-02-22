import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import Title from "./ui/Title";

type NewNoteProps = {
	onCreateNote: (noteData: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const NewNote = ({ onCreateNote, onAddTag, availableTags }: NewNoteProps) => {
	return (
		<>
			<Title title="New Note" />
			<NoteForm
				onSubmit={onCreateNote}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
};
export default NewNote;
