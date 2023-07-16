import React from 'react'
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import moment from 'moment';
import EditReminder from './EditReminder.component';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TablesReminderInMyList = (props) => {
    const { header, data } = props;
    const [modalShow, setModalShow] = React.useState(false);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data.categories.rows))
    }, [])
    const openModalReminder = () => {
        if (categories.length !== 0) {
            const modal = document.querySelector('.modal-reminder');
            modal.classList.add('open');
        } else {

        }
    }
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
                    {
                        data.map(r => {
                            return (
                                <tr key={r.reminder_id}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{r.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{r.description}</p>
                                    </td>
                                    <td>
                                        {
                                            r.status === "Completed" ? <MDBBadge color='success' pill>
                                                Completed
                                            </MDBBadge> : <MDBBadge color='warning' pill>
                                                Pending
                                            </MDBBadge>
                                        }
                                    </td>
                                    <td>Senior</td>
                                    <td>{moment(r.due_date).format("DD/MM/YYYY")}</td>
                                    <td>{moment(r.create_date).format("DD/MM/YYYY")}</td>
                                    <td>
                                        <Link className='btn btn-primary m-3' to={`/api/v1/reminders/${r.reminder_id}`}>Edit</Link>
                                        <button className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                            )
                        })
                    }
                </MDBTableBody>
            </MDBTable>
        </>
    );
}

export default TablesReminderInMyList