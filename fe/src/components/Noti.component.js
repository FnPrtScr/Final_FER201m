import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const Noti = () => {
    const [reminder, setReminders] = useState([]);
s
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/reminders").then(res => res.json())
            .then(result => {
                setReminders(result);
            })
    }, []);

    return (
        <Container>
            <Row>
                <Col xs={12} md={10}>
                    <Row>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th><h2>Notification</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reminder.map(c => {
                                            return (
                                                <tr key={c.id}>
                                                    <td>{c.title}
                                                    </td>
                                                </tr>)
                                        }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Noti