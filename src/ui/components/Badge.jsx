export default function Badge({ status }) {
  let color = "";
  let label = "";

  if (status === "scheduled") {
    color = "bg-yellow-200 text-yellow-800";
    label = "Scheduled";
  }

  if (status === "completed") {
    color = "bg-green-200 text-green-800";
    label = "Completed";
  }

  if (status === "cancelled") {
    color = "bg-red-200 text-red-800";
    label = "Cancelled";
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
