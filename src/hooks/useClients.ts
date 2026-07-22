import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<Client[]> => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Client[];
    },
  });
}

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<Client> & { name: string }) => {
      const { data, error } = await supabase.from("clients").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<Client> & { id: string }) => {
      const { data, error } = await supabase.from("clients").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}
