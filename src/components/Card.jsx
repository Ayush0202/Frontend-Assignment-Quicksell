import { Circle, CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
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
            {props.priority}
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
            <Circle size={8} fill="lightgray" /> {props.tag}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
