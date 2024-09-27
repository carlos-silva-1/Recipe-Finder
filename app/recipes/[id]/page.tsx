import React from 'react';
import { getRecipeInstructionsById } from '../../../api/recipe';
import Ratings from '../../../components/Ratings';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

interface Recipe {
  steps: {
    number: number;
    step: string;
    ingredients: { id: number; name: string }[];
    equipment: { id: number; name: string; temperature?: { number: number; unit: string } }[];
    length?: { number: number; unit: string };
  }[];
}

export default async function RecipeDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await getRecipeInstructionsById(id);
  const recipe = (await res.json()).data[0];

  if (!res.ok) {
    return <Error error="Error fetching recipe" />;
  }

  if (!recipe || recipe.steps.length === 0) {
    return (
      <div className="text-stone-800 flex flex-col items-center py-10">
        <h1 className="text-2xl font-semibold mb-8">No steps have been written for this recipe yet.</h1>
      </div>
    );
  }

  return (
    <div className="text-stone-800 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Recipe Steps</h1>
      <ol className="list-decimal pl-4">
        {recipe.steps.map((step: Recipe['steps'][number]) => (
          <li key={step.number} className="mb-4">
            <p className="text-lg">{step.step}</p>

            {step.ingredients.length > 0 && (
              <>
                <h3 className="text-lg mt-2">Ingredients:</h3>
                <div className="list-disc grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                  {step.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="bg-white shadow-md rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.name}.jpg`}
                          alt="Image Unavailable"
                          className=""
                        />
                        <span className="block font-bold uppercase">{ingredient.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step.equipment.length > 0 && (
              <>
                <h3 className="text-lg mt-2">Equipment:</h3>
                <div className="list-disc grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
                  {step.equipment.map((equipment) => (
                    <div key={equipment.id} className="bg-white shadow-md rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://img.spoonacular.com/equipment_100x100/${equipment.name}.jpg`}
                          alt="Image Unavailable"
                          className=""
                        />
                        <span className="block font-bold uppercase">{equipment.name}</span>
                        {equipment.temperature && (
                          <span>
                            : {equipment.temperature.number}°{equipment.temperature.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {step.length && (
              <p className="mt-2">
                Time required: {step.length.number} {step.length.unit}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div>
        <Ratings recipeId={id} />
      </div>
    </div>
  );
}
