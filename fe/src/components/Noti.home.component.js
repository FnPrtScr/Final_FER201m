import React, { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { FcAdvertising } from 'react-icons/fc'

const NotiHome = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Smith', age: 30 },
        { id: 4, name: 'Jane', age: 30 },
        { id: 5, name: 'Smith', age: 30 },
        { id: 6, name: 'Jane Smith', age: 30 },
        { id: 7, name: 'Jane Smith', age: 30 },
        { id: 8, name: 'Jane Smith', age: 30 },
        // ...
    ];
    const maxRows = 5;
    const countByAttribute = (attribute) => {
        const count = data.filter(item => item.age === attribute).length;
        return count;
    };
    const slicedData = data.slice(0, maxRows);

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
                                        <td>{item.name}</td>
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
