import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

function Dashboard() {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment#"
        );
        const data = await response.data;
        console.log("controller reacher");
        console.log(data.tickets);
        setTicket(data.tickets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {ticket.map((ticket) => (
        <Card id={ticket.id} title={ticket.title} tag={ticket.tag} />
      ))}
    </>
  );
}

export default Dashboard;
