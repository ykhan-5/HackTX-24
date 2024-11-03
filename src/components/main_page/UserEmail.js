import React from 'react';

const UserEmail = ({ email }) => {
  // Get today's date and format it
  const today = new Date();
  const options = { month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Format the date to add suffix (st, nd, rd, th)
  const day = today.getDate();
  let suffix = 'th';

  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }

  return (
    <div className="user-email">
      <div>{email}</div>
      <div className="date">{`Today, ${formattedDate}${suffix}`}</div>
    </div>
  );
};

export default UserEmail;
