'use client';
import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import { useSession } from 'next-auth/react';
import Loading from './Loading';

interface RatingFormProps {
	recipeId: string;
}

const RatingForm: React.FC<RatingFormProps> = ({ recipeId }) => {
	const { data: session, status } = useSession();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setNotification({ message: 'Please provide a rating.', type: 'error' });
      return;
    }

    try {
      const res = await fetch('/api/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment,
          recipeId,
        }),
      });

      const data = await res.json();

      if(!res.ok)
      	throw new Error(`${data.data}`);

     	setNotification({ message: data.data, type: 'success' });
      setRating(undefined);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating: ', error);
      setNotification({ message: 'Failed to submit rating. Please try again.', type: 'error' });
    }
  };

  if(status === 'unauthenticated') 
  	return <div>You are not logged in. Please log in to leave a rating.</div>;
  if(status === 'loading')
    return <Loading />;

  return (
	  <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
	    <div className="flex flex-col">
	      <label htmlFor="rating" className="text-sm font-semibold text-gray-700 mb-2">Rating:</label>
	      <input
	        type="number"
	        id="rating"
	        name="rating"
	        value={rating ?? ''}
	        onChange={(e) => setRating(Number(e.target.value))}
	        min="1"
	        max="5"
	        required
	        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:border-orange-500"
	      />
	    </div>

	    <div className="flex flex-col">
	      <label htmlFor="comment" className="text-sm font-semibold text-gray-700 mb-2">Comment:</label>
	      <textarea
	        id="comment"
	        name="comment"
	        value={comment}
	        onChange={(e) => setComment(e.target.value)}
	        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:border-orange-500"
	        rows={4}
	      />
	    </div>

	    {notification && (
	      <div className="mt-4">
	        <Notification
	          message={notification.message}
	          type={notification.type}
	          duration={3000}
	          onClose={() => setNotification(null)}
	        />
	      </div>
	    )}

	    <button
	      type="submit"
	      className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
	    >
	      Submit Rating
	    </button>
	  </form>
	);
};

export default RatingForm;
