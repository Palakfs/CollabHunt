import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { createEvent }  from '../features/thunks/eventThunk';
import { fetchCategories } from '../features/thunks/categoryThunk';
import { fetchGroups } from '../features/thunks/groupThunk';
import FormComponent from '../Components/Form';
import { useNavigate } from "react-router-dom";

const AddEventForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.category);
  const { groups, loading: groupsLoading } = useSelector((state: RootState) => state.group);
  const { loading: eventLoading, error: eventError } = useSelector((state: RootState) => state.event);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories()).catch(() => console.error('Failed to fetch categories'));
    dispatch(fetchGroups()).catch(() => console.error('Failed to fetch groups'));
  }, [dispatch]);

  const fields = [
    { label: 'Event Title', type: 'text', placeholder: 'Enter the event title' },
    { label: 'Category', type: 'select', options: categories.map((cat) => cat.name) , isMultiple: true,},  
    { label: 'Visible To', type: 'select', options: groups.map((group) => group.name) , isMultiple: true,},  
    { label: 'Registration Deadline', type: 'date' },
    { label: 'Event Description', type: 'text', placeholder: 'Enter the event description', isTextArea: true },
    { label: 'Link For More Details', type: 'text', placeholder: 'Enter the link for more details' },
  ];

  const handleSubmit = (data: { [key: string]: any }) => {
    
    const selectedCategoryIds = (data['Category'] || []).map((categoryName: string) => {
      const category = categories.find((cat) => cat.name === categoryName);
      return category ? category.id : null;
    }).filter((id: number | null) => id !== null);
  
    const selectedGroupIds = (data['Visible To'] || []).map((groupName: string) => {
      const group = groups.find((grp) => grp.name === groupName);
      return group ? group.id : null;
    }).filter((id: number | null) => id !== null);


    const payload = {
      "event_title": data['Event Title'],
      "event_category_id": selectedCategoryIds,  
      "visible_to_group_id": selectedGroupIds,  
      "event_description": data['Event Description'],
      "registration_deadline": data['Registration Deadline'],
      "additional_details_link": data['Link For More Details'] || "",
    };

    console.log('Payload:', payload);


    dispatch(createEvent(payload))
      .unwrap()
      .then(() => {
        alert('Event created successfully');
        navigate("/events"); 
      })
      .catch((err) => {
        console.error('Error creating event:', err);
        if (err.response && err.response.data) {
          console.log('Server Error Response:', err.response.data);
        }
      });
      
  };

  if (categoriesLoading || groupsLoading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <FormComponent fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEventForm;
