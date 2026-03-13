import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();

      setEmail(data.user?.email);
    }

    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    navigate("/login");
  }

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      {/* botón sidebar */}

      <button onClick={toggleSidebar}>☰</button>

      {/* menú usuario */}

      <div className="relative">
        <button onClick={() => setMenu(!menu)}>☰</button>

        {menu && (
          <div className="absolute right-0 top-10 bg-white border rounded-lg shadow p-4 flex flex-col gap-2">
            <p className="text-sm text-gray-600">{email}</p>

            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
