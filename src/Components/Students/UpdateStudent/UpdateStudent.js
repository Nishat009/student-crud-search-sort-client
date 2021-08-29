import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../../Navbar/Header";
import "./UpdateStudent.css";
const UpdateStudent = () => {
  const [imageURL, setImageURL] = useState(null);
  const [imageURLStatus, setImageURLStatus] = useState();
  const [dbStatus, setDbStatus] = useState(false);
  const [name, setName] = useState("");
  const [reg, setReg] = useState("");
  const [sId, setSId] = useState("");
  const [student, setStudent] = useState([]);
  const [image, setImage] = useState("");
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/updateS/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleReg = (e) => {
    setReg(e.target.value);
  };

  const handleId = (e) => {
    setSId(e.target.value);
  };
  const handleImage = () => {
    setImage(imageURL || student.imageURL);
  };
  const handleStudentClick = (id) => {
    const updatedStudent = {
      id,
      name: name || student.name,
      reg: reg || student.reg,
      sId: sId || student.sId,
      imageURL: image || student.imageURL,
    };
    console.log(updatedStudent);

    const url = `http://localhost:5000/updateStudent/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDbStatus(data);
          alert("Student information Updated");
          history.push("/manageStudent");
        }
      });
  };
  const handleImageUpload = (student) => {
    console.log(student.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "347a42bcbffdfffd0275efa46b051dbe");
    imageData.append("image", student.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
        setImageURLStatus(true);
        if (response) {
          alert("Image Uploaded Successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlePSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="row mx-auto">
      <Header></Header>
      <div className="col-md-10 container py-3 mt-2 product rounded">
        <h1 className="text-center text-warning border-bottom">
          Update Students
        </h1>
        <form
          class="row  product-two mx-auto  p-5 rounded container"
          onSubmit={handlePSubmit}
        >
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white"> Student Name</label>
            <input
              type="text"
              name="name"
              onBlur={handleName}
              defaultValue={student.name}
              class="form-control"
              placeholder="Enter Student Name"
            />
          </div>
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white">Reg</label>
            <input
              type="number"
              name="reg"
              onBlur={handleReg}
              defaultValue={student.reg}
              class="form-control"
              placeholder="Enter Id"
            />
          </div>
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white">Id</label>
            <input
              type="number"
              name="sId"
              onBlur={handleId}
              defaultValue={student.sId}
              class="form-control"
              placeholder="Enter Id"
            />
          </div>

          <div className="col-md-6">
            <label class="form-label fw-bolder read-only text-white">
              Image
            </label>
            <input
              class="form-control"
              onBlur={handleImage}
              name="imageURL"
              onChange={handleImageUpload}
              defaultValue={student.imageURL}
              //  onBlur={handleImage}
              //  defaultValue={student.imageURL}
              //  onChange={handleImageUpload}
              type="file"
              // name="image"
            />
          </div>

          <div className="col-md-12 d-flex align-items-center">
            <input
              onClick={() => handleStudentClick(student._id)}
              type="submit"
              className="mt-3 submit-button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
