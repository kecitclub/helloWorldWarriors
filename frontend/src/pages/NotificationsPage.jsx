import React, { useState } from 'react';
import axios from 'axios';

const NotificationsPage = () => {
  const [disasterReportId, setDisasterReportId] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleDisasterReportIdChange = (e) => {
    setDisasterReportId(e.target.value);
  };

  const NotificationPage = async () => {
    if (!disasterReportId) {
      setStatus('Please provide a valid disaster report ID');
      return;
    }

    try {
      const response = await axios.get(`/api/notify-volunteers/${disasterReportId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // If using JWT for authentication
        },
      });
      
      if (response.status === 200) {
        setMessage(response.data.message);
        setStatus('Notification sent successfully');
      }
    } catch (error) {
      setStatus('Failed to send notification');
      setMessage(error.response ? error.response.data.message : 'Error occurred');
    }
  };

  return (
    <div>
      <h2>Send Notification to Volunteers</h2>
      <div>
        <label>Disaster Report ID: </label>
        <input
          type="text"
          value={disasterReportId}
          onChange={handleDisasterReportIdChange}
          placeholder="Enter disaster report ID"
        />
      </div>
      <button onClick={sendNotification}>Send Notification</button>
      <div>
        {status && <p>Status: {status}</p>}
        {message && <p>Message: {message}</p>}
      </div>
    </div>
  );
};

export default NotificationPage;
