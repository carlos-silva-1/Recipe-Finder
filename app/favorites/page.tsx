'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Notification from '../../components/Notification';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Recipe from '../../models/recipe';

const FavoritesPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/user/favorites');
        const data = await response.json();

        if (!response.ok)
          throw Error({ error: `HTTP error! Status: ${data.status}` });

        setRecipes(data.data);
      } catch (error) {
        console.error('Error fetching favorite recipes', error);
        setError('Error fetching favorite recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromList = async (recipe: Recipe) => {
    try {
      const response = await fetch('/api/user/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const responseData = await response.json();

      if (!response.ok)
        throw Error({ error: `${responseData.data}` });

      setNotification({ message: 'Recipe deleted successfully', type: 'success' });
      window.location.reload();
    } catch (error) {
      console.error('Error adding recipe:', error);
      setNotification({ message: 'Error deleting recipe', type: 'error' });
    }
  };

  if (status === 'unauthenticated')
    return (
      <div className="text-stone-800 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-8">
          You are not logged in. Please log in to view your favorite recipes.
        </h1>
      </div>
    )
  if (status === 'loading' || loading)
    return <Loading />;
  if (error)
    return <Error error={error} />;

  return (
    <div className="text-stone-800 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Your Favorite Recipes</h1>

      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {recipes.map((recipe) => (
            <div key={(recipe as any).recipeId} className="bg-white shadow-md rounded-lg p-6 text-center">
              <Link href={`/recipes/${(recipe as any).recipeId}`} className="text-xl font-semibold text-stone-800 hover:text-orange-500">
                {(recipe as any).title}
              </Link>
              <button
                onClick={() => handleRemoveFromList(recipe)}
                className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
              >
                Remove From Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl">You have no favorite recipes yet.</p>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;
