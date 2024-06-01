import { cart, cartTotalAmount } from "./cart";

export interface checkout {
    cart: cart[]
    carttotal: cartTotalAmount
}