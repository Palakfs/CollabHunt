import React from 'react';
import FormComponent from '../Components/Form'; 



const AddEventForm = () => {
  const fields = [
    { label: 'Event Title', type: 'text', placeholder: 'Enter the event title' },
    { label: 'Category', type: 'text', options: ['Technology', 'Business', 'Product Management' ,'Consulting' , 'Data Science' , 'Core' , 'Finance'] },
    { label: 'Visible To', type: 'text', options: ['Group 1', 'Group 2' , 'Group 3'] },
    { label: 'Registration Deadline', type: 'date' },
    { label: 'Event Description', type: 'text', placeholder: 'Enter the event description', isTextArea: true },
    { label: 'Link For More Details', type: 'text', placeholder: 'Enter the link for more details' },
  ];

  const handleSubmit = (data: { [key: string]: any }) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <FormComponent fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEventForm;
