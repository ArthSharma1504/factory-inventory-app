Factory Inventory Management App
A web application to digitally manage the inventory of products purchased and consumed by different departments in a factory that manufactures empty capsules.
Project Structure
factory-inventory-app/
├── frontend/               # Next.js frontend
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   ├── styles/            # CSS/Tailwind styles
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── ...
├── backend/               # Node.js/Express backend
│   ├── routes/            # API routes
│   ├── models/            # MongoDB schemas
│   ├── controllers/       # Business logic
│   ├── middleware/        # Custom middleware
│   ├── package.json       # Backend dependencies
│   └── ...
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
└── docker-compose.yml     # Optional: For local MongoDB setup

Setup Instructions

Clone the repository:
git clone https://github.com/your-username/factory-inventory-app.git
cd factory-inventory-app


Frontend Setup:
cd frontend
npm install
npm run dev


Backend Setup:
cd backend
npm install
npm start


MongoDB Setup:

Use a cloud MongoDB service (e.g., MongoDB Atlas) or run locally using Docker:docker-compose up -d




Environment Variables:

Copy backend/.env.example to backend/.env and set MONGO_URI and JWT_SECRET.



API Endpoints

Authentication:
POST /api/auth/register: Register a new user
POST /api/auth/login: Login and receive JWT


Products (Authenticated):
POST /api/products: Create a new product
GET /api/products: Get all products
GET /api/products/:id: Get a product by ID
PUT /api/products/:id: Update a product
DELETE /api/products/:id: Delete a product


Purchases (Authenticated):
POST /api/purchases: Create a new purchase
GET /api/purchases: Get all purchases
GET /api/purchases/:id: Get a purchase by ID


Departments (Authenticated):
POST /api/departments: Create a new department
GET /api/departments: Get all departments
GET /api/departments/:id: Get a department by ID
PUT /api/departments/:id: Update a department
DELETE /api/departments/:id: Delete a department


Consumptions (Authenticated):
POST /api/consumptions: Create a new consumption
GET /api/consumptions: Get all consumptions
GET /api/consumptions/:id: Get a consumption by ID



Tech Stack

Frontend: Next.js, React, Tailwind CSS
Backend: Node.js, Express, JWT
Database: MongoDB
Deployment: Vercel (frontend), Heroku (backend)

Contributing

Create a new branch for features or bug fixes: git checkout -b feature/your-feature-name
Commit changes: git commit -m "Add your message"
Push to the branch: git push origin feature/your-feature-name
Open a pull request on GitHub.

License
MIT
