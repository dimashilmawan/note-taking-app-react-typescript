import { FaTimes } from "react-icons/fa";
import { Tag } from "../../App";
import Button from "./Button";
import Title from "./Title";

type EditTagsModalProps = {
	modalIsOpen: boolean;
	availableTags: Tag[];
	onCloseModal: () => void;
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};
const EditTagsModal = ({
	modalIsOpen,
	onCloseModal,
	availableTags,
	onUpdateTag,
	onDeleteTag,
}: EditTagsModalProps) => {
	return (
		<>
			<div
				className="fixed top-0 left-0 z-10 h-screen w-full  bg-gray-800 bg-opacity-40 backdrop-blur-[1px]"
				onClick={onCloseModal}
			/>
			<aside
				className={`fixed left-1/2 top-1/2 z-20 flex w-[40rem] max-w-sm -translate-y-1/2 -translate-x-1/2 flex-col rounded-xl  bg-gray-50 bg-opacity-95 p-4 shadow-lg backdrop-blur-lg transition-all sm:max-w-lg`}
			>
				<div className="flex items-center justify-between ">
					<Title title="Edit Tags" styles="text-2xl" />
					<button className="group" onClick={onCloseModal}>
						<FaTimes className="text-2xl group-hover:scale-105" />
					</button>
				</div>
				{availableTags.length > 0 && (
					<div className="mt-4 flex h-[50vh] flex-col gap-3 overflow-y-auto p-[2px]">
						{availableTags.map(tag => {
							return (
								<div key={tag.id} className="flex gap-4">
									<input
										className="w-full rounded-md px-2 py-[0.375rem]  text-gray-700 outline-none ring-1 ring-gray-300 focus:ring-indigo-400"
										value={tag.label}
										onChange={e => onUpdateTag(tag.id, e.target.value)}
									/>
									<button
										className="grid aspect-square h-full place-items-center rounded-md text-gray-600 outline-none ring-1 ring-gray-300 focus:bg-red-400 focus:text-gray-200 focus:ring-2"
										onClick={() => onDeleteTag(tag.id)}
									>
										<FaTimes />
									</button>
								</div>
							);
						})}
					</div>
				)}
				<div className="ml-auto mt-4">
					<Button title="Close" onClick={() => onCloseModal()} />
				</div>
			</aside>
		</>
	);
};
export default EditTagsModal;
