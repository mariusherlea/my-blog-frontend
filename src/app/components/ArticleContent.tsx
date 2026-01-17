// src/components/ArticleContent.tsx
// src/components/ArticleContent.tsx

type TextChild = {
  type: "text";
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  children: TextChild[];
};

type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  children: TextChild[];
};

type ListItemBlock = {
  type: "list-item";
  children: TextChild[];
};

type ListBlock = {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItemBlock[];
};

type CodeBlock = {
  type: "code";
  language?: string;
  children: TextChild[];
};

type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CodeBlock;

type ArticleContentProps = {
  content: ContentBlock[];
};

/* ---------------- HELPERS ---------------- */

function getText(children: TextChild[]) {
  return children.map(c => c.text).join("");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/* ---------------- COMPONENT ---------------- */

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="max-w-none text-lg leading-relaxed">
      {content.map((block, i) => {
        switch (block.type) {
          /* ---------- PARAGRAPH ---------- */
          case "paragraph":
            return (
              <p key={i} className="mb-6">
                {getText(block.children)}
              </p>
            );

          /* ---------- HEADING ---------- */
          case "heading": {
            const text = getText(block.children);
            const id = slugify(text);

            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  id={id}
                  className="text-3xl font-semibold mt-12 mb-5"
                >
                  {text}
                </h2>
              );
            }

            if (block.level === 3) {
              return (
                <h3
                  key={i}
                  id={id}
                  className="text-2xl font-semibold mt-8 mb-4"
                >
                  {text}
                </h3>
              );
            }

            return null;
          }

          /* ---------- LIST ---------- */
          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";

            return (
              <ListTag
                key={i}
                className={`mb-6 ml-6 space-y-2 ${
                  block.format === "ordered"
                    ? "list-decimal"
                    : "list-disc"
                }`}
              >
                {block.children.map((item, idx) => (
                  <li key={idx}>
                    {getText(item.children)}
                  </li>
                ))}
              </ListTag>
            );
          }

          /* ---------- CODE ---------- */
          case "code":
            return (
              <pre
                key={i}
                className="mb-6 rounded-lg bg-zinc-900 p-4 overflow-x-auto"
              >
                <code className="font-mono text-sm text-zinc-100 leading-relaxed">
                  {getText(block.children)}
                </code>
              </pre>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}


