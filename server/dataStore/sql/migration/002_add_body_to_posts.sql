-- Migration: Add body column to posts table
ALTER TABLE posts ADD COLUMN body TEXT;
