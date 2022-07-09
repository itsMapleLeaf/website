import clsx from "clsx"

export const linkStyle = clsx`
  relative inline-block transition-all
  after:absolute after:inset-x-0 after:bg-orange-300 after:bottom-[1px] after:h-px after:transition-all after:opacity-25
  hover:text-orange-300 hover:after:h-[calc(100%+6px)] hover:after:-my-1 hover:after:-mx-1.5 hover:after:rounded-sm
`
