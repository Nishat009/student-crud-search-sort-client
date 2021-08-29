import axios from "axios";
import React from "react";
import { useState } from "react";
import Header from "../../Navbar/Header";
import "./AddStudent.css";
const AddStudent = () => {
  const [info, setInfo] = useState({});
  const [imageURL, setImageURL] = useState(null);
  const [imageURLStatus, setImageURLStatus] = useState();
  const [dbStatus, setDbStatus] = useState(false);
  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      imageURL: imageURL,
      name: e.target.name.value,
      sId: e.target.sId.value,
      reg: e.target.reg.value,
    };

    try {
      const res = await axios.post(
        "https://still-fjord-46602.herokuapp.com/addStudent",
        studentData
      );
      if (res) {
        setDbStatus(res);
        e.target.reset();
        alert("Student added successfully");
      }
    } catch (error) {
      console.error(error);
      console.log(studentData);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="col-md-10 container py-3  product mt-2   rounded">
        <h1 className="text-center text-warning border-bottom">Add Student</h1>
        <form
          class="row   product-two mx-auto p-5 rounded container"
          onSubmit={handleSubmit}
        >
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white"> Student Name</label>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Z ]*$"
              required
              onBlur={handleBlur}
              class="form-control"
              placeholder="Enter Student Name"
            />
          </div>
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white">Reg</label>
            <input
              type="number"
              required
              name="reg"
              pattern="^[0-9a-zA-Z]*$"
              min={0}
              onBlur={handleBlur}
              class="form-control"
              placeholder="Enter Student reg"
            />
          </div>
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white">Id</label>
            <input
              required
              type="number"
              name="sId"
              pattern="[0-9]*"
              min={0}
              onBlur={handleBlur}
              class="form-control"
              placeholder="Enter Student Id"
            />
          </div>
          <div className="col-md-6">
            <label class="form-label fw-bolder text-white">Image</label>
            <input
              class="form-control"
              onChange={handleImageUpload}
              type="file"
            />
            {
              <p style={{ color: "red" }}>
                {" "}
                {imageURLStatus
                  ? "Image uploaded successfully, Click Submit to send your data to Database."
                  : "After choosing a file, Wait until image get uploaded."}
              </p>
            }
          </div>

          <div className="col-md-12 d-flex align-items-center">
            <input type="submit" className="mt-3 submit-button" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
