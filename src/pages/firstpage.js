import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Link, Radio } from '@material-ui/core';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableApi, deleteTableApi, insertTableApi, updateTableApi, sendEmailapi } from "../api";
import { string } from 'prop-types';
import "./class.css";
import emailjs from 'emailjs-com';
import { blue } from '@material-ui/core/colors';

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

var today = yyyy + '-' + mm + '-' + dd;


const set1 = new Set();

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,

    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            fontSize: "large",
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
        fontSize: "large",
    },
});

var dataa;
var deletion = 1;
var changer = -1;
export default function CrudTable() {

    const classes = useStyles();

    const [postdata, editdata] = React.useState([]);

    useEffect(async () => {
        await fetchTableApi().then((e) => {
            editdata(e.data); console.log(e);
        });

    }, [deletion]);


    //for adding new data to table

    const [userData, setUserData] = React.useState({
        name: "",
        phone: null,
        email: "",
        hobbies: [],
    });

    const [updatedUserData, setupdatedUserData] = React.useState({
        name: "",
        phone: null,
        email: "",
        hobbies: [],
    });

    useEffect(async () => {
        console.log(userData);

    }, [userData]);

    async function handleSubmit() {
        

        await insertTableApi(userData).then((e) => {
            console.log(e);
            dataa = e;
        });

        prompt("enter it");
    }



    //for deleting a data item
    async function trashbin(id) {
        deletion++;
        alert("Deletion of data in progress ");
        await deleteTableApi(id).then((e) => {
            console.log(e);

        });
        window.location.reload();
    }

    //for updating a user data
    function updateuser(index) {
        console.log(postdata[index]);
        setupdatedUserData({ ...updatedUserData, name: postdata[index].name, phone: postdata[index].phone, id: postdata[index]._id, email: postdata[index].email });
    }

    async function handleUpdateSubmit() {


        await updateTableApi(updatedUserData).then((e) => {
            alert("ok ok");

        });
    }

    //for sending data to email

    function sendEmail(e) {
        e.preventDefault();
        console.log(e.target);

        emailjs.sendForm('service_zg4brld', 'template_w4fzv85', e.target, 'user_wtZbNvKKFGPFxJWpWUJZ8')
            .then((result) => {
                console.log(result.text);
                alert("Congrats 🎉  Email sent successfully  👍 ! ")
            }, (error) => {
                console.log(error.text);
            });
    }

    async function nodesendEmail() {
        const users = [];

        set1.forEach((set) => {
            console.log(set.id);

            users.push(postdata[set.id]);
        })

        console.log(users);
        await sendEmailapi(users).then((e) => {
            console.log(e);
            alert("email sent successfully !!");
        });
    }





    return (
        <div className="assign">
            <h1 className="head">
                Crud Table
                <img className="headimg" style={{ maxHeight: "45px" }} src="http://ec2-52-15-34-73.us-east-2.compute.amazonaws.com/images/iconlogo.png" />
            </h1>


            <TableContainer component={Paper} className="tablecell">
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell style={{ fontSize: "initial" }}>Id</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Name</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Phone</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Email</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Hobbies</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Update</StyledTableCell>
                            <StyledTableCell style={{ fontSize: "initial" }} align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {postdata.map((post, index) => (
                            <StyledTableRow key={post._id}>
                                <StyledTableCell component="th" scope="row"  >
                                    
                                       
                                        <Checkbox

                                            name="e1" value={index}
                                            name="checkedB"
                                            color="secondary"


                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    set1.add({ id: index })

                                                }
                                                else {
                                                    set1.forEach((point) => {
                                                        if (point.id == index) {
                                                            set1.delete(point);
                                                        }
                                                    });
                                                }
                                            }}
                                        />
                                    
                                    <Link href={'/'}>
                                        {post._id}
                                    </Link>

                                </StyledTableCell>
                                <StyledTableCell align="right">{post.name}</StyledTableCell>
                                <StyledTableCell align="right">{post.phone}</StyledTableCell>
                                <StyledTableCell align="right">{post.email}</StyledTableCell>
                                <StyledTableCell align="right">{post.hobbies}</StyledTableCell>
                                <StyledTableCell align="right"> <button type="button" value={index} class="btn btn-sm" data-toggle="modal" data-target="#myModal1" onClick={(e) => { updateuser(index) }}><img src="https://img.icons8.com/material-outlined/24/000000/edit--v4.png" /></button></StyledTableCell>
                                <StyledTableCell align="right"> <button type="submit" value={post._id} onClick={() => { trashbin(post._id) }} data-target="#myModal"> <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png" /> </button> </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <div class="container">

                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h2 class="modal-title">Add new user</h2>
                            </div>
                            <div class="modal-body">
                                <form type="submit">
                                    <label>Name:  </label>
                                    <input type="name" value={userData.name}
                                        placeholder=""
                                        onChange={(e) => {
                                            setUserData({ ...userData, name: e.target.value });
                                        }} />
                                    <br /><br />
                                    <label>phone:  </label>
                                    <input placeholder=" +91 " type="tel" value={userData.phone} onChange={(e) => {
                                        setUserData({ ...userData, phone: e.target.value });
                                    }} />
                                    <br /><br />
                                    <label>Email:  </label>
                                    <input type="email" value={userData.email} onChange={(e) => {
                                        setUserData({ ...userData, email: e.target.value });
                                    }} />
                                    <br /><br />
                                    <label>Hobbies:  </label>
                                    <input type="name" value={userData.hobbies} onChange={(e) => {
                                        setUserData({ ...userData, hobbies: e.target.value });
                                    }} />
                                    <br /><br />
                                    <button onClick={() => { handleSubmit() }}>Save</button>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>




            <div class="container">

                <div class="modal fade" id="myModal1" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Update User</h4>
                            </div>
                            <div class="modal-body">
                                <form type="submit">
                                    <label>Name:  </label>
                                    <input type="name" value={updatedUserData.name} onChange={(e) => {
                                        setupdatedUserData({ ...updatedUserData, name: e.target.value });
                                    }} />
                                    <br /><br />
                                    <label>phone:  </label>
                                    <input type="tel" value={updatedUserData.phone} onChange={(e) => {
                                        setupdatedUserData({ ...updatedUserData, phone: e.target.value });
                                    }} />
                                    <br /><br />
                                    <label>Email:  </label>
                                    <input type="email" value={updatedUserData.email} onChange={(e) => {
                                        setupdatedUserData({ ...updatedUserData, email: e.target.value });
                                    }} />
                                    <br /><br />
                                    <label>Hobbies:  </label>
                                    <input type="name" value={updatedUserData.hobbies} onChange={(e) => {
                                        setupdatedUserData({ ...updatedUserData, hobbies: e.target.value });
                                    }} />
                                    <br /><br />
                                    <button onClick={() => { handleUpdateSubmit() }}>Save Changes</button>
                                </form>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>





            <button type="button" class="btn btn-sm" data-toggle="modal" data-target="#myModal"> New Data </button>
            <button class="btn btn-sm" onClick={() => { nodesendEmail() }}>Send Data </button>






        </div >
    );
}

