import { fetchWrapper } from './util';
import { NextResponse } from 'next/server';

const searchIngredient = async (searchValue: string, numberOfResults: number = 0) => {
  const url = numberOfResults !== 0?
  `https://api.spoonacular.com/food/ingredients/search?query=${searchValue}&number=${numberOfResults}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
  :
  `https://api.spoonacular.com/food/ingredients/search?query=${searchValue}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`

  return fetchWrapper(url);
}

const searchRecipe = async (searchValue: string, numberOfResults: number = 0) => {
  const url = numberOfResults !== 0?
  `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&number=${numberOfResults}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
  :
  `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`

  return fetchWrapper(url);
}

const buildCustomSearchQuery = (ingredientList: string) => {
  let ingredientsArray = ingredientList.split("; ");
  ingredientsArray.pop();
  
  let formattedSeachQuery = "";
  for(let i = 0; i < ingredientsArray.length-1; i++)
    formattedSeachQuery += `${ingredientsArray[i]},+`;
  formattedSeachQuery += `${ingredientsArray[ingredientsArray.length-1]}`;

  return formattedSeachQuery;
}

const searchCustomRecipes = async (numberOfResults: number = 0) => {
  try {
    const userIngredients = await fetchWrapper('/api/user/ingredients');
    const userIngredientsJson = await userIngredients.json();

    if(!userIngredients.ok)
      throw new Error(`Error! ${userIngredientsJson.data}`);

    const formattedUserIngredients = buildCustomSearchQuery(userIngredientsJson.data.data);

    const url = numberOfResults !== 0?
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedUserIngredients}&number=${numberOfResults}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
    :
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedUserIngredients}&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`

    return fetchWrapper(url);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

const dataTypeFunctionDictionary: { [key: string]: any } = {
  "ingredient": searchIngredient,
  "recipe": searchRecipe,
};

export { searchIngredient, searchRecipe, searchCustomRecipes, dataTypeFunctionDictionary }
