import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import AddStudent from './Components/Students/AddStudent/AddStudent';
import ManageStudent from './Components/Students/ManageStudent/ManageStudent';
import UpdateStudent from './Components/Students/UpdateStudent/UpdateStudent';
// import addStudents from './Components/Students/addStudents/addStudents';
// import addStudents from './Components/Students/addStudents/addStudents';
// import addStudents from './Components/Students/addStudents';
function App() {
  return (
    <div>
      <Router>
      
          <Switch>
            <Route path="/addStudent">
             <AddStudent></AddStudent> 
            </Route>
            <Route path="/manageStudent">
             <ManageStudent></ManageStudent> 
            </Route>
            <Route path="/updateStudent/:id">
               <UpdateStudent></UpdateStudent>
              </Route>
            <Route path="/">
              <Home></Home>
            </Route>
            
          </Switch>
    </Router>
    </div>
  );
}

export default App;
