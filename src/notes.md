# Smart Task Manager (React)

##  Overview

This is a simple task manager built using React.
The main goal of this project was to understand how state, events, and data persistence work together in a real application.

It allows users to add, edit, delete, and track tasks with filtering options.

---

##  Core Concepts Used

* React `useState` for managing UI data
* React `useEffect` for syncing data with localStorage
* Conditional rendering
* Array methods (`map`, `filter`)
* Controlled input fields
* Basic component separation

---

##  Features Explained

### 1. Add Task

User can type a task and click "Add".

* Input is controlled using `useState`
* If input is empty → error message is shown
* New task object structure:

  ```js
  {
    id: Date.now(),
    text: inputValue,
    completed: false
  }
  ```

---

### 2. Edit Task

User can update an existing task.

* Clicking "Edit" fills input with selected task text
* `editingIndex` stores the task id
* Button changes from **Add → Update**
* Task is updated using `map()`

---

### 3. Delete Task

User can remove a task.

* Uses `filter()` to remove task by id
* Updates state → UI re-renders automatically

---

### 4. Toggle Complete (Checkbox)

Each task has a checkbox.

* Clicking checkbox toggles `completed` value
* Done using `map()` and updating only the matched item
* UI updates based on `completed` status

---

### 5. Filter Tasks

User can filter tasks:

* All → shows everything
* Completed → only finished tasks
* Pending → only unfinished tasks

Logic:

```js
tasks.filter((item) => {
  if (filter === "all") return true;
  if (filter === "completed") return item.completed;
  if (filter === "pending") return !item.completed;
});
```

---

### 6. Active Filter Highlight

Selected filter button stays highlighted.

* Based on current `filter` state
* Conditional class applied:

```js
className={`filter-btn ${filter === "completed" ? "active" : ""}`}
```

---

### 7. Task Counts

Shows real-time counts:

* Total tasks
* Completed tasks
* Pending tasks

Uses simple filtering:

```js
tasks.filter(item => item.completed).length
```

---

### 8. Data Persistence (localStorage)

Tasks are saved even after refresh.

* Initial load:

```js
useState(() => JSON.parse(localStorage.getItem("tasks")) || [])
```

* Sync on change:

```js
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

---

### 9. Component Structure

* `App.jsx` → handles logic and state
* `Itemlist.jsx` → responsible for rendering tasks

Props used:

* `task`
* `onDelete`
* `onToggle`
* `onEdit`

---

### 10. Styling Approach

* CSS is separated into a single file (`styles.css`)
* No inline styles → keeps JSX clean
* Uses class-based styling
* Includes hover effects and active states

---

##  Key Learnings

* How React state drives UI updates
* Difference between `map()` and `filter()`
* How to manage form input properly
* How to structure a small React project
* Importance of separating logic and styling

---

##  Possible Improvements

* Add animations (task add/remove)
* Add empty state ("No tasks available")
* Add backend (for real data storage)
* Convert styling to Tailwind CSS

---

##  Final Thought

This project focuses more on **understanding core concepts clearly** rather than adding too many features.


---
