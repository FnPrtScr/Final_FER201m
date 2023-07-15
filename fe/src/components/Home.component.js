import React from 'react'
import { useState, useEffect } from 'react';

import { Col, Navbar, Row, Button, Form, FormLabel, Tab, NavItem, ListGroup, TabContainer } from 'react-bootstrap'
import { MdFlagCircle, MdAddCircle } from "react-icons/md";
import { FcPlanner, FcTodoList, FcOk, FcBusinessman, FcDatabase } from "react-icons/fc";
import { FaListUl } from "react-icons/fa";
import '../styles/Home.style.css'
import { Link, useNavigate } from 'react-router-dom';
import Navbarr from './Navbar.component';
import Tables from './Tables.component';
import moment from 'moment';
import NewReminder from './NewReminder';
import NewCategory from './NewCategory';
import Navbarr from './Navbar.component';
import TablesReminderInMyList from './TablesReminderInMyList.component';
const Home = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const arrToday = [];
  const arrCompleted = [];
  const arrSchedule = [];
  const arrAll = [];
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const user = JSON.parse(localStorage.getItem('USER'));
  const getuserId = user.data.user_id;

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/reminders/u/${getuserId}`, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then(a => {
        setReminders(a.data.reminder.rows);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [getuserId]);

  reminders.map((reminder) => {
    if (reminder.status === "Pending") {
      arrSchedule.push(reminder);
    }
    if (reminder.status === "Completed") {
      arrCompleted.push(reminder);
    }
    const currentDate = new Date().getDate;
    if (new Date(moment(reminder.due_date).format("DD/MM/YYYY")) === currentDate) {
      console.log(currentDate);
      arrToday.push(reminder);
    }
    if (reminder.status === "Completed" || reminder.status === "Pending") {
      arrAll.push(reminder)
    }
  })



  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/reminders`)
      .then(res => res.json())
      .then(data => setReminders(data.data.reminder.rows))
  }, [])

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

  const openModalCategory = () => {
    const modal = document.querySelector('.modal-category');
    modal.classList.add('open');
  }

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const deleteReminder = (id) => {
    if (JSON.parse(localStorage.getItem('USER'))) {
      const option = {
        method: "DELETE"
      }
      fetch(`http://localhost:5000/api/v1/reminders/${id}`, option)
        .then(() => {
          window.location.reload();
        }
        )
    } else {
      navigate('/api/v1/auth');
    }
  }


  const renderContent = () => {
    if (selectedButton === 'total') {
      return <div><Tables header={"Today"} data={arrToday} /></div>;
    }
    if (selectedButton === 'scheduled') {
      return <div><Tables header={"Schedule"} data={arrSchedule} /></div>;
    }
    if (selectedButton === 'all') {
      return <div><Tables header={"All Reminder"} data={arrAll} /></div>;
    }
    if (selectedButton === 'flagged') {
      return <div>Flagged Content</div>;
    }
    if (selectedButton === 'completed') {
      return <div><Tables header={"Complete"} data={arrCompleted} /></div>;
    }
    if (selectedButton === 'assigned') {
      return <div>Assigned Content</div>;
    }
    if (selectedButton?.includes("myList-")) {
      const categoryId = selectedButton.split('-')[1];
      const reminderr=[]
      reminderr.filter(r=>r.category_id === +categoryId)
      return <div><TablesReminderInMyList data={reminderr}/></div>;
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
                  categories.map((cate) => {
                    return (
                      <ListGroup.Item action onClick={() => handleButtonClick(`myList-${cate.category_id}`)}>
                        <div className='icon-link' style={{ backgroundColor: `${cate.color}` }}>
                          <i className={cate.icon}></i>
                        </div>
                        {cate.name}
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
            <NavItem style={{ cursor: 'pointer' }} onClick={openModalReminder}><MdAddCircle color='rgb(0,122,255)' size='1.5em' />&emsp;Add New Reminder</NavItem>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <NavItem style={{ cursor: 'pointer' }} onClick={openModalCategory}><MdAddCircle color='rgb(0,122,255)' size='1.5em' />&emsp;Add Categories</NavItem>

          </Navbar.Collapse>
        </Navbar>

        {/* cong */}
        <NewReminder />

        <NewCategory />

      </TabContainer>
    </div>
  )
}

export default Home