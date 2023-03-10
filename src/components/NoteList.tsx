import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import EditTagsModal from "./ui/EditTagsModal";
import NoteCard from "./NoteCard";
import Button from "./ui/Button";
import Title from "./ui/Title";

// export type simplifiedNote = {
// 	id: string;
// 	tags: Tag[];
// 	title: string;
// };

export type simplifiedNote = Pick<Note, "id" | "title" | "tags">;

type NoteListProps = {
	availableTags: Tag[];
	notes: simplifiedNote[];
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

const NoteList = ({
	availableTags,
	notes,
	onUpdateTag,
	onDeleteTag,
}: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState<string>("");
	// const [title, setTitle] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const filteredNotes = useMemo(
		() =>
			notes.filter(note => {
				return (
					(title === "" ||
						note.title.toLowerCase().includes(title.toLowerCase())) &&
					(selectedTags.length === 0 ||
						selectedTags.every(tag =>
							note.tags.some(noteTag => noteTag.id === tag.id)
						))
				);
			}),
		[title, selectedTags, notes]
	);

	return (
		<>
			<div className="flex items-center">
				<Title title="Note" styles="flex-1" />
				<div className="flex gap-3">
					<Link to="/new" className="outline-none">
						<Button title="Create" />
					</Link>
					<Button
						title="Edit Tags"
						onClick={() => setModalIsOpen(true)}
						style="secondary"
					/>
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
			<div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{filteredNotes.map(note => (
					<NoteCard
						key={note.id}
						id={note.id}
						title={note.title}
						tags={note.tags}
					/>
				))}
			</div>
			{modalIsOpen && (
				<EditTagsModal
					onCloseModal={() => setModalIsOpen(false)}
					modalIsOpen={modalIsOpen}
					availableTags={availableTags}
					onUpdateTag={onUpdateTag}
					onDeleteTag={onDeleteTag}
				/>
			)}
		</>
	);
};
export default NoteList;
