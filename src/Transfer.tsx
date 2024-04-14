import React, { useEffect, useState } from 'react';
import { TransferResponse } from './models/transfers';
import { api } from "./utils/api";

export const Transfer = () =>{
    const [transfers, setTransfers] = useState<TransferResponse[]>([]);


    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      api<TransferResponse[]>({ url: `/api/v1/transfers`, method: "GET" })
        .then((response) => {
          if (response) {
            setTransfers(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
      <div>
        {transfers.map((transfer) => (
          <div key={transfer.transferId} style={{ border: "1px solid black", borderColor: "red", padding: "10px" }}>
            <p>Transfer ID: {transfer.sourceBalanceId}</p>
            <p>Amount: {transfer.amount}</p>
            <p>Status: {transfer.destinationBalanceId}</p>
          </div>
        ))}
      </div>
    );
};

export default Transfer;