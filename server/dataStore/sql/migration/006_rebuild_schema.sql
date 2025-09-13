-- Migration: Rebuild schema to match TypeScript types

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT,
    userId INTEGER NOT NULL,
    dateCreated INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    comment TEXT NOT NULL,
    dateCreated INTEGER NOT NULL,
    FOREIGN KEY(postId) REFERENCES posts(id),
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE likes (
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    FOREIGN KEY(postId) REFERENCES posts(id),
    FOREIGN KEY(userId) REFERENCES users(id)
);
