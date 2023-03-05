import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.config";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  // Create a new user
  const createUsers = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setNewName("");
    setNewAge(0);
  };

  // Update a user
  const updateUser = async (id, age) => {
    const newField = { age: age + 1 };
    const userDoc = doc(db, "users", id);

    await updateDoc(userDoc, newField);
  };

  // Delete a user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    // Get all users
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [users]);

  return (
    <div className="app">
      <input
        type="text"
        onChange={(e) => {
          setNewName(e.target.value);
        }}
        value={newName}
        placeholder="Name..."
      />
      <input
        type="number"
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
        value={newAge}
        placeholder="Age..."
      />
      <button onClick={createUsers}>Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id} className="user">
            <h1>Name: {user.name}</h1>
            <h2>Age: {user.age}</h2>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
