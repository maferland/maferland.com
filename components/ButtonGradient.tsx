import React from 'react'

type ButtonProps = (
  | {
      title: string
      children?: never
    }
  | {
      title?: never
      children: React.ReactNode
    }
) &
  (
    | {onClick: () => void; href?: never}
    | {
        onClick?: never
        href: string
        target?: '_blank' | '_self' | '_parent' | '_top'
      }
  )

function ButtonGradient(props: ButtonProps) {
  const content = props.title ?? props.children
  if (props.href) {
    return (
      <a className="btn btn-gradient animate-shimmer" href={props.href}>
        {content}
      </a>
    )
  }
  return (
    <button
      className="btn btn-gradient animate-shimmer"
      onClick={props.onClick}
    >
      {content}
    </button>
  )
}

export default ButtonGradient
