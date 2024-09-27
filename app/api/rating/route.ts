import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '../../../models/user';
import Rating from '../../../models/rating';
import Recipe from '../../../models/recipe';
import ExtendedUser from '../../../types/extendedUser';

export async function GET(req: NextRequest) {
  try {
    const recipeRatings = req.headers.get("RecipeId")?
      await Rating.findAll({ where: { recipeId: req.headers.get("RecipeId") } })
      :
      await Rating.findAll();

    if (!recipeRatings)
      return NextResponse.json({ data: 'Ratings not found' }, { status: 404 });

    return NextResponse.json({ data: recipeRatings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipe ratings:', error);
    return NextResponse.json({ data: 'Server error occurred when fetching recipe ratings.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user)
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const requestBody = await req.json();
    
    const rating = requestBody.rating;
    const comment = requestBody.comment;
    const recipeId = Number(requestBody.recipeId);
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);
    let userId;
    if(user && user.id)
      userId = user.id;

    const newRating = await Rating.create({ rating, comment, userId, recipeId });

    return NextResponse.json({ data: 'Rating added successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Server error occurred when adding rating.' }, { status: 500 });
  }
}
