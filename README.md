# ClickTor - Multi-tenant SaaS Starter

A modern multi-tenant SaaS appointment management system with Laravel 11 API backend and React frontend with Hebrew RTL support.

## Features

- 🔐 Secure authentication (Laravel Sanctum)
- 👥 Multi-tenant architecture - each user is isolated
- 📅 Full CRUD for appointments
- 🌍 Hebrew RTL interface
- 🎨 Modern, responsive UI
- 🔒 Tenant data isolation
- 📱 Mobile-friendly

## Tech Stack

### Backend
- Laravel 11
- MySQL
- Laravel Sanctum (API Authentication)
- RESTful API

### Frontend
- React 18
- Vite
- React Router
- Axios
- RTL (Right-to-Left) Support

## Installation

### Prerequisites
- PHP 8.2+
- Composer
- MySQL
- Node.js 18+
- npm

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/ItayHaroush/Saas-clickTor.git
cd Saas-clickTor
```

2. Install PHP dependencies:
```bash
composer install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Update `.env` with your MySQL credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=clicktor_saas
DB_USERNAME=root
DB_PASSWORD=your_password
```

5. Create the database:
```bash
mysql -u root -p
CREATE DATABASE clicktor_saas;
exit;
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (requires auth)
- `GET /api/me` - Get current user (requires auth)

### Appointments (all require authentication)
- `GET /api/appointments` - List user's appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/{id}` - Get specific appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

## Usage

1. Open `http://localhost:5173` in your browser
2. Register a new account (Hebrew interface)
3. Login with your credentials
4. Create, view, edit, and delete appointments
5. Each user can only see and manage their own appointments (tenant isolation)

## Project Structure

```
.
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php
│   │   └── AppointmentController.php
│   └── Models/
│       ├── User.php
│       └── Appointment.php
├── client/
│   └── src/
│       ├── components/
│       │   ├── AppointmentForm.jsx
│       │   └── ProtectedRoute.jsx
│       ├── contexts/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Dashboard.jsx
│       └── services/
│           └── api.js
├── database/
│   └── migrations/
└── routes/
    └── api.php
```

## Security Features

- Password hashing with bcrypt
- API token authentication (Sanctum)
- CSRF protection
- Data isolation per tenant
- Protected routes
- Input validation

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

## License

Open source - MIT License

## Support

For issues or questions, please open an issue on GitHub.
