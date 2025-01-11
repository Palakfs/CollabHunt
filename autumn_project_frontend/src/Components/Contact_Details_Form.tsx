import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import axiosInstance from '../utils/axiosInstance';
import FormField from './FormField';

interface JwtPayload {
  user_id: string;
}

interface ProfileData {
  contact_number: number | null;
  email: string | null;
}

interface ContactDetailsFormCardProps {
  profile: ProfileData; 
  onProfileUpdate: () => void; 
}

const ContactDetailsFormCard: React.FC<ContactDetailsFormCardProps> = ({ profile, onProfileUpdate }) => {
  const [contactNumber, setContactNumber] = useState<string>(profile.contact_number?.toString() || ''); 
  const [email, setEmail] = useState(profile.email || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token'); 
      let userId: string | null = null;

      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        userId = decodedToken.user_id;
      } else {
        throw new Error('User not authenticated. Access token missing.');
      }

      if (userId) {
        
        const contactNumberToSend = contactNumber ? parseInt(contactNumber) : null; 

        await axiosInstance.patch(`/get_user_profile/${userId}/`, {
          "contact_number": contactNumberToSend,
          "email": email,
        });
        setError(null); 
        onProfileUpdate(); 
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update contact details.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-left text-xl font-bold mb-4">Contact Details</h2>
      <FormField
        label="Contact Number"
        type="text"
        placeholder="Enter your contact number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button 
        type="submit" 
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4" 
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ContactDetailsFormCard;
