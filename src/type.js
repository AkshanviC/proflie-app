import React from "react";
import { convertBase64 } from "./utilities/index";

function Type(props) {
  //   let todaysDate = new Date();
  //   let date = todaysDate.getDate();
  //   let month = todaysDate.getMonth();
  //   let year = todaysDate.getFullYear();
  //   console.log(month);
  //   if (date < 10) {
  //     date = "0" + date;
  //   }
  //   if (month < 10) {
  //     month = "0" + month;
  //   }
  //   let value = date + "-" + month + "-" + year;
  //   console.log(value);
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
      ></input>
      <p>End Day:</p>
      <input
        type="date"
        required="required"
        //max={value}
        onChange={(e) => {
          props.update("end", e.target.value);
          // update(index, workExperience, setWorkExperience);
        }}
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
        // value={props.node.title}
      ></input>
      <p>Company:</p>
      <input
        type="text"
        required="required"
        onChange={(e) => {
          props.update("company", e.target.value);
          // update(index, workExperience, setWorkExperience);
        }}
      ></input>
      <p>Description:</p>
      <input
        type="text"
        required="required"
        onChange={(e) => {
          props.update("description", e.target.value);
          // update(index, workExperience, setWorkExperience);
        }}
      ></input>
      <p>Logo:</p>
      <input
        type="file"
        onChange={async (e) => {
          const imgfile = e.target.files[0];
          const base64 = await convertBase64(imgfile);
          props.update("logo", base64); //update(index, workExperience, setWorkExperience);
        }}
      ></input>
    </div>
  );
}

export default Type;
