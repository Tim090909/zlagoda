import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
 
  interface Session {
    user: {
        id: string
        role: string
    }& DefaultSession["user"]
  }
}