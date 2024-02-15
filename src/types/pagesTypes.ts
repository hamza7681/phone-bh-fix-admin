import { ChangeEvent } from 'react'
import { Brand } from './componentTypes'
import { Url } from 'next/dist/shared/lib/router/router'

export type SideBarProps = {
  setCollapsed1: (collapsed1: boolean) => void
  collapsed1: boolean
  collapsed: boolean
}

export type BreadCrumbsProps = {
  parent: string
  child?: string
  path: Url
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

export type DeleteDialogProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  handleDelete: () => void
  loading: boolean
}

type SetBrands = (newBrands: Brand[]) => void
