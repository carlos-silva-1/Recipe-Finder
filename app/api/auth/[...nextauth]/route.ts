import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import SequelizeAdapter from '@auth/sequelize-adapter';
import bcrypt from 'bcrypt';
import User from '../../../../models/user';
import sequelize from '../../../../lib/sequelize';
import ExtendedUser from '../../../../types/extendedUser';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Missing email or password');

        try {
          const user = (await User.findOne({ where: { email: credentials.email } }) as any);

          if (!user)
            return null;

          const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
          if (!isValidPassword)
            return null;

          return { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
        } catch (error) {
          console.error('Error during authorization', error);
          return null;
        }
      }
    })
  ],
  adapter: (SequelizeAdapter(sequelize) as any),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      const user = await User.findOne({ where: { id: token.id } });
      if (user && session && session.user) {
        const extendedUser = session.user as ExtendedUser;
        extendedUser.id = (user as ExtendedUser).id;
        extendedUser.email = (user as ExtendedUser).email;
        extendedUser.firstName = (user as ExtendedUser).firstName;
        extendedUser.lastName = (user as ExtendedUser).lastName;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
