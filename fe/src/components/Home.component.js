import React from 'react'
import { useState } from 'react';

import { Col, Navbar, Row, Button, Form, FormLabel, Tab, NavItem, ListGroup, TabContainer } from 'react-bootstrap'
import { MdFlagCircle, MdAddCircle } from "react-icons/md";
import { FcPlanner, FcTodoList, FcOk, FcBusinessman, FcDatabase } from "react-icons/fc";
import { FaListUl } from "react-icons/fa";
import '../styles/Home.style.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const [id, setID] = useState();
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState('');
  const [createdDate, setCreateDate] = useState('');
  const [updatedDate, setUpdateDate] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: parseInt(id),
      user_id: parseInt(userId),
      title: title,
      description: description,
      due_date: dueDate,
      priority: parseInt(priority),
      status: status,
      created_date: createdDate,
      updated_date: updatedDate
    }
    const option = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
    fetch(`http://localhost:9999/reminders`, option)
      .then(res => res.json())
      .then((data) => {
        if (data !== null) {
          alert('Them thanh cong');
          window.location.reload();
        }
      })
  }
  const openModal = () => {
    const modal = document.querySelector('.modal-house');
    modal.classList.add('open');
  }

  const closeModal = () => {
    const modal = document.querySelector('.modal-house');
    modal.classList.remove('open');
  }

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };


  const renderContent = () => {
    if (selectedButton === 'total') {
      return <div>Total Content</div>;
    }
    if (selectedButton === 'scheduled') {
      return <div>Scheduled Content</div>;
    }
    if (selectedButton === 'all') {
      return <div>All Content</div>;
    }
    if (selectedButton === 'flagged') {
      return <div>Flagged Content</div>;
    }
    if (selectedButton === 'completed') {
      return <div>Completed Content</div>;
    }
    if (selectedButton === 'assigned') {
      return <div>Assigned Content</div>;
    }
    return null;
  };

  return
  (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/sign-in'}>
            To-do App
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-in'}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/sign-up'}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <TabContainer>
        <Row className='mb-0'>
          <Col className='navLeft' xs={4}>
            <Row className="mb-3" style={{ marginTop: '10px' }}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Row>
            <Row className='mb-3'>
              <Col xs={6} className="d-flex flex-column">
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('total')}>
                  <FcTodoList />
                  <NavItem style={{ color: 'black' }}>Today</NavItem>
                </Button>
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('scheduled')}><FcPlanner /> <NavItem>Scheduled</NavItem></Button>
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('all')}><FcDatabase /> <NavItem>All</NavItem></Button>
              </Col>
              <Col xs={6} className="d-flex flex-column">
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('flagged')}> <MdFlagCircle color='orange' /> <NavItem>Flagged</NavItem></Button>
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('completed')}><FcOk /> <NavItem>Completed</NavItem></Button>
                <Button size='lg' variant="secondary" className="mb-2" onClick={() => handleButtonClick('assigned')}><FcBusinessman /> <NavItem>Assigned</NavItem></Button>
              </Col>
            </Row>
            <Row className='mb-3' style={{ marginLeft: '0px' }}>
              <FormLabel>My List</FormLabel>
              <ListGroup style={{ maxHeight: '400px', height: '400px', overflowY: 'auto' }}>
                <ListGroup.Item action href="#link1"> <FaListUl size='1.5em' /> &emsp;
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
          <Col xs={7}>
            <Tab.Content>
              {renderContent()}
            </Tab.Content>
          </Col>
        </Row>
        <Navbar className="bg-body-tertiary" style={{ height: '70px' }}>
          <Navbar.Collapse className="justify-content-start">
            <NavItem style={{ cursor: 'pointer' }} onClick={openModal}><MdAddCircle color='rgb(0,122,255)' size='1.5em' />&emsp;Add New Reminder</NavItem>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <NavItem style={{ cursor: 'pointer' }}><MdAddCircle color='rgb(0,122,255)' size='1.5em' />&emsp;Add Categories</NavItem>
          </Navbar.Collapse>
        </Navbar>

        {/* cong */}

        <div className="modal-house">
          <div className="modal-container-house">
            <div className="modal-house-title">
              <h5>Create new house</h5>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="input">
                <label htmlFor="name">ID</label><br />
                <input id="name" type="text" className="form-control" value={id} onChange={(e) => setID(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="name">UserID</label><br />
                <input id="name" type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="contact">title</label>
                <input id="contact" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="price">description</label>
                <input id="price" type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="description">due_date</label>
                <input id="description" type="text" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="area">priority</label>
                <input id="area" type="text" className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="address">status</label>
                <input id="adress" type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="address">created_date</label>
                <input id="adress" type="text" className="form-control" value={createdDate} onChange={(e) => setCreateDate(e.target.value)} />
              </div>
              <div className="input">
                <label htmlFor="address">updated_date</label>
                <input id="adress" type="text" className="form-control" value={updatedDate} onChange={(e) => setUpdateDate(e.target.value)} />
              </div>
              <div className="button">
                <span className="btn-cancel" onClick={closeModal} >Cancel</span>
                <button type='submit' style={{ marginLeft: "6px" }} className="btn-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      </TabContainer>
    </>
  )
}

export default Home