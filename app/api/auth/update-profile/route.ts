import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/user';
import { getServerSession } from 'next-auth';
import ExtendedUser from '../../../../types/extendedUser';

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession();
    if(!session || !session.user)
      return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

    const { firstName, lastName, email, password } = await req.json();

    if (email && email !== session.user.email) 
      return NextResponse.json({ data: 'You can only update your own profile' }, { status: 403 });

    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return NextResponse.json({ data: 'User not found' }, { status: 404 });

    if (firstName) (user as ExtendedUser).firstName = firstName;
    if (lastName) (user as ExtendedUser).lastName = lastName;
    if (email) (user as ExtendedUser).email = email;
    if (password) (user as ExtendedUser).password = password; // password is hashed at sequelize's beforeUpdate hook at user model's definition file

    await user.save();
    return NextResponse.json({ data: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Internal Server Error' }, { status: 500 });
  }
}
