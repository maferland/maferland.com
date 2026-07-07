interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="var(--accent)" height="100" rx="29" width="100" />
      <text
        dominantBaseline="middle"
        fill="var(--accent-text)"
        fontFamily="ui-monospace, 'JetBrains Mono', monospace"
        fontSize="64"
        fontWeight="700"
        textAnchor="middle"
        x="50"
        y="56"
      >
        m
      </text>
    </svg>
  )
}
