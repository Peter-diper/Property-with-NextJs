import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on seccessful signin
    async signIn({ profile }) {
      // conncet to data base
      // check if usrer exsist
      // if not, then add user to database
      // return true to allow sign in
    },
    // modifies te session object
    async session({ session }) {
      //  get user from data base
      // assign the user id to the session
      // return session
    },
  },
};
