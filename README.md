# 🗓️ React Calendar App

A feature-rich calendar application built with **React** and **TypeScript**, allowing inline task creation, task reordering, drag-and-drop task management, and real-time filtering. It also integrates **holiday data**.

---

## 🚀 Features

### ✅ Calendar Interface

- Includes **navigation** to move between months (Next / Previous)
- Displays **month view** and **week view**with each day as a calendar cell
- Shows **weekdays** (Sunday to Saturday) at the top
- Highlights **current month and year** using context

### ✅ Task Management

- Inline task **creation inside calendar cells**
- Tasks can be **dragged and dropped**:
  - Between days (reassign task date)
  - Within a day (reorder tasks)
- Supports **disabling task entry** on **holidays**, but displays the holiday name

### ✅ Holiday Integration

- Pulls worldwide holidays for the **current year** and selected **country** (e.g., `US`)
- Displays the holiday name **at the top** of each relevant calendar cell
- Prevents adding tasks on holidays

### ✅ Global Search

- Use `Ctrl + F` to **open the search bar**
- Type text to **filter tasks** globally across the calendar
- Press `Escape` to **close the search bar**
- Shows **hint text** fixed at the bottom right:

> **`Ctrl + F`** to search and **`Escape`** to close

---

## 🛠️ Technologies Used

- **React** (w/ Hooks)
- **TypeScript**
- **styled-components** (for CSS-in-JS styling)
- **Day.js** (for date manipulation)
- **Context API** (for managing calendar and task state)

---

## 🧪 How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/messyKassaye/calendar-app
cd calendar-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the app:

```bash
npm start
# or
yarn start
```

---

## 📅 Future Improvements

- Add **week view** toggle
- Store tasks in **local storage** or sync with **backend**
- Support **custom holidays** or **multiple countries**
- Enable **task editing**

---
