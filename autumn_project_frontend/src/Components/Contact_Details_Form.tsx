import React, { useState } from 'react';
import FormField from './FormField';

const ContactDetailsFormCard: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailId, setEmailId] = useState('');

  const mobileRegex = /^[0-9]{10}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  const isMobileValid = mobileRegex.test(mobileNumber);
  const isEmailValid = emailRegex.test(emailId);

  return (
    <div className="p-4 border rounded-lg shadow-md w-6/10">
      <h2 className="text-left text-xl font-bold mb-4">Contact Details</h2>
      <div className="flex justify-between">
        <div className="flex-1 mr-6 w-4/10">
          <FormField
            label="Mobile Number"
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {!isMobileValid && mobileNumber && (
            <span className="text-red-500 text-sm">Please enter a valid mobile number.</span>
          )}
        </div>
        <div className="flex-1 ml-2 w-4/10 mr-4">
          <FormField
            label="Mail Id"
            type="email"
            placeholder="Enter your mail id"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          {!isEmailValid && emailId && (
            <span className="text-red-500 text-sm">Please enter a valid email address.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsFormCard;
