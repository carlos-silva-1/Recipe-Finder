'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Notification from '../../components/Notification';
import { searchIngredient, searchRecipe, searchCustomRecipes, dataTypeFunctionDictionary } from '../../api/search';
import Link from 'next/link';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchData = async (dataType: string) => {
      try {
        const appropriateFunction = dataTypeFunctionDictionary[dataType.toLowerCase()];
        const response = await appropriateFunction(query);
        const responseData = await response.json();

        if(!response.ok)
          throw Error({ error: `Error fetching data: ${responseData.data}` });
        
        if(dataType.toLowerCase() === "ingredient")
          setIngredients(responseData.data.results);
        else 
          setRecipes(responseData.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    }

    const fetchResults = async () => {
      await fetchData("ingredient");
      await fetchData("recipe");
      setLoading(false);
    };

    const fetchCustomRecipes = async () => {
      try {
        const recipeResults = await searchCustomRecipes();
        const recipeResultsData = await recipeResults.json();

        if(!recipeResults.ok)
          throw Error({ error: `${recipeResultsData.data}` });

        setRecipes(recipeResultsData.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Error fetching recipes');
      } finally {
        setLoading(false);
      }
    }

    if (query)
      fetchResults();
    if (!query) // If search button is pressed with no seach query, a search based on the user's ingredients is done
      fetchCustomRecipes();
  }, [query]);

  const handleAddIngredientToList = async (ingredient: { id: number, name: string, image: string }) => {
    try {
      const response = await fetch('/api/user/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient.name),
      });

      const data = await response.json();

      if (!response.ok)
        throw Error({ error: `${data.data}` });

      setNotification({ message: 'Ingredient added successfully', type: 'success' });
    } catch (error) {
      console.error('Error adding ingredient:', error);
      setNotification({ message: 'Error adding ingredient', type: 'error' });
    }
  };

  const handleAddRecipeToFavorites = async (recipe: { id: number, title: string, image: string, imageType: string }) => {
    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      if (!response.ok)
        throw Error({ error: `${data.data}` });

      setNotification({ message: 'Recipe added successfully', type: 'success' });
    } catch (error) {
      console.error('Error adding recipe:', error);
      setNotification({ message: 'Error adding recipe', type: 'error' });
    }
  };

  if (loading)
    return <Loading />;
  if (error)
    return <Error error={error} />;

  return (
    <div className="min-h-screen text-stone-800 p-6">
      {query ? (
        <h1 className="text-3xl font-bold mb-6 text-center">Search Results for "{query}"</h1>
      ) : null}

      {/* Ingredients Section */}
      {ingredients ? (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Ingredients</h3>
          {ingredients.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredients.map((item) => (
                <li key={(item as any).name} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
                  <span className="font-medium capitalize">{(item as any).name}</span>
                  <button
                    onClick={() => handleAddIngredientToList(item)}
                    className="ml-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Add To List
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No ingredients found.</p>
          )}
        </div>
      ) : null}

      {/* Recipes Section */}
      {recipes ? (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Recipes</h3>
          {recipes.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((item) => (
                <li key={(item as any).title} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
                  <Link href={`/recipes/${(item as any).id}`} className="font-medium text-orange-600 hover:underline">
                    {(item as any).title}
                  </Link>
                  <button
                    onClick={() => handleAddRecipeToFavorites(item)}
                    className="ml-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Add To Favorites
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No recipes found.</p>
          )}
        </div>
      ) : null}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4">
          <Notification
            message={notification.message}
            type={notification.type}
            duration={3000}
            onClose={() => setNotification(null)}
          />
        </div>
      )}
    </div>
  );
};

const SearchWrapper: React.FC = () => {
  return (
    <Suspense>
      <SearchResultsPage/>
    </Suspense>
  )
}

export default SearchWrapper;
