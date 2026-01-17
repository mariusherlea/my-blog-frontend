"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block sticky top-24 h-fit">
      <div className="border-l pl-4">
        <p className="text-sm font-semibold mb-3 text-gray-500">
          On this page
        </p>

        <ul className="space-y-2 text-sm">
          {items.map(item => {
            const isActive = activeId === item.id;

            return (
              <li
                key={item.id}
                className={item.level === 3 ? "ml-4" : ""}
              >
                <a
                  href={`#${item.id}`}
                  className={`block transition ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-green-400"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
