interface PostMetaProps {
  date: string
  tags?: string[]
  maxTags?: number
}

export default function PostMeta({ date, tags, maxTags = 4 }: PostMetaProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const displayTags = tags ? tags.slice(0, maxTags) : []
  const hasMoreTags = tags && tags.length > maxTags

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600 dark:text-slate-400">
      <time dateTime={date}>{formattedDate}</time>
      {displayTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {displayTags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs sm:text-sm"
            >
              {tag}
            </span>
          ))}
          {hasMoreTags && (
            <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs sm:text-sm">
              +{tags!.length - maxTags} more
            </span>
          )}
        </div>
      )}
    </div>
  )
}
