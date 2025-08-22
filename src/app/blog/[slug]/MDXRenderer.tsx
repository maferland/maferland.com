/* eslint-disable @typescript-eslint/no-require-imports */

import { useMDXComponents } from '@/components/mdx-components'
import { MDXRemote } from 'next-mdx-remote/rsc'

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
                require('rehype-highlight'),
                {
                  ignoreMissing: true,
                  languages: {
                    typescript: require('highlight.js/lib/languages/typescript'),
                    tsx: require('highlight.js/lib/languages/typescript'),
                    bash: require('highlight.js/lib/languages/bash'),
                    json: require('highlight.js/lib/languages/json'),
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
