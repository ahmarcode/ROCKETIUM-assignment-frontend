
# ROCKETIUM Assignment - Canvas Builder API with PDF Export

This repository contains the implementation of a **Canvas Builder** application developed as part of the software developer engineer intern assignment for ROCKETIUM. The project features a backend API built with Node.js and Express, and a React-based frontend that allows users to create, manipulate, and export canvases with shapes, text, and images.

---

## Features

- Initialize a drawable canvas with custom width and height
- Add various shapes (rectangle, circle) with configurable position, size, and color
- Add text with customizable font size, color, and position
- Add images by URL or upload image files to the canvas
- Undo and redo changes on the canvas
- Export the current canvas view as an image (PNG)
- Export the canvas as a compressed PDF file
- Reset (clear) the canvas to start fresh

---

## Tech Stack

- **Backend:** Node.js, Express, `canvas` library, `pdfkit` for PDF generation, `multer` for file uploads
- **Frontend:** React, Axios for API calls, HTML5 Canvas integration
- **Others:** Multer for handling file uploads, FormData for sending images from frontend to backend

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- (Optional) Any modern web browser for frontend UI

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/rocketium-assignment.git
cd rocketium-assignment
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will run at `http://localhost:5000` (or your configured port).

### Start Frontend

```bash
cd frontend
npm start
```

The React app will run at `http://localhost:3000`.

---

## API Endpoints

| Endpoint           | Method | Description                             |
|--------------------|--------|-------------------------------------|
| `/canvas/init`     | POST   | Initialize canvas with width & height |
| `/canvas/add-shape`| POST   | Add a shape (rectangle/circle)       |
| `/canvas/add-text` | POST   | Add text to canvas                    |
| `/canvas/add-image`| POST   | Add image by URL                     |
| `/canvas/upload-image` | POST | Upload an image file to canvas       |
| `/canvas/undo`     | POST   | Undo last canvas operation           |
| `/canvas/redo`     | POST   | Redo previously undone operation     |
| `/canvas/image`    | GET    | Get current canvas as image (PNG)    |
| `/canvas/export-pdf` | GET   | Export canvas as PDF                  |
| `/canvas/reset`    | POST   | Clear/reset the canvas                |

---

## Project Structure

```
rocketium-assignment/
├── backend/            # Node.js + Express backend API
│   ├── controllers/    # Canvas controller functions
│   ├── routes/         # API route definitions
│   ├── uploads/        # Temporary uploaded files (gitignored)
│   └── server.js       # Main backend server file
│
├── frontend/           # React frontend app
│   ├── src/
│   │   ├── api/        # API call functions (axios)
│   │   ├── components/ # React components & UI
│   │   └── App.js      # Main React component
│
└── README.md           # This documentation
```

---

## Notes

- The backend uses the `canvas` npm package to manipulate the canvas server-side.
- The frontend interacts with the backend through REST API calls.
- Undo and redo functionality is implemented using in-memory history stacks.
- Uploaded images are temporarily stored and deleted after processing.
- PDF export compresses the canvas image and embeds it inside a PDF document.

---

## Future Improvements

- Persist canvas state to a database for multi-session support.
- Add multi-user collaboration support in real-time.
- Add more shape types and text styling options.
- Implement drag-and-drop UI for easier positioning.
- Add authentication and user management.

---

## Author

Muhammad Ahmar Hilal  
Final Year CSE Student  
Government College of Engineering, Aurangabad (GECA)

---

## License

This project is for educational and assessment purposes only.
