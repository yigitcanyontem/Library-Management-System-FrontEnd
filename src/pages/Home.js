import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Home() {
    const [books,setBooks] = useState([])

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const result= await axios.get("http://localhost:8080/library/books")
        setBooks(result.data)
    }

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/library/books/id/${id}`);
        loadUsers();
    };

    return (
        <div className={"container"}>
            <div className={"py-4"}>
                <table className="table table-dark table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Page</th>
                        <th>Language</th>
                        <th>Publisher</th>
                        <th>Customer</th>
                        <th>View Book</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book,index)=>(
                        <tr>
                            <td>{book.book.bookId}</td>
                            <td>{book.book.isbn13}</td>
                            <td>{book.book.title}</td>
                            <td>{book.author.authorName}</td>
                            <td>{book.book.numPages}</td>
                            <td>{book.book.bookLanguage.languageName}</td>
                            <td>{book.book.publisher.publisherName}</td>
                            <td>{book.book.customer.customerId}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/library/books/id/${book.book.bookId}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

