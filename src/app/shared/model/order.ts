export interface order {
    orderId: string
    usrid: string
    pincode: string
    address1: string
    createdTime: CreatedTime
    state: string
    country: string
    city: string
    note: string
    address2: string
    last_name: string
    status: string
    first_name: string
    email: string
    amount: number
    cartItems: CartItem[]
    contact: string
}

export interface CreatedTime {
    seconds: number
    nanoseconds: number
}

export interface CartItem {
    varientId: string
    sku: string
    sub_category: string
    category: string
    orderId: string
    stocks: number
    productname: string
    userId: string
    price: number
    imageUrl: string
    id: string
    quantity: number
}
