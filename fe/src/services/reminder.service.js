import axios from 'axios';

export const updateReminderById = async (reminder_id,user_id,
    title,
    description,
    due_date,
    priority,
    category_id,) => {
    return await axios.put(
        `http://localhost:5000/api/v1/reminders/${reminder_id}`,
        {
            user_id,
            title,
            description,
            due_date,
            priority,
            category_id,
        }
    )
}