import React from 'react';
import FormComponent from '../Components/Form'; 

const CreateTeamForm = () => {
    const fields = [
        { label: 'Team Name', type: 'text', placeholder: 'Enter the team name' }, 
        { label: 'Team Description', type: 'text', placeholder: 'Enter the team description', isTextArea: true }, 
        { label: 'Your Expertise', type: 'text', placeholder: 'Enter your expertise in the event domain', isTextArea: true }, 
        { label: 'Expectations From Team Members', type: 'text', placeholder: 'Enter your expectations from team members', isTextArea: true },
        { label: 'Your Commitment Level', type: 'text', options: ['Just Exploring' , 'Beginner' , 'Decent Expertise' , 'Highly Experienced'] },
        { label: 'Maximum Number Of Members', type: 'number', placeholder: 'Enter the maximum capacity of your team ' },
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
    
    export default CreateTeamForm;
    

