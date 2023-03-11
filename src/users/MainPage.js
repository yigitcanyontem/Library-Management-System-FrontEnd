import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {Button, Card, TextField} from "@mui/material";

function Welcome() {

    return (
        <div className={"welcomePage"}>
            <br/>
            <br/>
            <br/>
            <br/>
            <NameForm ></NameForm>

        </div>

    );
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        window.location.replace('http://localhost:3000/library/books/id/'+this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Card variant="outlined" style={{display: 'inline-block'}}>
                <h1 className={"display-1 text-dark mx-4"}>Welcome To Library</h1>
                <form onSubmit={this.handleSubmit}>

                    <br/>
                    <TextField id="outlined-basic" label="BookId" variant="filled" type="text" className={"mx-5"} value={this.state.value} onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <Button  variant="contained" type="submit" value="Submit"  >Submit</Button>
                    <br/>
                    <p></p>
                </form>
            </Card>
        );
    }
}
export default Welcome;