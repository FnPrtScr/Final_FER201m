import React from 'react'
import { useState, useEffect } from 'react';

import { Col, Navbar, Row, Button, Form, FormLabel, Tab, NavItem, ListGroup, TabContainer } from 'react-bootstrap'
import { MdFlagCircle, MdAddCircle } from "react-icons/md";
import { FcPlanner, FcTodoList, FcOk, FcBusinessman, FcDatabase } from "react-icons/fc";
import { FaListUl } from "react-icons/fa";
import '../styles/Home.style.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbarr from './Navbar.component';
import Tables from './Complete.home';
import { myList } from '../services/home.service';
import TablesReminderInMyList from './TablesReminderInMyList.component';

const Home = () => {
  const navigate = useNavigate();
  const [myCategories, setMyCategories] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const user = JSON.parse(localStorage.getItem('USER'));
  useEffect(() => {
    if (!user) {
      navigate('/api/v1/auth');
    }
  }, []);

  useEffect(() => {
    myList(user.data.user_id)
      .then((res) => {
        setMyCategories(res.data.data.categories.rows)
      })
  }, [])
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
      return <div><Tables header={"Today"} /></div>;
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
    if (selectedButton?.includes("myList-")) {
      const categoryId = selectedButton.split('-')[1];
      return <div><TablesReminderInMyList/></div>;
    }
    
    return null;
  };

  return (
    <div>
      <Navbarr />
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
                {
                  myCategories.map((category) => {
                    return (
                      <ListGroup.Item action onClick={() => handleButtonClick(`myList-${category.category_id}`)}> <FaListUl size='1.5em' key={category.category_id} /> &emsp;
                        {category.name}
                      </ListGroup.Item>
                    )
                  })
                }
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
      </TabContainer>
    </div>
  )
}

export default Home