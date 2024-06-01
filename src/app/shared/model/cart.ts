export interface cart {
    sub_category: string
    userId: string
    productname: string
    imageUrl: string
    quantity: number
    id: string
    stocks: number
    varientId: string
    price: number
    category: string
    sku: string
}

export interface cartTotalAmount {
    sub_total: number
    shipping_charge: number
    total: number
}
