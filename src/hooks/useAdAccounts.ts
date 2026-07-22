import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdAccount } from "@/types";

export function useAdAccounts(clientId?: string | null) {
  return useQuery({
    queryKey: ["ad_accounts", clientId ?? "all"],
    queryFn: async (): Promise<AdAccount[]> => {
      let q = supabase.from("ad_accounts").select("*").order("name");
      if (clientId) q = q.eq("client_id", clientId);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as AdAccount[];
    },
  });
}

export function useCreateAdAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<AdAccount> & { client_id: string; meta_account_id: string; name: string }) => {
      const { data, error } = await supabase.from("ad_accounts").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ad_accounts"] }),
  });
}

export function useDeleteAdAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ad_accounts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ad_accounts"] }),
  });
}
