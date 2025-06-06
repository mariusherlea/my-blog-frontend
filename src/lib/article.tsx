type TextChild = {
  type: "text";
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  children: TextChild[];
};

type ArticleContentProps = {
  content: ParagraphBlock[];
};

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div>
      {content.map((block, idx) => {
        if (block.type === "paragraph") {
          return (
            <p key={idx}>
              {block.children.map((child) => child.text).join("")}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}
