import React, { useState, useEffect } from "react";
import Type from "./type";
import axios from "axios";
import { convertBase64, updateMaster } from "./utilities/index";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  './edit.css';

function Edit() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const handleRedirect = () => {history.push(`/${editId}`);setShow(false);}

  const [editId, setEditId] = useState("");
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImage = async (e) => {
    e.persist();
    const imgfile = e.target.files[0];
    const base64 = await convertBase64(imgfile);
    setImage(base64);
  };

  const handleSave = (e) => {
   
    if (id) {
      axios({
        method: "POST",
        url: "http://localhost:5000/profile/post",
        data: {
          name: name,
          age: age,
          image: image,
          id: id,
          workExperience: workExperience,
        },
        withCredentials: true,
      })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if(res.id){
            setShow(true);
          }
          //history.push(`/output/${res.id}`);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("else");
      axios({
        method: "POST",
        url: "http://localhost:5000/profile/post",
        data: {
          name: name,
          age: age,
          image: image,
          key: id,
          workExperience: workExperience,
        },
        withCredentials: true,
      })
        .then((res) => res.data)
        .then((res) => {
          console.log("else", res);
          if(res.id){
            setShow(true);
            setEditId(res.id);
          }
          
          //history.push(`/output/${res.id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (id) {
      console.log("edit mode");
      axios({
        method: "GET",
        url: `http://localhost:5000/profile/get/${id}`,
        withCredentials: true,
      })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setName(res.name);
          setAge(res.age);
          setImage(res.image);
          setWorkExperience(res.workExperience);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  return (
    <div>

<div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              {/* <img className="rounded-circle mt-5" src={image} width="90"></img> */}
              <img className="rounded-circle mt-5" width= "50%" src={image} onError={(e)=>{e.target.onerror = null; e.target.src="../user-male-circle.png"}}/>
              <span className="font-weight-bold">{name}</span> </div>      
              
                            
              <div className="d-flex flex-column align-items-center text-center p-3 py-5 form-group">
                                <input
                                  className="form-control"
                                  type="file"
                                  onChange={handleImage}
                                ></input>
                               
                  </div>                    
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-right">User profile</h5>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12"><label className="labels">Name</label> <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter your Name"
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        value={name}
                                      ></input></div></div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Age</label> {age ? (
                                        <input
                                          className="form-control"
                                          type="number"
                                          min="1"
                                          max="100"
                                          value={age}
                                          onChange={(e) =>
                                            setAge(e.target.value)
                                          }
                                        ></input>
                                      ) : (
                                        <input
                                          className="form-control"
                                          type="number"
                                          min="1"
                                          max="100"
                                          onChange={(e) =>
                                            setAge(e.target.value)
                                          }
                                        ></input>
                                      )}</div>
                                </div>
                     </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience">
                
                <h5 className="text-right">Work Experience</h5>
                  <span className="border px-3 p-1 add-experience" onClick={() => {
                                  const random = Math.floor(
                                    Math.random() * 1000000
                                  ).toString(16);
                                  setWorkExperience([
                                    ...workExperience,
                                    {
                                      key: random,
                                      start: "",
                                      end: "",
                                      title: "",
                                      company: "",
                                      description: "",
                                    },
                                  ]);
                                }}><i className="fa fa-plus"></i>&nbsp;Experience</span>
                  </div>
                <div className="d-flex flex-row mt-3 exp-container">
                    <div className="work-experience ml-1">
                             
                                {workExperience
                                  ? workExperience.map((node, index) => (
                                      <Type
                                        node={node}
                                        update={updateMaster(
                                          index,
                                          workExperience,
                                          setWorkExperience
                                        )}
                                      />
                                    ))
                                  : ""}
                             
                            </div>
            
                    
                    </div>
                    <div className="row mt-3">
                    
                    <div className="col-md-12 text-center"><button className="btn btn-primary profile-button" type="button"  onClick={handleSave}>Save Profile</button></div>
                </div>
                <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <div className="card bmi" style={{width: '18rem'}}>
  <img src={image} alt="img" className="card-img-top"></img>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name :{name} </li>
    <li className="list-group-item">Age:{age}</li>
  </ul>
  <div className="card-body">
    <h5 className="card-title">Work Experience</h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    {workExperience
        ? workExperience.map((value) => (
            <div>
              <ul className="list-group list-group-flush">
    <li className="list-group-item">Start-Date:{value.start}</li>
    <li className="list-group-item">End-Date:{value.end}</li>
    <li className="list-group-item">Company:{value.company}</li>
    <li className="list-group-item">Title:{value.title}</li>
    <li className="list-group-item">Description:{value.description}</li>
  </ul>
            </div>
          ))
        : ""}
  </div>
</div>

    
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            
          </Button>
          <Button variant="primary" onClick={handleRedirect}>Edit</Button>
            
        </Modal.Footer>
      </Modal>
                              {console.log(workExperience)}
            </div>
            
        </div>
       
</div></div>


    </div>
  );
}
export default Edit;
