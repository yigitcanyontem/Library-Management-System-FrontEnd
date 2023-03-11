import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function AllCustomers() {
    const [customers,setCustomers] = useState([])

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const result= await axios.get("http://localhost:8080/library/customers")
        setCustomers(result.data)
    }

    return (
        <div className={"container"}>
            <div className={"py-4"}>
                <table className="table table-dark table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer,index)=>(
                        <tr>
                            <td>{customer.customerId}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

