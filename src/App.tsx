import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { useDebounce } from "./hooks/useDebounce";
import { useSearch } from "./hooks/useSearch";
import ScrollArrows from "./components/ScrollArrows";
import Loader from "./components/Loader";
import { useInstallPrompt } from "./hooks/useInstallPrompt";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const [loading, setLoading] = useState(false);
  const results = useSearch(debouncedQuery);
  const [isPWA, setIsPWA] = useState(false);
  const promptInstall = useInstallPrompt();


  useEffect(() => {
    if (query && query !== debouncedQuery) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    setCurrentIndex(0);
  }, [query, debouncedQuery, results]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (results.length === 0) return;
      if (e.key === "ArrowDown") {
        setCurrentIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        setQuery(results[currentIndex]?.text || "");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [results, currentIndex]);


  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator.standalone === true;
    setIsPWA(standalone);
  }, []);

  return (
    <main
      dir="rtl"
      className="flex font-myfont flex-col overflow-hidden items-center justify-center min-h-screen bg-gray-50 px-4 py-10"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="font-myfont w-full relative max-w-3xl min-h-[50vh] lg:min-h-[70vh] bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-8 text-center text-blue-600 select-none">
          سرچ هوشــــمند
        </h1>

        <SearchBar
          value={query}
          onSearch={setQuery}
          setShowResults={setShowResults}
        />

        {loading ? (
          <div className="mt-8 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="">
            {!showResults && !loading && (
              <SearchResults
                results={results}
                highlight={debouncedQuery}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                onSelect={(text) => {
                  setQuery(text);
                  setCurrentIndex(0);
                  setShowResults(false);
                }}
              />
            )}
          </div>
        )}

        {results.length > 0 && query.trim() !== "" && (
          <ScrollArrows
            currentIndex={currentIndex}
            maxIndex={results.length - 1}
            onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            onNext={() =>
              setCurrentIndex((i) => Math.min(i + 1, results.length - 1))
            }
          />
        )}
      </div>

      {!isPWA && (
        <button
          onClick={promptInstall}
          className="fixed bottom-14 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition"
        >
          نصب PWA
        </button>
      )}
    </main>
  );
}
