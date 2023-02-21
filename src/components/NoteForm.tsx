import Creatable from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
import { FormEvent, useRef, useState } from "react";
import { MultiValue } from "react-select";
import Button from "./ui/Button";

type NoteFormProps = {
	onCreateNote: (noteData: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

const NoteForm = ({ onCreateNote, onAddTag, availableTags }: NoteFormProps) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const navigate = useNavigate();

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();

		onCreateNote({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});
		navigate("..");
	};

	return (
		<form onSubmit={submitHandler} className="flex flex-col gap-2">
			<div className="flex items-stretch gap-2 ">
				<div className="flex flex-1 flex-col gap-1  ">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						ref={titleRef}
						required
						className="h-full rounded-[3px] px-2 outline-none ring-[0.7px] ring-gray-300 focus:ring-2 focus:ring-indigo-400"
					/>
				</div>
				<div className="flex flex-1 flex-col gap-1">
					<label htmlFor="tags">Tags</label>
					<Creatable
						required
						isMulti
						value={selectedTags.map(tag => ({
							label: tag.label,
							value: tag.id,
						}))}
						onCreateOption={label => {
							const newTag = { id: uuidV4(), label };
							onAddTag(newTag);
							setSelectedTags(prevTags => [...prevTags, newTag]);
						}}
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
			</div>
			<div
				className="flex flex-col gap-1
      "
			>
				<label htmlFor="markdown">Body</label>
				<textarea
					required
					ref={markdownRef}
					className="rounded-[3px] p-2 outline-none ring-[0.7px] ring-gray-300 focus:ring-2 focus:ring-indigo-400"
					rows={15}
				/>
			</div>
			<div className="flex justify-end gap-2">
				<Button title="save" />
				<Link to=".." tabIndex={-1}>
					<Button title="cancel" style="secondary" />
				</Link>
			</div>
		</form>
	);
};
export default NoteForm;
