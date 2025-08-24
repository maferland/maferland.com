import MDXLink from '@/components/mdx/MDXLink'
import { GitHubCard, StorybookCard } from '@/components/mdx/ProjectCard'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements with custom components
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-slate-900 dark:text-slate-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight mb-6 mt-12 text-slate-900 dark:text-slate-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight mb-4 mt-8 text-slate-900 dark:text-slate-100">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    a: ({ href, children }) => <MDXLink href={href}>{children}</MDXLink>,
    img: ({ src, alt, width, height, ...props }) => {
      if (!src) return null

      return (
        <Image
          src={src}
          alt={alt || ''}
          width={width || 800}
          height={height || 600}
          className="rounded-lg shadow-lg max-w-full h-auto"
          {...props}
        />
      )
    },
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <div className="mb-6">
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic bg-slate-50 dark:bg-slate-800 rounded-r-lg [&>div>p:last-child]:mb-0">
          <div className="text-slate-600 dark:text-slate-400">{children}</div>
        </blockquote>
      </div>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-lg p-6 mb-6 overflow-x-auto text-sm">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    hr: () => <hr className="border-slate-200 dark:border-slate-700 my-12" />,
    // Custom components
    GitHubCard,
    StorybookCard,
    ...components,
  }
}
