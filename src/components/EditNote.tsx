import { NoteData, Tag } from "../App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";
import Title from "./ui/Title";

type EditNoteProps = {
	onUpdateNote: (id: string, noteData: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const EditNote = ({ onUpdateNote, onAddTag, availableTags }: EditNoteProps) => {
	const note = useNote();
	return (
		<>
			<Title title="Edit Note" />
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={(noteData: NoteData) => onUpdateNote(note.id, noteData)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	);
};
export default EditNote;
