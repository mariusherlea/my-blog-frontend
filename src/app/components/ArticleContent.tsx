// src/components/ArticleContent.tsx
type ContentBlock = {
  type: string;
  children: { type: string; text: string }[];
};

type ArticleContentProps = {
  content: ContentBlock[];
};

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <>
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          const paragraphText = block.children.map((child) => child.text).join("");
          return (
            <p key={i} className="mb-4 text-lg leading-relaxed">
              {paragraphText}
            </p>
          );
        }
        // Poți extinde cu alte tipuri (heading, listă etc.) dacă ai nevoie
        return null;
      })}
    </>
  );
}
