import {Package} from "@/types/package";

export interface Game {
  id: string,
  name: string,
  image: string,
  servers: {
    id: string,
    name: string,
  }[],
  packages: Package[]
}