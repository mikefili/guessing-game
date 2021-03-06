// Setup typing and export interfaces for State on the 
// GameCard, Dustbin, and Box components
export interface GameCardState {
  players: Object
}

export interface DustbinState {
  accepts: string[]
  lastDroppedItem: any
  profile: any
}

export interface BoxState {
  name: string
  profilePicture: any
  uid: any
  type: string
}