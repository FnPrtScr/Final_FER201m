import { React } from "react";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../styles/Table.style.css'
import moment from 'moment';

const Tables = (props) => {
    const { header, data } = props;

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
export default Tables