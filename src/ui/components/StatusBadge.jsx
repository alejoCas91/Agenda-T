export default function StatusBadge({ status }) {
  const styles = {
    scheduled: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      ajsd
    </span>
  );
}
