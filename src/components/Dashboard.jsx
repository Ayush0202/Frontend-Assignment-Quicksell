import axios from "axios";
import { useEffect, useState } from "react";
import "./Dashboard.css";

import React from "react";

function Dashboard(props) {
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);

  // getting data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment#"
        );
        const data = await response.data;
        setTicket(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.grouping]);

  // combining the two data
  const combinedData = ticket.map((ticketItem) => {
    const correspondingUser = users.find(
      (user) => user.id === ticketItem.userId
    );
    return {
      ...ticketItem,
      user: correspondingUser,
    };
  });

  const groupByAttribute = props.grouping;

  var dict = {};

  for (let i = 0; i < combinedData.length; i++) {
    let groupValue;

    if (groupByAttribute === "user") {
      groupValue = combinedData[i].user.name;
    } else {
      groupValue = combinedData[i][groupByAttribute];
    }

    if (dict[groupValue]) {
      dict[groupValue].push(combinedData[i]);
    } else {
      dict[groupValue] = [combinedData[i]];
    }
  }

  console.log(dict);

  return (
    <>
      <h1>{props.grouping}</h1>
      <h2>{props.ordering}</h2>

      {Object.keys(dict).map((key) => (
        <div key={key}>
          <h2>{key}</h2>

          {/* values */}
          {dict[key].map((value) => (
            <div key={value.id}>
              <p>{value.title}</p>
              {/* Include other properties as needed */}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Dashboard;
