# Trade My Nest

**Trade My Nest** is a web platform built to help students exchange their hostel rooms based on mutual interest and agreement. Whether your friends are assigned different hostels or you simply want a different environment — this platform is the solution!

---

## Features

### 🔄 Room Exchange Platform
- Allows students to post their current room and desired swap preferences.
- Search and filter posts based on hostel, room number, or preference criteria.
- Only mutual exchanges are allowed — ensuring fairness and consent.

### 👥 Student Profiles
- Students can create an account and maintain a basic profile.
- Each post is linked to the student's profile for quick and safe contact.

### 🔎 Smart Matching
- View potential matches based on your preferences.
- Real-time filtering for hostel name, wing, floor, or roommate interests.

### 💬 Easy Contact
- Contact the student directly through the provided medium (email or phone).
- Platform ensures that interested users can get in touch quickly.

### 📱 Mobile Friendly
- Fully responsive UI — optimized for both mobile and desktop users.

### 🔐 Secure & Privacy-First
- No sensitive data shared publicly.
- Only authenticated users can post or interact with requests.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Zustand (or your used store)
- **Icons:** React Icons

---

## How to Use

### 1. Clone the repository
```bash
git clone https://github.com/pritamzzziscoding/trade-my-nest.git
cd trade-my-nest
```

### 2. Set the environment variables in the backend folder
```bash
PORT = 3000
MONGO_URI = 
JWT_SECRET = 
EMAIL_USER = 
EMAIL_PASS = 
NODE_ENV = development
```

### 3. Install Dependencies
```bash
npm install
```

### 4.Run the Application
```bash
npm run build
npm run start
```

## 📌 Application Flow

1. **Connect**  
   Visit the platform and log in or register as a new user.

2. **Post / Filter**  
   - **Post:** Submit your current room details and specify your preferred room/hostel.
   - **Filter:** Browse existing requests using filters like hostel name, room number, or preferences.

3. **Contact**  
   View matching posts and directly contact the student through provided communication options.

4. **Exchange**  
   If both parties agree, proceed with a mutual exchange of rooms.

🔗 **Live App:** [Trade My Nest](https://trade-my-nest.onrender.com/)
