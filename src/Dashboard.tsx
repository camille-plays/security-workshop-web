import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./utils/api";
import { BalanceResponse } from "./models/balanceResponse";
import { CharityResponse } from "./models/charityResponse";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<BalanceResponse>({ url: `/api/v1/balance`, method: "GET" })
      .then((response) => {
        if (response?.amount) {
          setBalance(response.amount);
        } else {
          setError("An error occurred while fetching the balance.");
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching the balance.");
        console.log(error);
      });
  }, []);


  const [charities, setCharities] = useState<CharityResponse[]>([]);

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

  return (
    <div>
      <p>Welcome to your Dashboard</p>
      {balance !== null ? (
        <p>Your balance amount is: {balance}</p>
      ) : (
        <p>{error}</p>
      )}
      <h2>Charities</h2>
      {charities.map((charity) => (
        <div key={charity.balanceId}>
          <h3>{charity.name}</h3>
          <p>{charity.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Dashboard;
