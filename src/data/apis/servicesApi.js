import { supabase } from "../../lib/supabase";

export const servicesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      throw error;
    }

    return data;
  },

  async create(service) {
    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          ...service,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.log(error);
      throw error;
    }

    return data;
  },

  async approve(id) {
    const { data, error } = await supabase
      .from("services")
      .update({ status: "approved" })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      throw error;
    }

    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      console.log(error);
      throw error;
    }
  },
};
