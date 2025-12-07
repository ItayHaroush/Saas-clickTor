import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AppointmentForm from '../components/AppointmentForm';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את התור?')) {
      try {
        await api.delete(`/appointments/${id}`);
        setAppointments(appointments.filter(apt => apt.id !== id));
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('שגיאה במחיקת התור');
      }
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAppointment(null);
    fetchAppointments();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status) => {
    const labels = {
      scheduled: 'מתוזמן',
      completed: 'הושלם',
      cancelled: 'בוטל'
    };
    return labels[status] || status;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>לוח תורים - {user?.name}</h1>
          <button onClick={handleLogout} className="logout-btn">
            התנתק
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="actions">
          <button onClick={() => setShowForm(true)} className="add-btn">
            + תור חדש
          </button>
        </div>

        {showForm && (
          <AppointmentForm
            appointment={editingAppointment}
            onClose={handleFormClose}
          />
        )}

        {loading ? (
          <p>טוען...</p>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <p>אין תורים להצגה</p>
            <p>לחץ על "תור חדש" כדי להוסיף תור ראשון</p>
          </div>
        ) : (
          <div className="appointments-list">
            <h2>התורים שלי</h2>
            {appointments.map((appointment) => (
              <div key={appointment.id} className={`appointment-card status-${appointment.status}`}>
                <div className="appointment-header">
                  <h3>{appointment.client_name}</h3>
                  <span className={`status-badge status-${appointment.status}`}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </div>
                <div className="appointment-details">
                  <p><strong>תאריך:</strong> {formatDate(appointment.appointment_date)}</p>
                  <p><strong>משך:</strong> {appointment.duration_minutes} דקות</p>
                  {appointment.client_phone && (
                    <p><strong>טלפון:</strong> {appointment.client_phone}</p>
                  )}
                  {appointment.client_email && (
                    <p><strong>אימייל:</strong> {appointment.client_email}</p>
                  )}
                  {appointment.notes && (
                    <p><strong>הערות:</strong> {appointment.notes}</p>
                  )}
                </div>
                <div className="appointment-actions">
                  <button onClick={() => handleEdit(appointment)} className="edit-btn">
                    ערוך
                  </button>
                  <button onClick={() => handleDelete(appointment.id)} className="delete-btn">
                    מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
