//lib/article.ts
import { PortableText } from "@portabletext/react";

type ArticleContentProps = {
  content: any;
};

export function ArticleContent({ content }: ArticleContentProps) {
  return <PortableText value={content} />;
}
