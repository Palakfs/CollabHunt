import React from 'react';
import FormComponent from '../Components/Form'; 

const CreateGroupForm = () => {
    const fields = [
        { label: 'Group Name', type: 'text', placeholder: 'Enter the group name' }, 
        { label: 'Group Description', type: 'text', placeholder: 'Enter the group description', isTextArea: true }, 
        { label: 'Add Group Members', type: 'text', options: ['Person 1' , 'Person 2' , 'Person 3' , ] },
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
    
    export default CreateGroupForm;
    

