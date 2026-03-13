import { supabase } from "../../lib/supabase";

export const appointmentsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        `
        *,
        services (
          id,
          name
        ),
        clients (
          id,
          name,
          email
        )
      `,
      )
      .order("date_time", { ascending: false });

    if (error) {
      console.log(error);
      throw error;
    }

    return data;
  },

  async create(appointment) {
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointment])
      .select();

    if (error) {
      console.log(error);
      throw error;
    }

    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      console.log(error);
      throw error;
    }
  },
};
