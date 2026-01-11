import React from "react";

type TextChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type ParagraphBlock = {
  type: "paragraph";
  children: TextChild[];
};

type HeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: TextChild[];
};

type ImageBlock = {
  type: "image";
  url: string;
  alt?: string;
};

type Block = ParagraphBlock | HeadingBlock | ImageBlock;

type ArticleContentProps = {
  content: Block[];
};

function TextFragment({ child }: { child: TextChild }) {
  let element: React.ReactNode = child.text;

  if (child.bold) element = <strong>{element}</strong>;
  if (child.italic) element = <em>{element}</em>;
  if (child.underline) element = <u>{element}</u>;

  return <>{element}</>;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div>
      {content.map((block, idx) => {
        console.log("Block:", block);
        if ("children" in block) {
          const children = block.children.map((child, i) => (
            <TextFragment key={i} child={child} />
          ));

          switch (block.type) {
            case "paragraph":
              return <p key={idx}>{children}</p>;

            case "heading":
              switch (block.level) {
                case 1:
                  return <h1 key={idx}>{children}</h1>;
                case 2:
                  return <h2 key={idx}>{children}</h2>;
                case 3:
                  return <h3 key={idx}>{children}</h3>;
                case 4:
                  return <h4 key={idx}>{children}</h4>;
                default:
                  return <p key={idx}>{children}</p>;
              }

            default:
              return null;
          }
        }

        if (block.type === "image") {
          return (
            <img
              key={idx}
              src={block.url}
              alt={block.alt || ""}
              style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
