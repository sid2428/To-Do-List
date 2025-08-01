import React, { useState } from 'react';
import './CommentBox.css'; // optional if you want to style it

function CommentBox() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    setComments([...comments, comment.trim()]);
    setComment('');
  };

  return (
    <div className="comment-box">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <ul className="comment-list">
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentBox;
