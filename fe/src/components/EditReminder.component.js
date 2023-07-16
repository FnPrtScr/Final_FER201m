import React from 'react'
import { Col, Navbar, Row,Modal, Button, Form, FormLabel, Tab, NavItem, ListGroup, TabContainer } from 'react-bootstrap'
import { useState,useParams, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom'
import { updateReminderById } from '../services/reminder.service';
const EditReminder = () => {
    const { reminder_id } = useParams();
    console.log(reminder_id);
    
    // updateReminderById(reminder_id)
    return (
        <>
           <div>abcd</div>
        </>
    );
}

export default EditReminder