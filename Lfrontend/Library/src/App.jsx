import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ id: "", title: "", author: "", category: "", copies: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error("Failed to fetch books:", response.statusText);
        alert("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Error fetching books: " + error.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    if (!form.id || !form.title || !form.author) {
      alert("Please enter Book ID, Title, and Author!");
      return;
    }

    try {
      const url = editId ? `http://localhost:8080/api/books/${form.id}` : "http://localhost:8080/api/books";
      const method = editId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, copies: parseInt(form.copies) || 0 }),
      });

      if (response.ok) {
        alert(editId ? "Book updated successfully!" : "Book added successfully!");
        setForm({ id: "", title: "", author: "", category: "", copies: "" });
        setEditId(null);
        fetchBooks();
      } else {
        const errorText = await response.text();
        alert(`Failed to ${editId ? "update" : "add"} book: ${errorText}`);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`);
      if (response.ok) {
        const book = await response.json();
        setForm(book);
        setEditId(id);
      } else {
        alert("Failed to fetch book details");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Book deleted successfully!");
        fetchBooks();
      } else {
        alert("Failed to delete book");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>📚 Library Management System</h1>
        <button>Login</button>
      </div>

      <div className="card">
        <h2>Books Management</h2>

        <div className="form-container">
          <h3>Add Book</h3>
          <div className="form-grid">
            <input type="text" name="id" placeholder="Book ID" value={form.id} onChange={handleChange} />
            <input type="text" name="title" placeholder="Book Title" value={form.title} onChange={handleChange} />
            <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input type="number" name="copies" placeholder="Available Copies" value={form.copies} onChange={handleChange} />
          </div>
          <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
        </div>

        <div className="table-container">
          <h3>Books List</h3>
          {books.length === 0 ? (
            <p>No books added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Copies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.copies}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(book.id)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
