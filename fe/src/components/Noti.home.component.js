import React, { useState, useEffect } from 'react';
import { Modal, Table, Dropdown, Nav } from 'react-bootstrap';
import { FcAdvertising } from 'react-icons/fc'

const NotiHome = () => {
    const [noti, setNoti] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;

    const changeStatus = (t) => {
        let id = t.id;
        let content = t.content;
        let user_id = t.user_id;
        let status = t.completed?2:1;
        let create_date = t.create_date;
        let update_date = t.update_date;

        const newTodo = {id, content, user_id, status,create_date,update_date};

        fetch('http://localhost:9999/todo/'+t.id, {
            method: 'PUT',
            headers: {'Content-Type':'Application/Json'},
            body: JSON.stringify(newTodo)
        })
        .then(()=>{
            alert('Change success.');
            window.location.reload();
        })
    }
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/notifications/${getuserId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(a => {
                setNoti(a.data.notification.rows);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [getuserId]);
    const maxRows = 5;
    const countByAttribute = (attribute) => {
        const count = noti.filter(item => item.status === attribute).length;
        return count;
    };
    const slicedData = noti.slice(0, maxRows);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* <div>
                <FcAdvertising style={{ height: '30px', width: '30px' }} variant="primary" onClick={handleShow} />
                <label style={{ transform: 'translateY(15px) translateX(-10px)', color:'red' }}> {countByAttribute(1)}</label>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            {
                                slicedData.map((i) => {
                                    return (
                                        <tr key={i.id}>
                                            <th>{i.content}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <a href='/api/v1/app/viewallnotification'>View All</a>
                </Modal.Footer>
            </Modal> */}
            <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="dropdown-67443507"
                    variant="default"
                    className="m-0"
                    onClick={()=>changeStatus(t)}
                >
                    <i className="nc-icon nc-planet"></i>
                    <FcAdvertising style={{ height: '30px', width: '30px' }} variant="primary" onClick={handleShow} />
                    <span className="notification">{countByAttribute(1)}</span>
                    <span className="d-lg-none ml-1">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        slicedData.map((i) => {
                            return (
                                <Dropdown.Item key={i.id}>
                                    {i.content}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

}
export default NotiHome
