import type { ReactNode } from "react"

type Variant = "primary" | "gold" | "ghost" | "ivory" | "on-dark"

type Common = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type LinkProps = Common & { href: string; external?: boolean }
type ActionProps = Common & {
  href?: undefined
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  pressed?: boolean
  autoFocus?: boolean
}
type Props = LinkProps | ActionProps

function isLink(props: Props): props is LinkProps {
  return typeof props.href === "string"
}

export function Button(props: Props) {
  const className = `btn btn-${props.variant ?? "primary"}${props.className ? ` ${props.className}` : ""}`

  if (isLink(props)) {
    return (
      <a
        className={className}
        href={props.href}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {props.children}
      </a>
    )
  }

  return (
    <button
      className={className}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-pressed={props.pressed}
      autoFocus={props.autoFocus}
    >
      {props.children}
    </button>
  )
}
