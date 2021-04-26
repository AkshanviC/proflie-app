import React from "react";
import { convertBase64 } from "./utilities/index";

function Type(props) {
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>Start Day</label>
                <input
                  className="form-control"
                  type="date"
                  required="required"
                  onChange={(e) => {
                    props.update("start", e.target.value); //update(index, workExperience, setWorkExperience);
                  }}
                  value={props.node.start}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>End Date</label>
                <input
                  className="form-control"
                  type="date"
                  required="required"
                  onChange={(e) => {
                    props.update("end", e.target.value);
                  }}
                  value={props.node.end}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  className="form-control"
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
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>Company</label>
                <input
                  className="form-control"
                  type="text"
                  required="required"
                  onChange={(e) => {
                    props.update("company", e.target.value);
                    // update(index, workExperience, setWorkExperience);
                  }}
                  value={props.node.company}
                ></input>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>Company Logo</label>
                  {props.node.image ? (
                  <label>
                    <img src={props.node.img} alt="img"></img>
                    <input
                      type="file"
                      className="form-control"
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
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  required="required"
                  onChange={(e) => {
                    props.update("description", e.target.value);
                    // update(index, workExperience, setWorkExperience);
                  }}
                  value={props.node.description}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default Type;
