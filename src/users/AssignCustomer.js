import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function AssignCustomer() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let navigate=useNavigate()

    const { id } = useParams();

    const [assign,setAssign] = useState([])

    const {bookId,customerId}=assign;

    const onInputChange=(e)=>{
        setAssign({...assign,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        assign.bookId = id;
        await axios.put('http://localhost:8080/library/books/assignbook',assign);
        window.location.reload(true);

    }


    return (
        <div>
            <br/>
            <Button onClick={handleOpen} variant="contained" color="secondary"> Assign Customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <h2 className={"text-center display-6"}>Assign Customer</h2>
                    <br/>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="numPages" className="form-label">Book Id</label>
                            <input type="text" disabled className="form-control " id='id1' name={"bookId"} value={id} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numPages" className="form-label">Customer Id</label>
                            <input type="number" min={1} className="form-control" name={"customerId"} value={customerId} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className={"text-center"}>
                            <button type="submit" className="btn btn-dark ">Submit</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}