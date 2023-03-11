import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function AddBook() {
    const [languages, setLanguages] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [bookId, setId] = useState([]);

    useEffect(() => {
        loadLanguages();
        loadPublishers();
    }, []);


    const loadId = async () => {
        const result = await axios.get(`http://localhost:8080/library/books/max`);
        setId(result.data[0]);
    };
    const loadLanguages = async () => {
        const result = await axios.get(`http://localhost:8080/library/languages`);
        setLanguages(result.data);
    };

    const loadPublishers = async () => {
        const result = await axios.get(`http://localhost:8080/library/publishers`);
        setPublishers(result.data);
    };


    let navigate=useNavigate()

    const [book,setBook] = useState([])

    const {title,isbn13,numPages,authorName,publicationDate,language_id,publisher_id}=book;

    const onInputChange=(e)=>{
        setBook({...book,[e.target.name]:e.target.value})

    }

    const onSubmit= async (e)=>{
        loadId();
        e.preventDefault();
        await axios.post("http://localhost:8080/library/books/new",book);
        navigate(`/library/books/id/${bookId}`);
    }

    return (
        <div className={"container pt-5"}>
            <div className={"row"}>
                <div className={"col-md-6 offset-md-3 border rounded p-4 mt-2 shadow "}>
                    <h2 className={"display-5 text-center m-4"}>Register User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="ISBN" className="form-label">ISBN</label>
                            <input type="text" className="form-control" name={"isbn13"} value={isbn13} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" name={"title"} value={title} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numPages" className="form-label">Page Number</label>
                            <input type="number" className="form-control" name={"numPages"} value={numPages} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="authorName" className="form-label">Author Name</label>
                            <input type="text" className="form-control" name={"authorName"} value={authorName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                            <input type="date" className="form-control" name={"publicationDate"} value={publicationDate} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="language_id" className="form-label">Language</label>
                            <select id="language" name={"language_id"} className="form-select" value={language_id} onChange={(e)=>onInputChange(e)}>
                                <option>Select the Language</option>
                                {languages.map(language =>
                                    <option value={language.languageId}>{language.languageName}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publisher_id" className="form-label">Publisher</label>
                            <select id="publisher" name={"publisher_id"} className="form-select" value={publisher_id} onChange={(e)=>onInputChange(e)}>
                                <option>Select the Publisher</option>
                                {publishers.map(publisher =>
                                    <option value={publisher.publisherId}>{publisher.publisherName}</option>
                                )}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                        <Link type="submit" className="btn btn-danger mx-2" to={"/"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBook;