type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <aside className="hidden lg:block sticky top-24 h-fit">
      <div className="border-l pl-4">
        <p className="text-sm font-semibold mb-3 text-gray-600">
          Table of contents
        </p>

        <ul className="space-y-2 text-sm">
          {items.map(item => (
            <li
              key={item.id}
              className={item.level === 3 ? "ml-4" : ""}
            >
              <a
                href={`#${item.id}`}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
