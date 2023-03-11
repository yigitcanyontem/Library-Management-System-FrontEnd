import React from 'react';
import {Link} from "react-router-dom";
import AddUser from "../users/AddUser";

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand text-light" href="#">Library Management System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-outline-light" to={"/adduser"}>Add Book</Link>
                    <Link className="btn btn-outline-light" to={"/addcustomer"}>Add Customer</Link>
                    <Link className="btn btn-outline-light" to={"/books"}>Books</Link>
                    <Link className="btn btn-outline-light" to={"/customers"}>Customers</Link>
                </div>
            </nav>
        </div>
    );
}

