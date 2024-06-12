import {type CartItem} from "@/types/cartItem";
import {type Character} from "@/types/character";

export interface Cart {
  id: string,
  character: Character,
  items: CartItem[],
  total: number,
}