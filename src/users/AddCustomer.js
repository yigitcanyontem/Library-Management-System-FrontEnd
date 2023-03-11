import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function AddUser() {

    let navigate=useNavigate()

    const [customer,setCustomer] = useState({
        firstName:"",
        lastName:"",
        email:""
    })

    const {firstName,lastName,email}=customer;

    const onInputChange=(e)=>{
        setCustomer({...customer,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/library/customer/new",customer);
        navigate("/");
    }

    return (
        <div className={"container pt-5"}>
            <div className={"row"}>
                <div className={"col-md-6 offset-md-3 border rounded p-4 mt-2 shadow "}>
                    <h2 className={"display-5 text-center m-4"}>Register User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">First Name</label>
                            <input type="text" className="form-control" name={"firstName"} value={firstName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" name={"lastName"} value={lastName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" name={"email"} value={email} onChange={(e)=>onInputChange(e)}/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                        <Link type="submit" className="btn btn-danger mx-2" to={"/"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser;