import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAppStrings() {
  return useQuery({
    queryKey: ["app_strings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_strings")
        .select("key,value")
        .order("sort_order");
      if (error) throw error;
      const map: Record<string, string> = {};
      data.forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });
}

export function useTips(season: "summer" | "winter") {
  return useQuery({
    queryKey: ["tips", season],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tips")
        .select("id,appliance,body,sort_order")
        .eq("season", season)
        .order("appliance")
        .order("sort_order");
      if (error) throw error;
      // group by appliance
      const grouped = new Map<string, string[]>();
      data.forEach((t) => {
        if (!grouped.has(t.appliance)) grouped.set(t.appliance, []);
        grouped.get(t.appliance)!.push(t.body);
      });
      return Array.from(grouped.entries()).map(([appliance, tips]) => ({ appliance, tips }));
    },
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useAboutSections() {
  return useQuery({
    queryKey: ["about_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_sections")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}
