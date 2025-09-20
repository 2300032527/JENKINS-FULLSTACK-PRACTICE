package com.example.library.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @Column(nullable = false, unique = true)
    private String id;   // Book ID (comes from frontend)

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    private String category;

    @Min(0)
    private Integer copies;

    public Book() {}

    public Book(String id, String title, String author, String category, Integer copies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.copies = copies;
    }

    // Add these getters and setters
    public String getId() { return id; } // Fix for getId() error
    public void setId(String id) { this.id = id; } // For setId()

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getCopies() { return copies; }
    public void setCopies(Integer copies) { this.copies = copies; }
}