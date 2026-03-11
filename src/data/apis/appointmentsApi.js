import { supabase } from "../../lib/supabase";

export const appointmentsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("appointments")
      .select(`*, services(name)`);

    console.log("appointments:", data);
    console.log("error:", error);

    if (error) throw error;

    return data;
  },

  async create(appointment) {
    const { data, error } = await supabase
      .from("appointments")
      .insert(appointment)
      .select();

    console.log("create appointment:", data, error);

    if (error) throw error;

    return data;
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  },
};
