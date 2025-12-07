import { useState, useEffect } from 'react';
import api from '../services/api';

const AppointmentForm = ({ appointment, onClose }) => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    appointment_date: '',
    duration_minutes: 60,
    notes: '',
    status: 'scheduled',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (appointment) {
      // Convert datetime to format required by datetime-local input
      const date = new Date(appointment.appointment_date);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setFormData({
        client_name: appointment.client_name,
        client_phone: appointment.client_phone || '',
        client_email: appointment.client_email || '',
        appointment_date: localDate,
        duration_minutes: appointment.duration_minutes,
        notes: appointment.notes || '',
        status: appointment.status,
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (appointment) {
        await api.put(`/appointments/${appointment.id}`, formData);
      } else {
        await api.post('/appointments', formData);
      }
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'שגיאה בשמירת התור');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{appointment ? 'עריכת תור' : 'תור חדש'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="client_name">שם לקוח *</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_phone">טלפון</label>
            <input
              type="tel"
              id="client_phone"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_email">אימייל</label>
            <input
              type="email"
              id="client_email"
              name="client_email"
              value={formData.client_email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointment_date">תאריך ושעה *</label>
            <input
              type="datetime-local"
              id="appointment_date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration_minutes">משך (בדקות)</label>
            <input
              type="number"
              id="duration_minutes"
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleChange}
              min="15"
              max="480"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">סטטוס</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="scheduled">מתוזמן</option>
              <option value="completed">הושלם</option>
              <option value="cancelled">בוטל</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">הערות</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'שומר...' : 'שמור'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
