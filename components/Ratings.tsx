'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Rating from '../models/rating';
import User from '../models/user';
import Notification from './Notification';
import RatingForm from './RatingForm';

interface RatingsProps {
  recipeId: string;
}

const Ratings: React.FC<RatingsProps> = ({ recipeId } : { recipeId: string }) => {
	const [ratings, setRatings] = useState([]);
	const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

	useEffect(() => {
		const fetchRatings = async () => {
			try {
				const res = await fetch('/api/rating', {
					method: 'GET',
			        headers: {
			          'Content-Type': 'application/json',
			          'RecipeId': recipeId,
			        },
				});
				const recipeRatings = await res.json();

				if(!res.ok)
					throw new Error(`${recipeRatings.data}`);

				for(let rating of recipeRatings.data) {
					const ratingUser = await fetch('/api/user', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'UserId': String(rating.userId),
						},
					});

					const ratingUserData = await ratingUser.json();

					rating.userFirstName = ratingUserData.data.firstName;
					rating.userLastName = ratingUserData.data.lastName;
				}

				setRatings(recipeRatings.data);
			} catch (error) {
				console.error(error);
				setNotification({ message: 'Error fetching ratings', type: 'error' });
			}
		}

		fetchRatings();
	}, []);
	
	return (
	  <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
	    {ratings && ratings.length > 0 ? (
	    	<>
		    	<h3 className="text-xl font-semibold text-stone-800">Ratings</h3>
		      <div className="space-y-4">
		        {ratings.map((rating) => (
		          <div key={(rating as any).id} className="border-b border-gray-200 pb-4">
		            <h4 className="text-lg font-semibold text-stone-800">
		              {(rating as any).userFirstName} {(rating as any).userLastName}
		            </h4>
		            <p className="text-orange-500 font-bold">{(rating as any).rating}/5</p>
		            <p className="text-gray-600 italic">{(rating as any).comment}</p>
		          </div>
		        ))}
		      </div>
	      </>
	    ) : (
	      <p className="text-center text-gray-500">Be the first to rate this recipe!</p>
	    )}

	    <RatingForm recipeId={recipeId} />
	  </div>
	);

}

export default Ratings;
