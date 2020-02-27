// Setup and export interface with all necessary properties
// of the Dustbin component, including our onDrop function
export interface DustbinProps {
  accept: string[]
  lastDroppedItem?: any
  profile: any
  onDrop: (item: any) => void
}