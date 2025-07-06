interface Part {
  text: string;
  highlight: boolean;
}

export function highlightMatches(text: string, query: string): Part[] {
  if (!query) return [{ text, highlight: false }];

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts: Part[] = [];
  let lastIndex = 0;

  text.replace(regex, (match, _p1, offset) => {
    if (offset > lastIndex) {
      parts.push({ text: text.slice(lastIndex, offset), highlight: false });
    }
    parts.push({ text: match, highlight: true });
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlight: false });
  }

  return parts;
}
