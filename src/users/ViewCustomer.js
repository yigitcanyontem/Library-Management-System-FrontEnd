import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function ViewCustomer() {
    const [customers, setCustomers] = useState([]);

    const [books, setBooks] = useState([]);

    const { id } = useParams();

    let navigate=useNavigate()

    useEffect(() => {
        loadUser();
        loadBooks();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/library/customer/${id}`);
        setCustomers(result.data);
    };
    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/library/customer/delete/${id}`);
        navigate("/customers")
    };

    const loadBooks = async () => {
        const result = await axios.get(`http://localhost:8080/library/books/customer/${id}`);
        setBooks(result.data);
    };


    const [assign,setAssign] = useState({
        bookId:"",
        customerId:0
    })

    function returned(e){
        const book = e.currentTarget.getAttribute("data-book")
        assign.bookId=book;
        axios.put('http://localhost:8080/library/books/assignbook',assign);
        window.location.reload(true)
    }

    return (
        <div className="container ">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <h2 className="text-center m-4 display-6">Customer Details</h2>

                    <div className="card  text-start " >
                        <div className="card-header">
                            {customers.map(customer =>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Customer ID: </b>
                                        {customer.customerId}
                                    </li>
                                    <li className="list-group-item">
                                        <b>First Name: </b>
                                        {customer.firstName}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Last Name: </b>
                                        {customer.lastName}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Email: </b>
                                        {customer.email}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Assigned Books: </b>
                                        <ul>
                                            {books.map(book =>
                                            <li className={"mt-2"}>
                                                <p>Id: {book.bookId} Title: {book.title}</p>
                                                <div className={"text-center mx-auto"}>
                                                    <button type={"submit"} className="btn btn-success text-end" onClick={(e) => returned(e)} data-book={book.bookId}>Return</button>
                                                </div>
                                            </li>
                                            )}
                                        </ul>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <br/>
                    <Link className="btn btn-light mx-2 " to={"/"}>
                        Back to Home
                    </Link>
                    <Link className="btn btn-danger mx-2 " to={"/customers"} onClick={() => deleteBook(id)}>
                        Delete
                    </Link>
                </div>
            </div>
        </div>


    );
}