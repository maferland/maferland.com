import { useMDXComponents } from '@/components/mdx-components'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

interface MDXRendererProps {
  source: string
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  const components = useMDXComponents({})

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypeHighlight,
                {
                  ignoreMissing: true,
                  languages: {
                    typescript,
                    tsx: typescript,
                    bash,
                    json,
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  )
}
