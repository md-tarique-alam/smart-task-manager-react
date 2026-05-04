import { useEffect, useState } from "react";
import Itemlist from "./Itemlist";
import "./styles.css";

function App() {
  const [inp, setInp] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [error, setError] = useState("");
  const [editingindex, setEditingIndex] = useState(null);
  const [filter, SetFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddandUpdate = () => {
    if (!inp.trim()) {
      setError("please enter the task");
      return;
    }
    if (editingindex !== null) {
      const updated = tasks.map((item) => {
        if (item.id === editingindex) {
          return { ...item, text: inp };
        }
        return item;
      });
      setTasks(updated);
      setEditingIndex(null);
    } else {
      const newtask = { id: Date.now(), text: inp, completed: false };
      setTasks([...tasks, newtask]);
    }
    setInp("");
    setError("");
  };

  const handleedit = (id) => {
    const task = tasks.find((item) => item.id === id);
    setInp(task.text);
    setEditingIndex(id);
  };

  const deletetask = (id) => {
    const updateditems = tasks.filter((item) => item.id !== id);
    setTasks(updateditems);
  };

  const toogleitem = (id) => {
    const updateditems = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setTasks(updateditems);
  };

  const filteredtask = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "completed") return item.completed === true;
    if (filter === "pending") return item.completed === false;
  });

  const total = tasks.length;
  const completed = tasks.filter((item) => item.completed).length;
  const pending = tasks.filter((item) => !item.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h2 className="title">Smart Task Manager</h2>
        <div className="input-group">
          <input
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            placeholder="Write something..."
            className="input"
          />
          <button onClick={handleAddandUpdate} className="btn btn-add">
            {editingindex !== null ? "Update" : "Add"}
          </button>
          <button onClick={() => setTasks([])} className="btn btn-clear">
            Clear
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="filter-group">
          <button
            onClick={() => SetFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => SetFilter("completed")}
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
          <button
            onClick={() => SetFilter("pending")}
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          >
            Pending
          </button>
        </div>

        <div className="stats">
          Total: {total} | Completed: {completed} | Pending: {pending}
        </div>

        <Itemlist
          task={filteredtask}
          onDelete={deletetask}
          onToggle={toogleitem}
          onEdit={handleedit}
        />
      </div>
    </div>
  );
}

export default App;
