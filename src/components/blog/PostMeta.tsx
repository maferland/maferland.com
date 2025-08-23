interface PostMetaProps {
  date: string
  tags?: string[]
}

export default function PostMeta({ date, tags }: PostMetaProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
      <time dateTime={date}>{formattedDate}</time>
      {tags && tags.length > 0 && (
        <div className="flex gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
