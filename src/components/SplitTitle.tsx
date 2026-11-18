import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type SplitTitleProps = {
  /** Full title text. */
  text: string;
  /** Exact substring of `text` to highlight (e.g. "stand out."). */
  highlight?: string;
  highlightClassName?: string;
  /** Class put on every letter span — used as the GSAP animation target. */
  letterClassName?: string;
  as?: ElementType;
  className?: string;
};

/**
 * Renders a title split into letters for per-letter animations, WITHOUT ever
 * breaking a word across two lines.
 *
 * Structure: <h1 aria-label="full text">
 *              <span word inline-block nowrap><span letter/>…</span> <space> …
 *            </h1>
 * - Letters must be inline-block to be transformable, but a row of inline-blocks
 *   can wrap between any two of them. Wrapping letters in a nowrap word span
 *   leaves the browser only the real spaces as line-break opportunities.
 * - Spaces stay plain text nodes (not &nbsp;) so lines can still wrap between words.
 * - Screen readers read the aria-label instead of spelling letter by letter.
 */
export default function SplitTitle({
  text,
  highlight,
  highlightClassName = "text-primary",
  letterClassName,
  as: Tag = "h1",
  className,
}: SplitTitleProps) {
  const hlStart = highlight ? text.indexOf(highlight) : -1;
  const hlEnd = hlStart >= 0 && highlight ? hlStart + highlight.length : -1;
  const isHighlighted = (i: number) => i >= hlStart && i < hlEnd;

  // Tokenize into words while keeping each letter's index in the full string.
  const words: { start: number; value: string }[] = [];
  const re = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    words.push({ start: match.index, value: match[0] });
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={word.start} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {Array.from(word.value).map((char, c) => {
              const index = word.start + c;
              return (
                <span
                  key={index}
                  className={cn("inline-block", letterClassName, isHighlighted(index) && highlightClassName)}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
