import { Tag } from "../../App";

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
		<aside
			className={`fixed top-0 left-0 z-10 flex  h-1/2 w-1/2 translate-x-1/2 translate-y-1/2 flex-col overflow-y-auto rounded-xl  bg-gray-50 bg-opacity-80 p-4 shadow-lg backdrop-blur-md ${
				modalIsOpen ? "visible" : "invisible"
			}`}
		>
			<div>
				<div>
					<h1>Edit Tags</h1>
					<button onClick={onCloseModal}>Close</button>
				</div>
				{availableTags.length > 0 && (
					<div>
						{availableTags.map(tag => {
							return <div key={tag.id}>{tag.label}</div>;
						})}
					</div>
				)}
			</div>
		</aside>
	);
};
export default EditTagsModal;
