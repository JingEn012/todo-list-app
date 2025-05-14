import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditToDoForm } from "./EditToDoForm";

export const ToDoItem = ({
  item,
  toggleComplete,
  editItem,
  deleteItem,
  toDoItem,
  setToDoItem,
  handleEdit,
  isAnyEditing,
  setIsAnyEditing,
}) => {
  return (
    <div className="todo-row">
      {item.isEditing ? (
        <>
          <EditToDoForm
            toDoItem={toDoItem}
            setToDoItem={setToDoItem}
            editItem={editItem}
            handleEdit={handleEdit}
            setIsAnyEditing={setIsAnyEditing}
          />
        </>
      ) : (
        <>
          <div
            onClick={() => toggleComplete(item.id)}
            className={`${item.isCompleted ? "completed" : "incompleted"}`}
          >
            <p>{item.title}</p>
            <span className="todo-due">
              Due Date: {item.dueDate ? item.dueDate : "-"}
            </span>
          </div>
          <div className="todo-action">
            <FontAwesomeIcon
              style={{ cursor: isAnyEditing ? "not-allowed" : "pointer" }}
              icon={faPenToSquare}
              onClick={() => {
                if (isAnyEditing) return;
                setToDoItem(item);
                handleEdit(item.id);
                setIsAnyEditing(true);
              }}
            />
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faTrashCan}
              onClick={() => deleteItem(item.id)}
            />
          </div>
        </>
      )}
    </div>
  );
};
