import React, { useState,useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { FcAdvertising } from 'react-icons/fc'

const NotiHome = () => {
    const [noti,setNoti]=useState([]);

    const user = JSON.parse(localStorage.getItem('USER')); 
    console.log(user);
    useEffect(()=>{
        fetch('http://localhost:5000/api/v1/notifications/' + user)
        .then(resp=>resp.json())
        .then(data=>{
            setNoti(data.notifications.rows)
        })
        .catch(err=>{
            console.log(err.message)
        })
    },[])
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
                <label style={{transform:'translateY(10px) translateX(-10px)'}}> {countByAttribute(30)}</label>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            {
                                slicedData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.content}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <a href='/viewallnotification'>View All</a>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default NotiHome
