import { useMemo } from 'react';
import { sampleTexts } from '../data/sampleText';

type TextItem = {
  id: number;
  text: string;
};

export function useSearch(query: string) {
  return useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const allTexts: TextItem[] = Object.values(sampleTexts).flat();

    return allTexts.filter((item) => item.text.toLowerCase().includes(q));
  }, [query]);
}
