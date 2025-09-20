package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;
    public BookService(BookRepository repo) { this.repo = repo; }

    public List<Book> findAll() { return repo.findAll(); }

    public Optional<Book> findById(String id) { return repo.findById(id); }

    public Book create(Book book) {
        if (repo.existsById(book.getId())) {
            throw new IllegalArgumentException("Book with id already exists");
        }
        return repo.save(book);
    }

    public Book update(String id, Book book) {
        Book existing = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));
        // ensure id stays the same
        book.setId(id);
        return repo.save(book);
    }

    public void delete(String id) {
        if (!repo.existsById(id)) throw new IllegalArgumentException("Book not found");
        repo.deleteById(id);
    }
}
