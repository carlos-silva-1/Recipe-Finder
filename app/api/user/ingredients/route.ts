import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '../../../../models/user';
import ExtendedUser from '../../../../types/extendedUser';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) 
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);

    if (!user)
      return NextResponse.json({ data: 'User not found' }, { status: 404 });

    return NextResponse.json({ data: user.ingredients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user ingredients:', error);
    return NextResponse.json({ data: 'Error fetching user ingredients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user)
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);
    const ingredient = await req.json();

    if (!user || !ingredient)
      return NextResponse.json({ data: 'User or Ingredient not found' }, { status: 404 });

    if(user.ingredients)
      user.ingredients = user.ingredients.concat(`${ingredient}; `);
    else
      user.ingredients = `${ingredient}; `;

    await user.save();

    return NextResponse.json({ data: 'Ingredient added successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Error adding ingredient' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user)
    return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    const user = (await User.findOne({ where: { email: session.user.email } }) as ExtendedUser);
    const { ingredient } = await req.json();

    if(user.ingredients)
      user.ingredients = user.ingredients.replace(`${ingredient}; `, '');
    await user.save();

    return NextResponse.json({ data: 'Ingredient removed successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Error removing ingredient' }, { status: 500 });
  }
}
