# Aakar ERP System

## Project Overview

Aakar ERP is a full-stack enterprise resource planning (ERP) web application designed for managing employees, projects, departments, skills/training, and a ticketing/helpdesk system. It provides a modern, modular platform for HR, project management, IT support, and training workflows within an organization.

## Features

- **User Authentication & Role Management**: Secure login with JWT, user roles, and access control.
- **Employee Management**: Add, edit, import (via Excel), and view employees, including department/designation mapping.
- **Department & Designation Management**: CRUD operations for departments and job titles.
- **Project Management**: Create, update, and track projects with stages, substages, and Gantt charts.
- **Skill & Training Management**: Define skills, assign to employees, manage training sessions, and track participation.
- **Ticketing/Helpdesk System**: Raise, assign, and resolve support tickets with attachments, status tracking, and email notifications.
- **Admin/Manager Dashboards**: Special views for managing users, projects, tickets, and training.

## Tech Stack

- **Frontend**: React, Redux Toolkit, Material UI, Vite, Axios
- **Backend**: Node.js, Express, MySQL/MariaDB, JWT, Multer, Nodemailer
- **Database**: MySQL/MariaDB (see `aakarerp.sql` for schema and sample data)
- **Other Tools**: phpMyAdmin (optional, for DB management), bcrypt (password hashing)

## Folder Structure

```
Aakar_final/
├── backend/         # Node.js/Express backend (API, DB, business logic)
│   ├── controllers/     # Route controllers (auth, employee, project, etc.)
│   ├── db/              # Database connection
│   ├── email/           # Email templates and assets
│   ├── middleware/      # Express middleware (auth, etc.)
│   ├── routes/          # API route definitions
│   ├── ticketRoutes/    # Ticketing system routes
│   ├── uploads/         # Uploaded files (Excel, PDFs, etc.)
│   ├── utils/           # Utility functions (error, response, multer, etc.)
│   ├── validators/      # Input validation
│   ├── index.js         # Backend entry point
│   └── ...
├── frontend/        # React frontend (UI, state, assets)
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── api/              # Axios instance
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Redux slices
│   │   ├── pages/            # Page components (Login, Dashboard, etc.)
│   │   ├── store/            # Redux store
│   │   ├── ticketComponents/ # Ticketing UI
│   │   └── ...
│   ├── package.json      # Frontend dependencies
│   └── ...
├── aakarerp.sql      # MySQL database schema and sample data
├── AakarEmployeeImport.xlsx # Sample Excel for employee import
├── package.json      # Project-level dependencies
└── README.md         # Project documentation
```

## Setup

### 1. Database Setup (MySQL/MariaDB & phpMyAdmin)

#### **Install MySQL/MariaDB**
- **On Arch Linux:**
  ```bash
  sudo pacman -S mariadb
  sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
  sudo systemctl enable --now mariadb
  ```
- **Secure your installation (optional but recommended):**
  ```bash
  sudo mysql_secure_installation
  ```

#### **Install Apache, PHP, and phpMyAdmin**
- **On Arch Linux:**
  ```bash
  sudo pacman -S apache php php-apache phpmyadmin
  ```
- Edit `/etc/httpd/conf/httpd.conf` and add:
  ```
  Include conf/extra/phpmyadmin.conf
  ```
- Restart Apache:
  ```bash
  sudo systemctl restart httpd
  ```

#### **Import the Database using phpMyAdmin**
1. Open your browser and go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Log in with your MySQL/MariaDB credentials (often `root`)
3. Create a new database (e.g., `aakarerp`)
4. Select the new database, go to the **Import** tab
5. Choose the `aakarerp.sql` file from the project root and click **Go**

Alternatively, you can import via terminal:
```bash
mysql -u <username> -p aakarerp < /path/to/aakarerp.sql
```

### 2. Backend Setup

1. Go to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env_example` to `.env` and fill in your configuration:
   ```bash
   cp .env_example .env
   ```
   - Set your database connection string, JWT secrets, and email credentials in `.env`.
   - Example for local MariaDB:
     ```
     DB_CONNECTION_STRING=mysql://root:<your_password>@localhost:3306/aakarerp
     JWT_ACCESS_SECRET=your_access_secret
     JWT_REFRESH_SECRET=your_refresh_secret
     # ...other settings as needed
     ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Go to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)

### 4. Default Credentials

- You can log in with the following default admin credentials:
  - **Email:** `admin@gmail.com`
  - **Password:** `admin`
