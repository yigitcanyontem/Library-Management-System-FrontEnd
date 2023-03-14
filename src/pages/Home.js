import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {TableHead} from "@mui/material";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



export default function CustomPaginationActionsTable() {
    const [rows,setBooks] = useState([])

    useEffect(() => {
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const result= await axios.get("http://localhost:8080/library/books")
        setBooks(result.data)
    }


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" className="table table-dark table-striped table-bordered" >
                <TableHead>
                    <TableRow>
                        <TableCell><div className={"text-light"}>ID</div></TableCell>
                        <TableCell><div className={"text-light"}>ISBN</div></TableCell>
                        <TableCell><div className={"text-light"}>Title</div></TableCell>
                        <TableCell><div className={"text-light"}>Author</div></TableCell>
                        <TableCell><div className={"text-light"}>Page</div></TableCell>
                        <TableCell><div className={"text-light"}>Language</div></TableCell>
                        <TableCell><div className={"text-light"}>Publisher</div></TableCell>
                        <TableCell><div className={"text-light"}>Customer</div></TableCell>
                        <TableCell><div className={"text-light"}>View Book</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((book) => (
                        <TableRow key={book.book.bookId}>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.bookId}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.isbn13}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.title}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.author.authorName}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.numPages}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.bookLanguage.languageName}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.publisher.publisherName}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <div className={"text-light"}>{book.book.customer.customerId}</div>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Link className="btn btn-primary mx-2" to={`/library/books/id/${book.book.bookId}`}>View</Link>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={9}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}