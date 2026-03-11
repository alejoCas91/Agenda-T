import { supabase } from "../../lib/supabase";

export const servicesApi = {
  async getAll() {
    const { data, error } = await supabase.from("services").select("*");

    if (error) throw error;

    return data;
  },

  async create(service) {
    const { data, error } = await supabase
      .from("services")
      .insert(service)
      .select();

    if (error) throw error;

    return data;
  },
};
