import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import EditNote from "./components/EditNote";
import Layout from "./components/Layout/Layout";
import NewNote from "./components/NewNote";
import Note from "./components/Note";
import NoteLayout from "./components/NoteLayout";
import NoteList from "./components/NoteList";
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

export type NoteData = { title: string; markdown: string; tags: Tag[] };

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

	const updateNoteHandler = (id: string, { tags, ...data }: NoteData) => {
		setNotes(prevNotes => {
			return prevNotes.map(note => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
				} else {
					return note;
				}
			});
		});
	};

	const deleteNoteHandler = (id: string) => {
		setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
	};

	const addTagHandler = (tag: Tag) => {
		console.log("ADDTAG", tag);
		setTags(prevTags => [...prevTags, tag]);
	};

	const updateTagHandler = (id: string, label: string) => {
		setTags(prevTags => {
			return prevTags.map(tag => {
				if (tag.id === id) {
					return { ...tag, label };
				} else {
					return tag;
				}
			});
		});
	};

	const deleteTagHandler = (id: string) => {
		setTags(prevTags => prevTags.filter(tag => tag.id !== id));
	};

	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={
						<NoteList
							notes={notesWithTags}
							availableTags={tags}
							onUpdateTag={updateTagHandler}
							onDeleteTag={deleteTagHandler}
						/>
					}
				/>

				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={deleteNoteHandler} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onUpdateNote={updateNoteHandler}
								availableTags={tags}
								onAddTag={addTagHandler}
							/>
						}
					/>
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
		</Layout>
	);
};
export default App;

//////////////////////////////////////////////////////////////////

// type Note = {
// 	id: string;
// 	markdown: string;
// 	title: string;
// 	name: string;
// 	tags: string[];
// };

// type SimpleNote = Pick<Note, "id" | "name" | "title">;

// // type BadgeProps = {
// // 	notes:SimpleNote
// // };
// type BadgeProps = {
// 	notes: SimpleNote;
// };

// const App = () => {
// 	const notes: Note = {
// 		id: "a1",
// 		markdown: "lorem ipsum dolor sit amet",
// 		name: "samid",
// 		tags: ["programming", "java"],
// 		title: "jobs interview",
// 	};
// 	return <Badge notes={notes} />;
// };
// export default App;

// const Badge = ({ notes: { title } }: BadgeProps) => {
// 	return (
// 		<div>
// 			{/* {notes.map(note => (
// 				<span key={note.id}>{note.title}</span>
// 			))} */}
// 			<span>{title}</span>
// 		</div>
// 	);
// };
