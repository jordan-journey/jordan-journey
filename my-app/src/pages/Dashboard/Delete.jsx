
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function DeleteTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteEvent = async () => {
      try {
        await axios.delete(`https://tickets-73a3c-default-rtdb.firebaseio.com/events/${id}.json`);
        navigate('/DisplayEvents', { state: { successMessage: 'Event deleted successfully!' } });
      } catch (error) {
        console.error('Error deleting event', error);
        alert('Failed to delete event');
      }
    };

    deleteEvent();
  }, [id, navigate]);

  return (
    <div>
    
    
    </div>
  );
}

export default DeleteTicket;
