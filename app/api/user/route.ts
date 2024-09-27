import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '../../../models/user';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) 
  	return NextResponse.json({ data: 'Unauthorized' }, { status: 401 });

  try {
    let users;
    if(req.headers.get("UserId")) {
      users = await User.findOne({ 
        where: { id: req.headers.get("UserId") },
        attributes: ['firstName', 'lastName']
      });
    }
    else if(req.headers.get("UserEmail")) {
      users = await User.findOne({ 
        where: { email: req.headers.get("UserEmail") },
        attributes: ['firstName', 'lastName']
      });
    }
    else {
      users = await User.findAll({ attributes: ['firstName', 'lastName'] });
    }

    if (!users) {
      return NextResponse.json({ data: 'Users not found' }, { status: 404 });
    }

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ data: 'Internal server error fetching users' }, { status: 500 });
  }
}
