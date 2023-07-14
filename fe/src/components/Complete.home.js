import { Col, Container, Row, Table } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../styles/Table.style.css'

const Tables = (props) => {
    const {header} = props;
    // const [reminder, setReminder] = useState([]);

    // const user = JSON.parse(localStorage.getItem('USER'));
    // const getuserId = user.data.user_id;
    // console.log(getuserId);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/api/v1/reminders/${getuserId}`, {
    //         method: 'GET'
    //     })
    //         .then(resp => resp.json())
    //         .then(a => {
    //             setReminder(a.data.reminders.rows);
    //             console.log(a);
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         });
    // }, [getuserId]);

    return (
        <>
            <h1>
                {header}
            </h1>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Due Date</th>
                        <th scope='col'>Create Date</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>John Doe</p>
                                    <p className='text-muted mb-0'>john.doe@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>Software engineer</p>
                            <p className='text-muted mb-0'>IT department</p>
                        </td>
                        <td>
                            <MDBBadge color='success' pill>
                                Active
                            </MDBBadge>
                        </td>
                        <td>Senior</td>
                        <td></td>
                        <td></td>
                        <td>
                            <button className="btn btn-primary">
                                Edit
                            </button>
                            <button className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                        
                    </tr>
                </MDBTableBody>
            </MDBTable>
        </>
    );
}
export default Tables