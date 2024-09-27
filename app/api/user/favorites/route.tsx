import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '../../../../models/user';
import Recipe from '../../../../models/recipe';
import UserRecipe from '../../../../models/userRecipe';
import ExtendedUser from '../../../../types/extendedUser';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) 
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({
      where: { email: session.user.email },
      include: [{ model: Recipe, as: 'recipes' }],
    }) as any);

    if (!user)
      return NextResponse.json({ data: 'User not found' }, { status: 404 });

    return NextResponse.json({ data: user.recipes }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ data: 'Internal server error fetching favorite recipes.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user)
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);
    const recipe = await req.json();

    if (!user || !recipe)
      return NextResponse.json({ data: 'User or Recipe not found' }, { status: 404 });

    const newRecipe = (await Recipe.create({ recipeId: recipe.id, title:recipe.title }) as any);
    const newUserRecipe = await UserRecipe.create({ userId: user.id, recipeId: newRecipe.recipeId });

    return NextResponse.json({ data: 'Recipe added successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Internal server error adding recipe' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user)
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);
    const recipe = await req.json();

    if (!user || !recipe)
      return NextResponse.json({ data: 'User or Recipe not found' }, { status: 404 });
    
    const recipeToBeDeleted = await Recipe.findOne({ where: { recipeId: recipe.recipeId } });
    const userRecipeToBeDeleted = await UserRecipe.findOne({ where: { userId: user.id, recipeId: recipe.recipeId } });
    
    if(recipeToBeDeleted && userRecipeToBeDeleted) {
      await recipeToBeDeleted.destroy();
      await userRecipeToBeDeleted.destroy();
    }

    return NextResponse.json({ data: 'Recipe deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Internal server error deleting recipe' }, { status: 500 });
  }
}