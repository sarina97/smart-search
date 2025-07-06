import { motion } from "framer-motion";

interface Props {
  text: string;
  highlight: string;
}

export default function HighlightText({ text, highlight }: Props) {
  if (!highlight) return <span>{text}</span>;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <motion.mark
            key={i}
            layout
            initial={{ backgroundColor: "#facc15", scale: 0.9 }}
            animate={{ backgroundColor: "#fde047", scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            className="px-0.5 rounded"
          >
            {part}
          </motion.mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
