import React from "react";

export type CardHoverItem = {
  title: string;
  description: string;
  link: string;
};

export function HoverEffect({ items }: { items: CardHoverItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <a
          key={item.title + idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl bg-card shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              {item.description}
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      ))}
    </div>
  );
}
