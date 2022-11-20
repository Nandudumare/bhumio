import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTraverse from "../Hooks/useTraverse";
import { getData } from "../Redux/action";
import { Folders } from "./Folders";
import pdf from "../pdf/new_document.pdf";

import { jsPDF } from "jspdf";

const Structure = () => {
  const data = useSelector((state) => state.data);
  const [details, setDetails] = useState({});
  const [add, setAdd] = useState(false);
  const [wantToAdd, setWantToAdd] = useState({});
  const formRef = useRef();

  const dispatch = useDispatch();

  const { insertNode } = useTraverse();

  const handleInsertNode = async (folderId, item, isFolder) => {
    try {
      const finalTree = insertNode(data[0], folderId, item, isFolder);
      let res = await axios.patch(
        `http://localhost:8080/family/${data[0]._id}`,
        finalTree
      );
      let da = res.data;
      console.log("da:", da);
      formRef.current.reset();
      setAdd(false);
      dispatch(getData());
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;

    setWantToAdd({
      ...wantToAdd,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleInsertNode(details.id, wantToAdd, true);
    } catch (err) {
      console.log("err:", err);
    }
  };

  const savePdf = () => {
    if (!Object.keys(details).length > 0) {
      return alert("Plese Select the folder");
    }
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    doc.setFontSize(8);
    var splitTitle = doc.splitTextToSize(JSON.stringify(details), 180);
    doc.text(15, 20, splitTitle);

    doc.save("familyTree.pdf");
  };

  return (
    <div className="main">
      <div>
        <div>
          <div>
            <h4>Family Tree</h4>
            <div
              style={{ border: "1px solid", backgroundColor: "black" }}
            ></div>
          </div>
          <div className="searchBar">
            <input
              type="text"
              style={{
                height: "100%",
                width: "95%",
                fontSize: "1.3rem",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                paddingLeft: "10px",
              }}
              placeholder="Search"
            />
          </div>
          <div className="folders">
            {/* map Here */}
            {data[0] && (
              <Folders
                explorer={data[0]}
                details={details}
                setDetails={setDetails}
              />
            )}
          </div>
        </div>
        <div
          onClick={() => {
            if (!Object.keys(details).length > 0) {
              return alert("Plese Select the folder");
            }
            setAdd((prev) => !prev);
          }}
          style={{ cursor: "pointer" }}
        >
          <h4>Add Family</h4>
        </div>
        <div onClick={savePdf}>
          {/* <a
            target="_blank"
            rel="noreferrer"
            href={pdf}
            download="FamilyTree"
            style={{ textDecoration: "none", color: "black" }}
          > */}
          <h4>Print Family Tree</h4>
          {/* </a> */}
        </div>
      </div>
      <div>
        <div>
          <h4 style={{ textAlign: "center" }}>Family Details</h4>
          <div style={{ border: "1px solid", backgroundColor: "black" }}></div>
        </div>
        {add ? (
          <form ref={formRef} action="" onSubmit={handleSubmit}>
            <div className="details">
              <div>
                <p>
                  Name :
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    required
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div>
                <p>
                  Spouse :
                  <input
                    type="text"
                    name="Spouse"
                    placeholder="Enter Your Spouse Name"
                    required
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div>
                <p>
                  Location :
                  <input
                    type="text"
                    name="Location"
                    placeholder="Enter Your Location"
                    required
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div>
                <p>
                  Birth Year :
                  <input
                    type="text"
                    name="Birth_Year"
                    placeholder="Enter Your Birth Year"
                    required
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div>
                <p>
                  Present Address :
                  <input
                    type="text"
                    name="Present_Address"
                    placeholder="Enter Your Present Address"
                    required
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        ) : (
          Object.keys(details).length > 0 && (
            <div className="details">
              <div>
                <p>Name : {details && details.details.name}</p>
              </div>
              <div>
                <p>Spouse : {details && details.details.Spouse}</p>
              </div>
              <div>
                <p>Location : {details && details.details.Location}</p>
              </div>
              <div>
                <p>Birth Year : {details && details.details.Birth_Year}</p>
              </div>
              <div>
                <p>
                  Present Address : {details && details.details.Present_Address}
                </p>
              </div>
              <div>
                Family Photo :
                <div className="family_photo">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Structure;
