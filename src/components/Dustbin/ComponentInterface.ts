export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  profile: any
  onDrop: (item: any) => void
}