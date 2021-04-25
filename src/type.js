import React from "react";
import { convertBase64 } from "./utilities/index";

function Type(props) {
  return (
    <div>
      {console.log("triggered")}
      <p>Start Day:</p>
      <input
        type="date"
        required="required"
        onChange={(e) => {
          props.update("start", e.target.value); //update(index, workExperience, setWorkExperience);
        }}
        value={props.node.start}
      ></input>
      <p>End Day:</p>
      <input
        type="date"
        required="required"
        onChange={(e) => {
          props.update("end", e.target.value);
        }}
        value={props.node.end}
      ></input>
      <p>Title:</p>
      <input
        type="text"
        required="required"
        onChange={(e) => {
          e.persist();
          console.log(e.target.value);
          //props.node.title = e.target.value;
          props.update("title", e.target.value);
        }}
        value={props.node.title}
      ></input>
      <p>Company:</p>
      <input
        type="text"
        required="required"
        onChange={(e) => {
          props.update("company", e.target.value);
          // update(index, workExperience, setWorkExperience);
        }}
        value={props.node.company}
      ></input>
      <p>Description:</p>
      <input
        type="text"
        required="required"
        onChange={(e) => {
          props.update("description", e.target.value);
          // update(index, workExperience, setWorkExperience);
        }}
        value={props.node.description}
      ></input>
      <p>Logo:</p>
      {props.node.image ? (
        <label>
          <img src={props.node.img} alt="img"></img>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={async (e) => {
              const imgfile = e.target.files[0];
              const base64 = await convertBase64(imgfile);
              props.update("logo", base64);
            }}
          ></input>
        </label>
      ) : (
        <input
          type="file"
          onChange={async (e) => {
            const imgfile = e.target.files[0];
            const base64 = await convertBase64(imgfile);
            props.update("logo", base64);
          }}
        ></input>
      )}
    </div>
  );
}

export default Type;
