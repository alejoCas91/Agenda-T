export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-500px shadow-lg">
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>x</button>
        </div>
        {children}
      </div>
    </div>
  );
}
