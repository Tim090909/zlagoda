import { getUserPass } from "@/actions/get_user";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
    /*pages: {
        signIn: "/auth/login"
    },*/
    callbacks: {
        async session({ session}) {
            if(session?.user?.name){
            const user = await getUserPass(session?.user?.name);
            session.user.role = user[0].emplRole;
            session.user.id = user[0].emplId;
        }
          return session;
        }
      },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your username" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            async authorize(credentials, req) {
                
                if(credentials?.username){
                    const res = await getUserPass(credentials.username);

                    const user = res[0];
                    //console.log(credentials?.username)
                    const hashedPassword = user.password;
                    //const hashedPassword = await hashPassword(credentials.password);
                    //console.log(password)
                    //console.log(hashedPassword)
                    //console.log(credentials.password);
                    const passMatch = await bcrypt.compare(credentials.password, hashedPassword);
                    if(user && passMatch){
                        //console.log("okk")
                        return{
                            id: user.emplId,
                            name: user.username,
                        }
                    }

                }

                return null
              }
        })
    ],
}