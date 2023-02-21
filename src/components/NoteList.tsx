import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import NoteCard from "./NoteCard";
import Button from "./ui/Button";

export type simplifiedNote = {
	id: string;
	tags: Tag[];
	title: string;
};

type NoteListProps = {
	availableTags: Tag[];
	notes: simplifiedNote[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");

	const filteredNotes = useMemo(() => {
		return notes.filter(note => {
			return (
				((title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
					selectedTags.length === 0) ||
				selectedTags.every(tag =>
					note.tags.some(noteTag => noteTag.id === tag.id)
				)
			);
		});
	}, [title, notes, selectedTags]);

	return (
		<div className="p-4">
			<div className="flex items-center">
				<h1 className="flex-1 text-2xl font-semibold">Note</h1>
				<div className="flex gap-3">
					<Link to="/new" className="outline-none">
						<Button title="Create" />
					</Link>
					<Button title="Edit Tags" style="secondary" />
				</div>
			</div>
			<form className="mt-6 flex items-stretch gap-3 ">
				<div className="flex flex-1 flex-col gap-1  ">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						required
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="mt-[1px] h-9 rounded-[3px] px-2 outline-none ring-[0.7px] ring-gray-300 focus:ring-2 focus:ring-indigo-400"
					/>
				</div>

				<div className="flex flex-1  flex-col gap-1 ">
					<label htmlFor="tags">Tags</label>
					<ReactSelect
						required
						isMulti
						value={selectedTags.map(tag => ({
							label: tag.label,
							value: tag.id,
						}))}
						onChange={tags => {
							setSelectedTags(
								tags.map(tag => ({ label: tag.label, id: tag.value }))
							);
						}}
						options={availableTags.map(tag => ({
							label: tag.label,
							value: tag.id,
						}))}
					/>
				</div>
			</form>
			<div className="mt-6 grid grid-cols-2 gap-3">
				{filteredNotes.map(note => (
					<NoteCard
						key={note.id}
						id={note.id}
						title={note.title}
						tags={note.tags}
					/>
				))}
			</div>
		</div>
	);
};
export default NoteList;
