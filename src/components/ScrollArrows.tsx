interface Props {
  currentIndex: number;
  maxIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function ScrollArrows({
  currentIndex,
  maxIndex,
  onPrev,
  onNext,
}: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="absolute -bottom-20 lg:bottom-1/2  right-32 lg:right-10 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded disabled:opacity-40"
        aria-label="نتیجه قبلی"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex === maxIndex}
        className="absolute -bottom-20 lg:bottom-1/2 left-32 lg:left-10 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded disabled:opacity-40"
        aria-label="نتیجه بعدی"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </>
  );
}
