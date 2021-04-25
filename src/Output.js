import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function Output() {
  const history = useHistory();
  const { id } = useParams();
  const handleRedirect = () => history.push(`/${id}`);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/profile/get/${id}`,
      withCredentials: true,
    })
      .then((res) => res.data)
      .then((res) => {
        setName(res.name);
        setAge(res.age);
        setImage(res.image);
        setWorkExperience(res.workExperience);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      <p>Name:{name}</p>
      <p>Age:{age}</p>
      <p>Profile Image</p>
      <img src={image} alt="img"></img>
      <p>Work Experience</p>
      {workExperience
        ? workExperience.map((value) => (
            <div>
              <img src={value.logo} alt="img"></img>
              <ul>
                <li>Start-Date:{value.start}</li>
                <li>End-Date:{value.end}</li>
                <li>Company:{value.company}</li>
                <li>Title:{value.title}</li>
                <li>Description:{value.description}</li>
              </ul>
            </div>
          ))
        : ""}
      <button onClick={handleRedirect}>Edit</button>
    </div>
  );
}

export default Output;
