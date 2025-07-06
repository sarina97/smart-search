import { useMemo } from "react";
import { sampleTexts } from "../data/sampleText";

export function useSuggestions(query: string) {
  return useMemo(() => {
    if (!query) return [];
    const lower = query.toLowerCase();
    const all = Object.values(sampleTexts).flatMap(category => category); 

    return all
      .map(item => item.text)
      .filter(text => text.toLowerCase().startsWith(lower))
      .slice(0, 5);
  }, [query]);
}
