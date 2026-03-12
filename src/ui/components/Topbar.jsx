import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();

    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-semibold">AgendaT</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
