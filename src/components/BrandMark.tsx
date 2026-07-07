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
      <rect fill="var(--accent)" height="100" rx="22" width="100" />
      <path
        d="M25 68V34h10v5c2-4 6-6 11-6 6 0 10 2 13 7 3-5 8-7 14-7 9 0 15 6 15 17v18H78V51c0-6-3-9-8-9s-8 3-8 9v17H52V51c0-6-3-9-8-9s-9 4-9 10v16H25Z"
        fill="var(--accent-text)"
      />
    </svg>
  )
}
