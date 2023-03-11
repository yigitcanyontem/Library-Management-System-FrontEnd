import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

function Welcome() {
    return (
        <div className={"welcomePage"}>
            <br/>
            <br/>
            <br/>
            <h1 className={"display-1 text-light"}>Welcome To Library</h1>
        </div>
    );
}

export default Welcome;