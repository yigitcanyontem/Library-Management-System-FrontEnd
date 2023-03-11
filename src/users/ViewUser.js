import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
    const [books, setBooks] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/library/books/id/${id}`);
        setBooks(result.data);
    };
    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/library/books/id/${id}`);
    };

    return (
        <div className="container ">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow text-bg-dark">
                    <h2 className="text-center m-4 display-6">Book Details</h2>

                    <div className="card  text-start " >
                        <div className="card-header">
                            {books.map(book =>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Book ID: </b>
                                    {book.book.bookId}
                                </li>
                                <li className="list-group-item">
                                    <b>ISBN: </b>
                                    {book.book.isbn13}
                                </li>
                                <li className="list-group-item">
                                    <b>Title: </b>
                                    {book.book.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Author: </b>
                                    {book.author.authorName}
                                </li>
                                <li className="list-group-item">
                                    <b>Page: </b>
                                    {book.book.numPages}
                                </li>
                                <li className="list-group-item">
                                    <b>Language: </b>
                                    {book.book.bookLanguage.languageName}
                                </li>
                                <li className="list-group-item">
                                    <b>Publisher: </b>
                                    {book.book.publisher.publisherName}
                                </li>
                                <li className="list-group-item">
                                    <b>Customer ID: </b>
                                    {book.book.customer.customerId}
                                </li>
                            </ul>
                                )}
                        </div>
                    </div>
                    <br/>
                    <Link className="btn btn-light mx-2 " to={"/"}>
                        Back to Home
                    </Link>
                    <Link className="btn btn-danger mx-2 " to={"/"} onClick={() => deleteBook(id)}>
                        Delete
                    </Link>


                </div>
            </div>
        </div>


    );
}