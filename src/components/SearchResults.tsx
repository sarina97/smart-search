import { useEffect, useRef } from "react";
import HighlightText from "./HighlightText";

type Result = {
  id: number;
  text: string;
};

interface Props {
  results: Result[];
  highlight: string;
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onSelect: (text: string) => void;
}

export default function SearchResults({
  results,
  highlight,
  currentIndex,
  setCurrentIndex,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeItem = container.querySelector<HTMLDivElement>(`[data-index="${currentIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  if (results.length === 0)
    return (
      <div className="text-center font-myfont mt-4 text-gray-500 font-medium">
        نتیجه‌ای یافت نشد
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="relative font-myfont mt-4 max-w-xl mx-auto max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2 scroll-smooth shadow-sm bg-white"
      aria-live="polite"
    >
      {results.map((item, i) => {
        const count =
          (item.text.toLowerCase().match(new RegExp(highlight.toLowerCase(), "g")) || []).length;

        return (
          <div
            key={item.id}
            data-index={i}
            className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-colors duration-200 ${
              i === currentIndex
                ? "bg-blue-100 text-xs xl:text:md text-blue-900 font-semibold shadow-md"
                : "hover:bg-gray-100 text-xs xl:text:md text-gray-700"
            }`}
            onClick={() => {
              setCurrentIndex(i);
              onSelect(item.text);
            }}
            tabIndex={0}
            role="button"
            aria-pressed={i === currentIndex}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentIndex(i);
                onSelect(item.text);
              }
            }}
          >
            <div className="">
              <span className="font-semibold text-gray-500 select-none">{i + 1}.</span>
              <HighlightText text={item.text} highlight={highlight} />
            </div>
            <span className="text-sm text-gray-400 select-none">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
