import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { DefaultSession } from 'next-auth';

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
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (typeof (token.access_token) !== 'string' || typeof (token.id) !== 'string') {
        return session
      }
      session.accessToken = token.access_token;
      session.user.id = token.id;
      return session
    },
  }
})

export { handler as GET, handler as POST }
