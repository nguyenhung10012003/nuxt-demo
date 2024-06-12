import {defineStore} from "pinia";
import user from "@/datas/user.json";
import type {CartItem} from "@/types/cartItem";
import type {Character} from "@/types/character";
import type {Cart} from "@/types/cart";
import type {User} from "@/types/user";

export const useUserStore = defineStore(
  'user', {
    state() {
      return {
        user: user as User,
        cart: undefined as Cart | undefined,
      }
    },

    actions: {
      addToCart(item: CartItem, char: Character) {
        if (!this.cart) {
          this.cart = {
            id: "1",
            character: char,
            items: [item],
            total: item.package.price * item.quantity,
          };
          return;
        } else if (this.cart.character.id !== char.id) {
          this.cart = {
            id: "1",
            character: char,
            items: [item],
            total: item.package.price * item.quantity,
          };
          return;
        } else {
          if (this.cart.items.find((i) => i.package.id === item.package.id)) {
            throw new Error("Item already in cart");
          }
          this.cart = {
            ...this.cart,
            items: [...this.cart.items, item],
            total: this.cart.total + item.package.price * item.quantity,
          };
        }
      },
      removeFromCart(item: CartItem) {
        if (this.cart) {
          if (this.cart.items.length === 1) {
            this.cart = undefined;
            console.log(this.cart);
            return;
          }
          this.cart = {
            ...this.cart,
            items: this.cart.items.filter((i) => i.package.id !== item.package.id),
            total: this.cart.total - item.package.price * item.quantity,
          };
        }
      },
      updateQuantity(item: CartItem, quantity: number) {
        if (this.cart)
          this.cart = {
            ...this.cart,
            items: this.cart.items.map((i) =>
              i.package.id === item.package.id
                ? {...i, quantity}
                : i
            ),
            total: this.cart.total + (quantity - item.quantity) * item.package.price,
          };
      },
    }
  }
)