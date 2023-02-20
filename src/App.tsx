import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import NewNote from "./components/NewNote";
import useLocalStorage from "./hooks/useLocalStorage";

export type Tag = {
	id: string;
	label: string;
};

type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: string[];
};

type RawNote = {
	id: string;
} & RawNoteData;

export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Note = {
	id: string;
} & NoteData;

const App = () => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	const notesWithTags = useMemo(() => {
		return notes.map(note => {
			return {
				...note,
				tags: tags.filter(tag => note.tagIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	const createNoteHandler = ({ tags, ...data }: NoteData) => {
		setNotes(prevNotes => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
			];
		});
	};

	const addTagHandler = (tag: Tag) => {
		console.log("ADDTAG", tag);
		setTags(prevTags => [...prevTags, tag]);
	};

	return (
		<Routes>
			<Route path="/" element={<h1>HOME</h1>} />
			<Route path="/:id">
				<Route index element={<h1>SHOW</h1>} />
				<Route path="edit" element={<h1>EDIT</h1>} />
			</Route>
			<Route
				path="/new"
				element={
					<NewNote
						onCreateNote={createNoteHandler}
						availableTags={tags}
						onAddTag={addTagHandler}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
export default App;
