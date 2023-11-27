import { Circle, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { BsExclamationSquareFill, BsThreeDots } from "react-icons/bs";
import { LuSignalHigh, LuSignalLow, LuSignalMedium } from "react-icons/lu";

function Card(props) {
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

  const getPriorityIcon = () => {
    if (props.priority === 4) {
      return <BsExclamationSquareFill />;
    } else if (props.priority === 3) {
      return <LuSignalHigh />;
    } else if (props.priority === 2) {
      return <LuSignalMedium />;
    } else if (props.priority === 1) {
      return <LuSignalLow />;
    } else if (props.priority === 0) {
      return <BsThreeDots />;
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
          width: "90%",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "11px", marginBottom: "5px" }}>
            {props.id}
          </div>
          {(props.grouping === "status" || props.grouping === "priority") && (
            <div>
              <CircleUserRound size={20} />
            </div>
          )}
        </div>
        <div
          style={{ fontSize: "12px", fontWeight: "500", marginBottom: "8px" }}
        >
          {props.title}{" "}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "solid gray 1px",
              width: `${props.tag.length * 10}px`,
              height: "11px",
              borderRadius: "10%",
              marginRight: "5px",
              padding: "1px",
            }}
          >
            {getPriorityIcon()}
          </div>

          <div
            style={{
              fontSize: "9px",
              border: "solid gray 1px",
              width: `${props.tag.length * 80}px`,
              borderRadius: "10%",
              padding: "1px",
              ...(window.innerWidth < 540 && {
                fontSize: "7px",
                width: `${props.tag.length * 65}px`,
              }),
            }}
          >
            <Circle size={8} fill="lightgray" style={{ marginLeft: "2px" }} />{" "}
            <span style={{ color: "gray" }}>{props.tag}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
