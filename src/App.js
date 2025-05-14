import "./App.css";
import { useEffect, useState } from "react";
import api from "./api/axiosConfig";
import { ToDoItem } from "./component/ToDoItem";
import { ToDoForm } from "./component/ToDoForm";

function App() {
  // storing items data from db
  const [items, setItems] = useState([]);

  // storing the new item and update item data
  const [newItem, setNewItem] = useState({
    title: "",
    dueDate: "",
    isCompleted: false,
  });

  const [updateItem, setUpdateItem] = useState();

  // checking anything is updating
  const [isAnyEditing, setIsAnyEditing] = useState(false);

  useEffect(() => {
    getAllItems();
  }, []);

  /** GET ITEMS */
  const getAllItems = async () => {
    try {
      const response = await api.get("/");

      // add one more field to each data
      const updatedItems = response.data.map((item) => ({
        ...item,
        isEditing: false,
      }));

      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  /** ADD ITEM */
  const addItem = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/add", {
        Title: newItem.title,
        ...(newItem.dueDate && { dueDate: newItem.dueDate }),
        isCompleted: newItem.isCompleted,
      });

      setItems([...items, response.data]);
      setNewItem({
        title: "",
        dueDate: "",
        isCompleted: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /** UPDATE ITEM */
  const handleEdit = (id) => {
    setItems(
      items.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editItem = async (e) => {
    e.preventDefault();

    try {
      await api.put(`update/${updateItem.id}`, {
        Title: updateItem.title,
        ...(updateItem.dueDate && { dueDate: updateItem.dueDate }),
      });

      setItems(
        items.map((todo) =>
          todo.id === updateItem.id
            ? { ...todo, ...updateItem, isEditing: false }
            : todo
        )
      );
      // clearData();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await api.put(`/toggleComplete/${id}`);
      setItems(
        items.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  /** DELETE ITEM */
  const deleteItem = async (id) => {
    if (window.confirm("Delete? ")) {
      try {
        await api.delete(`/delete/${id}`);
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="todo-wrapper">
      <h1>Get Things Done !</h1>

      <ToDoForm newItem={newItem} setNewItem={setNewItem} addItem={addItem} />

      {items.map((item, index) => {
        return (
          <ToDoItem
            item={item}
            toggleComplete={toggleComplete}
            editItem={editItem}
            deleteItem={deleteItem}
            toDoItem={updateItem}
            setToDoItem={setUpdateItem}
            handleEdit={handleEdit}
            isAnyEditing={isAnyEditing}
            setIsAnyEditing={setIsAnyEditing}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default App;
