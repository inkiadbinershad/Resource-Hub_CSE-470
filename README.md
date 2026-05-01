# ResourceHub – An Online Resource Sharing and Booking Platform

> "Share Knowledge. Book Resources. Empower Collaboration."

A full-stack web application that allows users to browse, book, and share academic resources through a centralized platform.

---

## Tech Stack

**Frontend:** React.js, Vite, TailwindCSS, GSAP, Framer Motion, React Router  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Authentication:** JWT (JSON Web Tokens)  
**File Upload:** Multer  

---

## Features

1. Resource Browsing
2. Resource Search
3. Resource Filtering by Category
4. Resource Booking
5. Booking History
6. Resource Sharing (File Upload & Download)
7. User Authentication (Register & Login)
8. Resource Management (Admin)
9. Booking Cancellation
10. Dashboard Analytics

---

## Project Structure

```
Resource-Hub_CSE-470/
├── backend/               # Express.js backend
│   ├── middleware/        # JWT auth middleware
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded files (auto-created)
│   ├── db.js              # PostgreSQL connection
│   ├── server.js          # Entry point
│   ├── .env               # Environment variables (not pushed to GitHub)
│   └── package.json
├── src/                   # React frontend
│   ├── components/        # Reusable UI components
│   ├── context/           # Auth and Booking context
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   └── data/              # Static category data
├── index.html
├── vite.config.js
└── package.json
```

---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (LTS version)
- [PostgreSQL](https://www.postgresql.org/download/windows/)

---

## Database Setup

1. Open **pgAdmin 4**
2. Create a new database named `resourcehub`
3. Open the **Query Tool** for `resourcehub`
4. Run the following SQL to create tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Available',
  image VARCHAR(10),
  description TEXT,
  capacity INTEGER,
  location VARCHAR(100),
  amenities TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id),
  resource_name VARCHAR(100),
  date DATE,
  start_time TIME,
  end_time TIME,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE uploads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200),
  description TEXT,
  file_path VARCHAR(300),
  file_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. Run the following SQL to seed the 16 resources:

