export const ToDoForm = ({ newItem, setNewItem, addItem }) => {
  return (
    <form className="add-form" onSubmit={addItem}>
      <input
        type="text"
        className="todo-input"
        placeholder="What is the task today"
        onChange={(e) =>
          setNewItem((prev) => ({ ...prev, title: e.target.value }))
        }
        value={newItem.title}
        required
      />
      <input
        type="date"
        className="todo-input date"
        onChange={(e) =>
          setNewItem((prev) => ({ ...prev, dueDate: e.target.value }))
        }
        value={newItem.dueDate}
        style={{ color: newItem.dueDate ? "#fff" : "#ffffff83" }}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
