import { useEffect, useState } from "react";

interface Props {
  value: string;
  onSearch: (q: string) => void;
  setShowResults: (show: boolean) => void;
}

export default function SearchBar({ value, onSearch }: Props) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative font-myfont w-full max-w-xl mx-auto">
      <input
        value={localValue}
        onChange={handleChange}
        placeholder="جستـــجو ..."
        className="w-full border border-gray-300 rounded-lg py-3 px-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        spellCheck={false}
        autoComplete="off"
      />
      {localValue && (
        <button
          aria-label="پاک کردن"
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
          onClick={() => {
            setLocalValue("");
            onSearch("");
          }}
        >
          ✕
        </button>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-4 h-5 w-5 text-gray-400 -translate-y-1/2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
      </svg>
    </div>
  );
}
