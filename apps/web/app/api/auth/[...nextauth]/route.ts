import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { DefaultSession } from 'next-auth';
import db from '@repo/db'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
    };
    accessToken: string
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      await db.user.upsert({
        where: {
          userId: user.id
        },
        update: {
          access_token: account?.access_token
        },
        create: {
          userId: user.id,
          //@ts-ignore
          access_token: account?.access_token
        }
      })
      return true
    },
    jwt: async ({ token, account, profile }) => {
      const user = await db.user.findFirst({
        where: {
          userId: token.sub
        }
      })
      if (user?.access_token) token.access_token = user.access_token;
      return token;
    },
    session: async ({ session, token }) => {
      const user = await db.user.findFirst({
        where: {
          userId: token.sub
        }
      })
      if (user?.access_token) session.accessToken = user.access_token;
      //@ts-ignore
      session.user.id = token.sub;
      return session
    },
  }
})

export { handler as GET, handler as POST }
