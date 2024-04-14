import { api } from "./utils/api";


function CreateTransfer(sourceBalanceId: string, destinationBalanceId: string, amount: number) {

    api<{ success: boolean }>({
        url: "/api/v1/transfers",
        method: "POST",
        body: { 
          sourceBalanceId: sourceBalanceId,
          destinationBalanceId: destinationBalanceId,
          amount: amount
        },
      })
        .then((response) => {
          alert("Donation successful!");
        })
        .catch((error) => {
          console.log(error);
        });
  }
  
  export default CreateTransfer;