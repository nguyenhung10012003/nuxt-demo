import {type Character} from "@/types/character";

export interface User {
  id: string,
  name: string,
  balance: number,
  characters: Character[],
}