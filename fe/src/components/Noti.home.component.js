import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { FcAdvertising } from 'react-icons/fc'

const NotiHome = () => {
    const [noti, setNoti] = useState([]);

    const user = JSON.parse(localStorage.getItem('USER'));
    const getuserId = user.data.user_id;
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
            <div>
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
            </Modal>
        </>
    );

}
export default NotiHome
