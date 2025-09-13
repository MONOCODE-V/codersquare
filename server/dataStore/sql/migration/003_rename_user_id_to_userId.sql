-- Migration: Rename user_id to userId in posts, comments, likes

ALTER TABLE posts RENAME COLUMN user_id TO userId;
ALTER TABLE comments RENAME COLUMN user_id TO userId;
ALTER TABLE likes RENAME COLUMN user_id TO userId;
