export interface Block<TransactionType = any> {
    number: number;
    hash: string;
    timestamp: number;
    size: number;
    parentHash: string;
    difficulty?: number;
    nonce?: number;
    transactions?: TransactionType[];
}
