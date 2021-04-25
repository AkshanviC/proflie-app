import React, { useState, useEffect } from "react";
import Type from "./type";
import axios from "axios";
import { convertBase64, updateMaster } from "./utilities/index";
import { useHistory, useParams } from "react-router-dom";

function Edit() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const { id } = useParams();
  const history = useHistory();

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
          history.push(`/output/${res.id}`);
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
          history.push(`/output/${res.id}`);
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
    <div style={{ height: "100%" }}>
      <p>Enter Your name</p>
      <input
        type="text"
        placeholder="enter your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>

      <p>Upload your image</p>
      {image ? (
        <label>
          <img
            src={image}
            style={{ height: "50px", width: "100px", objectFit: "cover" }}
            alt="img"
          ></img>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleImage}
          ></input>
        </label>
      ) : (
        <input type="file" onChange={handleImage}></input>
      )}
      <p>enter your age</p>
      {age ? (
        <input
          type="number"
          min="1"
          max="100"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>
      ) : (
        <input
          type="number"
          min="1"
          max="100"
          onChange={(e) => setAge(e.target.value)}
        ></input>
      )}

      <p>work experience</p>
      {workExperience
        ? workExperience.map((node, index) => (
            <Type
              node={node}
              update={updateMaster(index, workExperience, setWorkExperience)}
            />
          ))
        : ""}

      <button
        onClick={() => {
          const random = Math.floor(Math.random() * 1000000).toString(16);
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
        }}
      >
        Add
      </button>

      <button onClick={handleSave}>Save</button>
      {console.log(workExperience)}
    </div>
  );
}
export default Edit;
