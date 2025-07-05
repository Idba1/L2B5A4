
# 📚 Book Management Frontend

A simple, modern, and responsive Book Management frontend built with **React**, **Redux Toolkit Query**, **Tailwind CSS**, and **TypeScript**. This app interacts with a backend API to allow users to manage books and borrowing operations.

---

## 🚀 Features

- 🔍 View paginated book listings
- ➕ Add new books
- 📝 Edit existing books
- 🗑️ Delete books with confirmation
- 📘 Borrow books (with quantity check)
- 📄 View detailed book information
- 🌐 Genre filtering & pagination
- ⚠️ SweetAlert confirmation dialogs
- ✅ Toast notifications for actions
- 📦 Backend integration using RTK Query

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Redux Toolkit** with RTK Query
- **Tailwind CSS**
- **React Router**
- **SweetAlert2**
- **React Toastify**
- **Lucide Icons**

---



## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Idba1/L2B5A4.git
cd library-management-client
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables (if needed)

No `.env` required unless you're customizing backend URL.

### 4. Start the development server

```bash
npm run dev
```

The app will run on:
🔗 `http://localhost:5173`

---

## 🔗 Backend API

Make sure you have the backend server running (e.g., `http://localhost:5000`).
This app is configured to use:

```ts
baseUrl: http://localhost:5000/api
```

Update `BaseApi.ts` if your backend is hosted elsewhere.


