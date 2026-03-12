import { supabase } from "../../lib/supabase";

export const clientsApi = {
  async getAll() {
    const { data, error } = await supabase.from("clients").select("*");

    if (error) throw error;

    return data;
  },

  async create(client) {
    const { data, error } = await supabase
      .from("clients")
      .insert(client)
      .select();

    if (error) throw error;

    return data;
  },

  async update(id, client) {
    const { data, error } = await supabase
      .from("clients")
      .update(client)
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) throw error;
  },
};
