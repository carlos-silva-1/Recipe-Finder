import { fetchWrapper } from './util';

export async function getRecipeInstructionsById(id: string) {
  const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`

  return fetchWrapper(url);
}
