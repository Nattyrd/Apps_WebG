export type Receipt = {
    items: Items[];
    userId: number;
    receiptNumber: number;
    dateTime: string;
    total: number;

}

export type Items = {
    name: string;
    amount: number;
    price: number;
}