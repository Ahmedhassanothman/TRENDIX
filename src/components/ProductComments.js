import React, { useState } from "react";

// Star rating component
function StarRating({ rating, setRating }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#FFD700" : "#ccc",
            fontSize: 24,
          }}
          onClick={() => setRating(star)}
          data-testid={`star-${star}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Main comments component
const ProductComments = ({ product, user, onCommentsUpdate }) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  // Add new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || rating === 0) {
      setError("Please write a review and select a star rating.");
      return;
    }
    const newComment = {
      userId: user.userId,
      userName: user.userName,
      userImage: user.userImage,
      text: commentText,
      rating,
      date: new Date().toISOString(),
    };
    const updatedComments = [...(product.comments || []), newComment];
    if (onCommentsUpdate) onCommentsUpdate(updatedComments);
    setCommentText("");
    setRating(0);
    setError("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-bold mb-2">Reviews & Ratings</h3>
      {/* Add comment form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <div className="mb-2">
          <label className="block mb-1">Product Rating:</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          placeholder="Write your review here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Review
        </button>
      </form>
      {/* Comments list */}
      <div>
        {(product.comments && product.comments.length > 0) ? (
          product.comments.map((c, idx) => (
            <div key={idx} className="mb-4 border-b pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{c.userName}</span>
                <span className="text-xs text-gray-500">{new Date(c.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center mb-1">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} style={{ color: star <= c.rating ? "#FFD700" : "#ccc", fontSize: 18 }}>★</span>
                ))}
              </div>
              <div>{c.text}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProductComments; 