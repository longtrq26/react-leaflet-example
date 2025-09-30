export type City = {
  name: string
  coordinates: [number, number]
}

export interface Country {
  name: string
  flag: string
  coordinates: [number, number]
  zoom: number
  cities?: City[]
}
