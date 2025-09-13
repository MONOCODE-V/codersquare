-- Migration: Sync database schema with ERD and types

-- USERS: Add firstName and lastName columns
ALTER TABLE users ADD COLUMN firstName TEXT;
ALTER TABLE users ADD COLUMN lastName TEXT;

-- POSTS: Ensure columns match ERD/types
ALTER TABLE posts RENAME COLUMN URL TO url;
ALTER TABLE posts RENAME COLUMN postedAt TO dateCreated;
-- If 'body' column is not needed, you can drop it (optional):
-- ALTER TABLE posts DROP COLUMN body;

-- COMMENTS: Ensure columns match ERD/types
ALTER TABLE comments RENAME COLUMN postedAt TO dateCreated;

-- LIKES: Ensure columns match ERD/types
-- No changes needed for likes table
