import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser)
      return NextResponse.json({ data: 'Email already in use' }, { status: 400 });

    const newUser = await User.create({ firstName, lastName, email, password });

    return NextResponse.json({ data: 'User Registered Successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: 'Internal Server Error' }, { status: 500 });
  }
}
