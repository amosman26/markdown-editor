# Markdown Editor with Live Preview

This project is a simple Markdown editor that provides a live preview of the rendered Markdown. It also allows users to save and load documents, making it a handy tool for creating and editing Markdown files.

## Features

- **Live Preview:** See your Markdown rendered as you type.
- **Syntax Highlighting:** Code blocks are highlighted using `highlight.js`.
- **Save & Load Documents:** Store your documents in a PostgreSQL database and retrieve them at any time.
- **Responsive Design:** Built with Tailwind CSS to ensure a responsive and clean UI.

## Tech Stack

- **Frontend:** Vue.js
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS
- **Libraries:** `marked`, `highlight.js`

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/markdown-editor.git
   cd markdown-editor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   npm run dev
   ```

4. Set up PostgreSQL:

	Create a database called markdown_editor.

	Create the `documents` table:

	```sql
	CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
	```
	
5. Start the backend server:

   ```bash
   node server/index.js
   ```

6. Start the frontend:

   ```bash
   npm run dev
   ```

7. Open your browser:

Visit `http://localhost:3000` to use the Markdown Editor.
