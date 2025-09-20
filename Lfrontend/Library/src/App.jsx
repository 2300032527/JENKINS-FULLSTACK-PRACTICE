import { useEffect, useState } from 'react'

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/api/books') // no need to write :8080, proxy handles it
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => setBooks(data))
      .catch(err => console.error('Error fetching books:', err))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Library Books</h1>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} ({book.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
