export type TransferResponse = {
    transferId: string;
    amount: number;
    sourceBalanceId: String;
    destinationBalanceId: String;
};


export type CreateTransferRequest = {
    sourceBalanceId: string,
    destinationBalanceId: string
    amount: number
};

export type CreateTransferResponse = {
    newBalanceAmount: number;
};