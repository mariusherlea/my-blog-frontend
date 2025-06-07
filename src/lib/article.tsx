type TextChild = {
  type: "text";
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  children: TextChild[];
};

type Heading1Block = {
  type: "heading1";
  children: TextChild[];
};

type Heading2Block = {
  type: "heading2";
  children: TextChild[];
};

type ImageBlock = {
  type: "image";
  url: string;
  alt?: string;
};

type Block = ParagraphBlock | Heading1Block | Heading2Block | ImageBlock;

type ArticleContentProps = {
  content: Block[];
};

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div>
      {content.map((block, idx) => {
        const text =
          "children" in block ? block.children.map((c) => c.text).join("") : "";

        switch (block.type) {
          case "paragraph":
            return <p key={idx}>{text}</p>;

          case "heading1":
            return <h1 key={idx}>{text}</h1>;

          case "heading2":
            return <h2 key={idx}>{text}</h2>;

          case "image":
            return (
              <img
                key={idx}
                src={block.url}
                alt={block.alt || ""}
                style={{ maxWidth: "100%", height: "auto", margin: "1rem 0" }}
              />
            );

          default:
            return null; // Ignoră blocurile necunoscute
        }
      })}
    </div>
  );
}
