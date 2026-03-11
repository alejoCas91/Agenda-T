import Button from "./Button";
import StatusBadge from "./StatusBadge";

export default function AppointmentCard() {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">ajsndhajsd</h3>
        <StatusBadge status="scheduled" />
      </div>

      <p className="text-sm text-gray-500">eurbiasd ajsndh</p>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>00:00</span>
        <span>ajs</span>
      </div>

      <div className="flex gap-2">
        <Button>asjd</Button>
        <Button variant="secondary">asd</Button>
      </div>
    </div>
  );
}
