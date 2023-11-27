import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import Card from "./Card";
import "./Dashboard.css";

import { getHeadingIcon } from "../helper/Icon";

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

  for (let i = 0; i < combinedData.length; i++) {
    if (combinedData[i].priority === 4) {
      combinedData[i].priorityStatus = "Urgent";
    } else if (combinedData[i].priority === 3) {
      combinedData[i].priorityStatus = "High";
    } else if (combinedData[i].priority === 2) {
      combinedData[i].priorityStatus = "Medium";
    } else if (combinedData[i].priority === 1) {
      combinedData[i].priorityStatus = "Low";
    } else if (combinedData[i].priority === 0) {
      combinedData[i].priorityStatus = "No Priority";
    }
  }

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

  if (props.grouping === "status") {
    if (!dict["Done"]) {
      dict["Done"] = [];
    }
    if (!dict["Canceled"]) {
      dict["Canceled"] = [];
    }
  }

  console.log(dict);

  return (
    <>
      <h1>{width}</h1>
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
                <div style={{ marginTop: "1px" }}>
                  {getHeadingIcon(props.grouping, key)}
                </div>
                <div
                  style={{
                    marginRight: "7px",
                    marginLeft: "7px",
                  }}
                >
                  <span style={{ fontSize: "100%", fontWeight: "500" }}>
                    {key}
                  </span>
                </div>
                <div style={{ marginTop: "0px" }}>{dict[key].length}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "left" }}>
                <div
                  style={{
                    marginTop: "3px",
                    marginRight: "7px",
                    ...(window.innerWidth < 730 && {
                      marginRight: "0px",
                    }),
                  }}
                >
                  <FiPlus />
                </div>
                <div style={{ marginTop: "3px" }}>
                  <BsThreeDots />
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
                  grouping={props.grouping}
                  ordering={props.ordering}
                  statusIcon={value.statusIcon}
                  priorityIcon={value.priorityIcon}
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
