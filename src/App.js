 import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./layout/NavBar";
import Home from "./pages/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
 import ViewUser from "./users/ViewUser";
 import AddCustomer from "./users/AddCustomer";
 import AllCustomers from "./users/AllCustomers";
 import Welcome from "./users/MainPage";
 import AddBook from "./users/AddBook";
 import ViewCustomer from "./users/ViewCustomer";
 import AssignCustomer from "./users/AssignCustomer";

function App() {
  return (
    <div className={"App"}>
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path={"/"} element={<Welcome/>}></Route>
                <Route exact path={"/books"} element={<Home/>}></Route>
                <Route exact path={"/library/books/id/:id"} element={<ViewUser/>}></Route>
                <Route exact path={"/edituser/:id"} element={<EditUser/>}></Route>
                <Route exact path={"/addbook"} element={<AddBook />} />
                <Route exact path={"/customer/:id"} element={<ViewCustomer />} />
                <Route exact path={"/customers"} element={<AllCustomers/>} />
                <Route exact path={"/addcustomer"} element={<AddCustomer />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
