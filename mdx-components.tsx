import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-light text-text-heading mb-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-medium text-text-heading mt-12 mb-4">{children}</h2>,
    p: ({ children }) => <p className="text-lg text-text-primary leading-relaxed mb-6">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-lg text-text-primary">{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-text-heading">{children}</strong>,
    ...components,
  };
}
