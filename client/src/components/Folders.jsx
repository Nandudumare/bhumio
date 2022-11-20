import { useState } from "react";
import { AiFillFolder } from "react-icons/ai";

export const Folders = ({ explorer, setDetails, details }) => {
  const [expand, setExpand] = useState(false);

  return explorer.isFolder ? (
    <div>
      <span
        onClick={() => {
          setExpand((prev) => !prev);
          setDetails({
            ...explorer,
          });
        }}
        style={{ cursor: "pointer" }}
      >
        <span
          style={{
            marginLeft: "0.5rem",
            backgroundColor: expand ? "grey" : "none",
          }}
        >
          📁 {explorer.details.name}
        </span>
        <br />
      </span>

      <div style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}>
        {explorer.items?.map((el, index) => {
          return (
            <Folders
              key={el.details.name.toString()}
              explorer={el}
              setDetails={setDetails}
              details={details}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <span
      onClick={() => {
        // setExpand((prev) => !prev);
        setDetails({
          ...explorer,
        });
      }}
      style={{ paddingLeft: "25px" }}
    >
      📃 {explorer.details.name}
      <br />
    </span>
  );
};
