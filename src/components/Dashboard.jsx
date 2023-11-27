import axios from "axios";
import { GripHorizontal, Plus, SignalMedium } from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Dashboard.css";

function Dashboard(props) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          justifyContent: "left",
        }}
      >
        {Object.keys(dict).map((key) => (
          <div
            key={key}
            style={{
              backgroundColor: "whitesmoke",
              margin: "10px",
              width: `${width / 5}px`,
              padding: "10px",
            }}
          >
            <div key={key} className="status-item">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ marginBottom: "1px" }}>
                  <SignalMedium size={20} />
                </div>
                <div
                  style={{
                    marginTop: "0px",
                    marginRight: "5px",
                  }}
                >
                  <span style={{ fontSize: "100%" }}>{key}</span>
                </div>
                <div style={{ marginTop: "0px" }}>{dict[key].length}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ marginTop: "3px" }}>
                  <Plus size={17} />
                </div>
                <div style={{ marginTop: "3px" }}>
                  <GripHorizontal size={17} />
                </div>
              </div>
            </div>

            {/* values */}
            {dict[key].map((value) => (
              <div key={value.id}>
                <Card
                  id={value.id}
                  priority={value.priority}
                  status={value.status}
                  tag={value.tag}
                  title={value.title}
                  userId={value.userId}
                  userName={value.user.name}
                  available={value.user.available}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
