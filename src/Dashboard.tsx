import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { BiDonateHeart } from "react-icons/bi";

import { api } from "./utils/api";
import { BalanceResponse } from "./models/balanceResponse";
import { CharityResponse } from "./models/charityResponse";
import CreateTransfer from "./CreateTransfer";
import {
  CreateTransferRequest,
  CreateTransferResponse,
} from "./models/transfers";
import Logout from "./Logout";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [balance, setBalance] = useState<number | null>(null);
  const [charities, setCharities] = useState<CharityResponse[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<BalanceResponse>({ url: `/api/v1/balance`, method: "GET" })
      .then((response) => {
        if (response?.amount) {
          setBalance(response.amount);
          localStorage.setItem("balanceId", response.balanceId);
        } else {
          setError("An error occurred while fetching the balance.");
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching the balance.");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api<CharityResponse[]>({ url: `/api/v1/charities`, method: "GET" })
      .then((response) => {
        if (response) {
          setCharities(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function donate(balanceId: string) {
    const req: CreateTransferRequest = {
      sourceBalanceId: localStorage.getItem("balanceId") || "",
      destinationBalanceId: balanceId,
      amount: 1.0,
    };

    api<CreateTransferResponse>({
      url: "/api/v1/transfers",
      method: "POST",
      body: req,
    })
      .then((response) => {
        setBalance(response?.newBalanceAmount ?? 0);
      })
      .catch((error) => {
        //todo: add exact error from backend
        alert(error.message);
      });
  }

  return (
    <div className="p-10">
      {Balance()}
      {Charities()}
    </div>
  );

  function Charities() {
    return (
      <div className="pt-20">
        <p className="text-2xl font-extrabold	text-slate-800 pb-4">Charities</p>
        <div className="flex flex-row space-x-12">
          {charities.map((charity) => (
            <div key={charity.balanceId} className="grow">
              <div className="bg-slate-200 p-4 rounded-lg">
                <p className="text-lg font-semibold h-full text-center">
                  {charity.name}
                </p>
                <div className="h-[1px] w-full bg-slate-300 px-4 my-2"></div>
                <p className="">{charity.description}</p>
              </div>
              <button
                className="bg-rose-400 p-2 rounded-lg mt-4 hover:bg-rose-700 flex justify-center items-center"
                onClick={() => donate(charity.balanceId)}
              >
                <BiDonateHeart color="white" />
                <p className="text-white text-center pl-2">Donate</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Balance() {
    return (
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="text-2xl font-extrabold	text-slate-800 pb-2">
            Your balance amount is:
          </p>
          <div className="flex items-center">
            <RiMoneyPoundCircleFill size={40} color="#334155" />
            <p className="pl-2 text-2xl font-bold text-slate-800">{balance}</p>
          </div>
        </div>
        <div>
          <Logout />
        </div>
      </div>
    );
  }
};
export default Dashboard;
