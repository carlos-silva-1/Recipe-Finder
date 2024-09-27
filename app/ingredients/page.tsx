'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Notification from '../../components/Notification';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Link from 'next/link';

const IngredientsListPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/user/ingredients');
        const data = await response.json();

        if(!response.ok)
          throw Error({ error: `${data.data}` });

        let ingredientsArray = data.data.split("; ");
        ingredientsArray.pop();
        setIngredients(ingredientsArray);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setError('Error fetching ingredients');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleRemoveFromList = async (ingredient: string) => {
    try {
      const response = await fetch('/api/user/ingredients', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredient }),
      });

      const responseData = await response.json();

      if (!response.ok)
        throw Error({ error: `${responseData.data}` });

      setNotification({ message: 'Ingredient removed successfully', type: 'success' });
      window.location.reload();
    } catch (error) {
      console.error('Error removing ingredient:', error);
      setNotification({ message: 'Error removing ingredient', type: 'success' });
    }
  };

  if (status === 'unauthenticated')
    return (
      <div className="text-stone-800 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-8">
          You are not logged in. Please log in to view your ingredients.
        </h1>
      </div>
    )
  if (status === 'loading' || loading)
    return <Loading />;
  if (error)
    return <Error error={error} />;

  return (
    <div className="text-stone-800 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Your Ingredients</h1>

      {ingredients && <>
        {ingredients.length > 0 ? (
          <>
            <Link href="/search">
              <button className="text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 text-xl">
                Search Recipes With These Ingredients
              </button>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 mt-10">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-3 text-center">
                  <span className="text-xl font-semibold text-stone-800 block capitalize">
                    {ingredient}
                  </span>
                  <button 
                    onClick={() => handleRemoveFromList(ingredient)}
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                  >
                    Remove From List
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>You have no ingredients recipes yet.</p>
        )}
      </>}

      {notification && <>
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      </>}
    </div>
  );
};

export default IngredientsListPage;
