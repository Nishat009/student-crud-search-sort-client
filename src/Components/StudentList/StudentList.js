import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import ManageStudent from '../Students/ManageStudent/ManageStudent';
import { Collapse } from "react-bootstrap";
import { Link, TextField } from "@material-ui/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import ProductDetails from "../ProductDetails/ProductDetails";
// import { Autocomplete } from '@material-ui/lab';
const StudentList = () => {
    const [showSearchBox, setShowSearchBox] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();


const singleStudentClick = (_id) => {
    history.push(`/students/${_id}`);
}
  async function search(key) {
    console.log(key);
    let result = await fetch("https://pacific-plateau-10670.herokuapp.com/search/" + key); 

    result = await result.json();
    console.log(result);
    setData(result);
  }
    return (
        <>
        
        <Link onClick={() => setShowSearchBox(!showSearchBox)} to="#">
         {/* <FontAwesomeIcon
           size="2x"
           className="search ms-0 m-2 "
           icon={faSearch}
         /> */}search
       </Link>
       <Collapse in={showSearchBox}>
         <TextField
           onChange={(e) => search(e.target.value)}
           name="name"
           label="Search"
           fullWidth
           autoComplete='off'
         />
         
       </Collapse>
    
      <div className="searchItem">
       {
                 data.map(students=> <p onClick={() => singleStudentClick(students._id)}>{students.name}</p> )
             } 
             </div>
           
     </>
    );
};

export default StudentList;