```sql
INSERT INTO resources (name, category, status, image, description, capacity, location, amenities) VALUES
('Conference Room A', 'Rooms', 'Available', '🏢', 'A spacious conference room equipped with a 75-inch 4K display, video conferencing capabilities, and seating for 12 people.', 12, 'Floor 3, Room 301', ARRAY['4K Display', 'Video Conferencing', 'Whiteboard', 'Air Conditioning']),
('Projector HD', 'Equipment', 'Available', '📽️', 'High-definition projector with 1080p resolution, ideal for presentations and movie nights.', 1, 'Equipment Room', ARRAY['1080p Resolution', 'HDMI', 'USB', 'Remote Control']),
('Company Van', 'Vehicles', 'Available', '🚐', 'Spacious 12-seater van perfect for team outings and client visits.', 12, 'Parking Lot B', ARRAY['GPS Navigation', 'Air Conditioning', 'Bluetooth', 'Backup Camera']),
('Design Library', 'Books', 'Available', '📚', 'Collection of design books, UX guides, and industry publications.', 5, 'Floor 2, Library', ARRAY['Quiet Space', 'Reading Desks', 'Coffee Machine', 'Natural Light']),
('Meeting Room B', 'Rooms', 'Maintenance', '🏠', 'Intimate meeting space for 4-6 people. Features a smart TV and collaborative tools.', 6, 'Floor 2, Room 204', ARRAY['Smart TV', 'Whiteboard', 'Video Call Setup', 'Natural Lighting']),
('DSLR Camera Kit', 'Equipment', 'Available', '📷', 'Professional DSLR camera with multiple lenses, tripod, and lighting equipment.', 1, 'Equipment Room', ARRAY['24-70mm Lens', 'Tripod', 'Ring Light', 'Memory Cards']),
('Electric Scooter', 'Vehicles', 'Available', '🛴', 'Eco-friendly electric scooter for quick office commutes.', 1, 'Bike Storage', ARRAY['25 Mile Range', 'LED Lights', 'Digital Display', 'Foldable']),
('Tech Manuals Collection', 'Books', 'Available', '📖', 'Comprehensive collection of technical manuals, programming guides, and IT certifications preparation books.', 10, 'Floor 1, Room 102', ARRAY['Computer Desks', 'WiFi', 'Printing Service', 'Study Rooms']),
('Training Room', 'Rooms', 'Available', '🎓', 'Large training room with tiered seating for 30 people.', 30, 'Floor 4, Room 401', ARRAY['Projector', 'Microphone System', 'Recording Equipment', 'Wheelchair Access']),
('Portable Speaker', 'Equipment', 'Available', '🔊', 'High-quality portable speaker system for events and presentations.', 1, 'Equipment Room', ARRAY['Bluetooth 5.0', '12hr Battery', 'Waterproof', 'Party Lights']),
('Delivery Truck', 'Vehicles', 'Available', '🚚', 'Medium-sized delivery truck with loading ramp.', 2, 'Parking Lot A', ARRAY['Loading Ramp', 'GPS', 'Air Conditioning', 'Cargo Space']),
('Audio Books Collection', 'Books', 'Maintenance', '🎧', 'Extensive collection of audiobooks across various genres.', 8, 'Floor 2, Media Room', ARRAY['Noise-Canceling Headphones', 'Comfortable Seating', 'Charging Stations', 'Relaxing Environment']),
('3D Printer Pro', 'Equipment', 'Available', '🖨️', 'High precision 3D printer with dual extruders for prototyping.', 1, 'Maker Lab', ARRAY['PLA/ABS Support', 'Dual Extruder', 'High Precision', 'WiFi']),
('Quiet Focus Pod', 'Rooms', 'Available', '🛋️', 'Private mini office pod designed for deep focus, interviews, and one-on-one calls.', 1, 'Floor 1, Pods', ARRAY['Noise Isolation', 'Tablet Controls', 'LED Lighting', 'USB Charging']),
('Collaboration Table', 'Rooms', 'Available', '🪑', 'Spacious meeting table with power ports and video conferencing stand.', 8, 'Floor 2, Room 210', ARRAY['Power Ports', 'Conference Stand', 'Whiteboard', 'Fast Wi-Fi']),
('Wellness Kit', 'Equipment', 'Available', '🧘', 'Portable relaxation kit with yoga mat, noise-cancelling headphones, and mindfulness guides.', 1, 'Wellness Center', ARRAY['Yoga Mat', 'Headphones', 'Guided Sessions', 'Portable Bag']);
```

---

## Environment Variables

Create a `.env` file inside the `backend/` folder based on `.env.example`:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=resourcehub
DB_PASSWORD=your_postgresql_password
DB_PORT=5432
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Running the Project

You need **two terminals** open at the same time.

### Terminal 1 — Start the Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ Connected to PostgreSQL database!
```

### Terminal 2 — Start the Frontend

```bash
npm install
npm run dev
```

Then open your browser at:
```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/resources | Get all resources | No |
| GET | /api/resources/:id | Get single resource | No |
| POST | /api/resources | Add resource (admin) | Yes |
| PUT | /api/resources/:id | Update resource (admin) | Yes |
| DELETE | /api/resources/:id | Delete resource (admin) | Yes |
| POST | /api/bookings | Create booking | Yes |
| GET | /api/bookings/my | Get user's bookings | Yes |
| PUT | /api/bookings/:id/cancel | Cancel booking | Yes |
| GET | /api/dashboard | Get dashboard stats | No |
| POST | /api/uploads | Upload a file | Yes |
| GET | /api/uploads | Get all uploads | No |

---

## Team Members

| Student ID | Name |
|------------|------|
| 21201516 | Inkiad Bin Ershad Rafey |
| 23101475 | Israt Hossain |

---

## Course

**CSE 470** — Software Engineering  
Independent University, Bangladesh
