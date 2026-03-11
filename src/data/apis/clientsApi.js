import { supabase } from "../../lib/supabase";

export const clientsApi = {
  async getFirst() {
    const { data, error } = await supabase.from("clients").select("*").limit(1);

    if (error) throw error;
    return data?.[0];
  },
};
