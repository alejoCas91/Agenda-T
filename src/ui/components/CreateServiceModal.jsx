import Modal from "./Modal";
import Button from "./Button";

export default function CreateServiceModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">ajsdhnald</h2>
        <input className="border rounded p-2" placeholder="ajsndh" />
        <input className="border rounded p-2" placeholder="eurbiasd" />
        <input className="border rounded p-2" placeholder="00" />
        <Button>ajsd</Button>
      </div>
    </Modal>
  );
}
