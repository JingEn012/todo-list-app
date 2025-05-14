import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditToDoForm = ({
  toDoItem,
  setToDoItem,
  editItem,
  handleEdit,
  setIsAnyEditing,
}) => {
  return (
    <form onSubmit={editItem} className="edit-form">
      <div className="edit-field">
        <input
          type="text"
          className="edit-input"
          placeholder="Updating the task..."
          onChange={(e) =>
            setToDoItem((prev) => ({ ...prev, title: e.target.value }))
          }
          value={toDoItem.title}
          required
        />
        <input
          type="date"
          className="edit-input date"
          onChange={(e) =>
            setToDoItem((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          value={toDoItem.dueDate ? toDoItem.dueDate : ""}
          style={{ color: toDoItem.dueDate ? "#fff" : "#ffffff83" }}
        />
      </div>
      <div className="todo-action">
        <button
          type="submit"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            onClick={() => setIsAnyEditing(false)}
          />
        </button>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faXmark}
          onClick={() => {
            handleEdit(toDoItem.id);
            setIsAnyEditing(false);
          }}
        />
      </div>
    </form>
  );
};
