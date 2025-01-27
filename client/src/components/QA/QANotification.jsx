import React from 'react';

const QANotification = ({ type, msg }) => {
  let notificationClassName;
  if (type === 'success') {
    notificationClassName = 'qa-notification-success';
  }

  if (type === 'error') {
     notificationClassName = 'qa-notification-error';
  }

  return (
    <div className={notificationClassName}>
      <p>{msg}</p>
    </div>
  )
}

export default QANotification;