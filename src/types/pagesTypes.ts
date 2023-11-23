import { ChangeEvent } from 'react'

export type SideBarProps = {
  setCollapsed1: (collapsed1: boolean) => void
  collapsed1: boolean
  collapsed: boolean
}

export type BreadCrumbsProps = {
  parent: string
  child: string
  path: string
}

export type FormInputProps = {
  label: string
  referenceId: string
  type: string
  placeholder: string
  value: string | number
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
}
