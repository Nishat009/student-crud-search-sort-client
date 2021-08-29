import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./ManageStudent.css";
import Header from "../../Navbar/Header";
import { useHistory } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ManageStudent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [student, setStudent] = useState([]);

  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...student].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setStudent(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...student].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setStudent(sorted);
      setOrder("ASC");
    }
  };
  const [idRegSort, setIdRegSort] = useState("ASC");
    const sorted = (property) => {
        if (idRegSort === "ASC") {
            const sort = [...student].sort((a, b) =>
                (a == b ? 0 : a < b ? -1 : 1) * (a > b ? 1 : -1));
                setStudent(sort);
                setIdRegSort("DSC");
        }
        if (idRegSort === "DSC") {
            const sort = [...student].sort((a, b) =>
                (a == b ? 0 : a > b ? -1 : 1) * (a < b ? 1 : -1));
                setStudent(sort);
                setIdRegSort("ASC");
        }
    };

  useEffect(() => {
    fetch("https://still-fjord-46602.herokuapp.com/students")
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://still-fjord-46602.herokuapp.com/deleteStudents/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteStudents();
          alert("Student Deleted Successfully");
        }
      });
  };
  const deleteStudents = () => {
    fetch(`https://still-fjord-46602.herokuapp.com/students`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  };

  const history = useHistory();
  const handleUpdate = (id) => {
    history.push(`/updateStudent/${id}`);
  };

  const classes = useStyles();

  return (
    <div>
      <Header></Header>
      <div className="row m-0">
        <div className="col-md-12 mt-2 col-sm-10">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="search-button"
              aria-label="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Form>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead style={{ backgroundColor: "#0B4C61" }}>
                <TableRow>
                  <StyledTableCell onClick={() => sorting("name")} align="left">
                    Name <ArrowDropDownIcon className="text-white" />
                  </StyledTableCell>
                  <StyledTableCell align="left">Picture</StyledTableCell>
                  <StyledTableCell onClick={() => sorted("sId")} align="left">
                    Id <ArrowDropDownIcon className="text-white" />
                  </StyledTableCell>

                  <StyledTableCell onClick={() => sorted("reg")} align="left">
                    Registration <ArrowDropDownIcon className="text-white" />
                  </StyledTableCell>

                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.reg
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.sId.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((s) => (
                    <StyledTableRow key={s.name}>
                      <StyledTableCell align="left">{s.name}</StyledTableCell>{" "}
                      <StyledTableCell component="th" scope="row">
                        <img
                          style={{ width: "8rem", height: "8rem" }}
                          src={s.imageURL}
                          alt=""
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">{s.sId}</StyledTableCell>
                      <StyledTableCell align="left">{s.reg}</StyledTableCell>
                      <div class="dropdown table-row">
                        <button
                          class="btn btn-sm btn-light dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="bi bi-arrow-down-right-circle"></i>
                        </button>
                        <ul
                          class="dropdown-menu "
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <button
                              className="alert alert-success  p-button fw-bold"
                              onClick={() => handleUpdate(s._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="alert alert-danger  p-button fw-bold"
                              onClick={() => handleDelete(s._id)}
                            >
                              delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
