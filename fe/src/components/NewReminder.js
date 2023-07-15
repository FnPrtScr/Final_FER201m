import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { useNavigate } from 'react-router-dom'


const NewReminder = () => {
    
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(new Date());
    const [priority, setPriority] = useState(0);
    const [cate, setCate] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data.categories.rows))
    }, [])

    const closeModalReminder = () => {
        const modal = document.querySelector('.modal-reminder');
        modal.classList.remove('open');
    }

    const createReminder = () => {
        if (JSON.parse(localStorage.getItem('USER'))) {
            const data = {
                title: title,
                description: description,
                due_date: time,
                priority: parseInt(priority),
                status: 'Pending',
                category_id: parseInt(cate),
                user_id: JSON.parse(localStorage.getItem('USER')).data.user_id
            }
            const option = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            }
            fetch('http://localhost:5000/api/v1/reminders', option)
                .then(res => res.json())
                .then((data) => {
                    if (data !== null) {
                        alert('Them reminder thanh cong');
                        window.location.reload();
                    }
                })
        } else {
            navigate('/api/v1/auth');
        }
    }


    return (
        <>
            <div className="modal-reminder">
                <div className="modal-container-reminder">
                    <div className="modal-reminder-title">
                        <h5>Create new reminder</h5>
                    </div>
                    <div>
                        <div className="input">
                            <label htmlFor="contact">Title</label>
                            <input id="contact" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="input">
                            <label htmlFor="price">Description</label>
                            <textarea id="price" type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <span style={{ marginRight: '12px' }}>Dealine</span>
                            <DateTimePicker value={time} onChange={setTime} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span>Priority</span>
                            <select onChange={(e) => setPriority(e.target.value)}>
                                <option value={0}>None</option>
                                <option value={1}>Short</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <span style={{ marginRight: '12px' }}>Categories</span>
                            <select onChange={(e) => setCate(e.target.value)}>
                                {
                                    categories.map(cate =>
                                        <option value={cate.category_id} key={cate.id}>{cate.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="button">
                            <span className="btn-cancel" onClick={closeModalReminder} >Cancel</span>
                            <button style={{ marginLeft: "6px" }} className="btn-create" onClick={createReminder}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewReminder;