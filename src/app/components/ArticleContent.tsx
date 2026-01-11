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
  level: number;
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

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <>
      {content.map((block, i) => {
        /* ---------------- PARAGRAPH ---------------- */
        if (block.type === "paragraph") {
          return (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {block.children.map((c) => c.text).join("")}
            </p>
          );
        }

        /* ---------------- HEADING ---------------- */
        if (block.type === "heading") {
          const text = block.children.map((c) => c.text).join("");

          switch (block.level) {
            case 2:
              return (
                <h2 key={i} className="text-3xl font-semibold mb-5">
                  {text}
                </h2>
              );
            case 3:
              return (
                <h3 key={i} className="text-2xl font-semibold mb-4">
                  {text}
                </h3>
              );
            default:
              return null;
          }
        }

        /* ---------------- LIST ---------------- */
        if (block.type === "list") {
          const ListTag = block.format === "ordered" ? "ol" : "ul";

          return (
            <ListTag
              key={i}
              className="mb-6 ml-6 list-disc space-y-2"
            >
              {block.children.map((item, idx) => (
                <li key={idx}>
                  {item.children.map((c) => c.text).join("")}
                </li>
              ))}
            </ListTag>
          );
        }

        /* ---------------- CODE ---------------- */
        if (block.type === "code") {
          const code = block.children.map((c) => c.text).join("");

          return (
            <pre
              key={i}
              className="mb-6 rounded-lg bg-zinc-900 p-4 overflow-x-auto text-sm text-zinc-100"
            >
              <code className="font-mono leading-relaxed">
                {code}
              </code>
            </pre>
          );
        }

        return null;
      })}
    </>
  );
}
