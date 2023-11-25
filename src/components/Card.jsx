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
          marginBottom: "10px",
          width: `${width / 5}px`,
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div>{props.id}</div>
        <div>{props.title} </div>
        <div>
          <div
            style={{
              border: "solid black 1px",
              width: `${props.tag.length * 120}px`,
            }}
          >
            {props.tag}
          </div>
        </div>
        {props.userId}
        {props.priority}
        {props.status}
      </div>
    </>
  );
}

export default Card;
