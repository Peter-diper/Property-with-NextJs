import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/db";
import User from "@/models/Users";

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
      await connectDB();
      // check if usrer exsist
      const userExists = await User.findOne({ email: profile.email });
      // if not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // return true to allow sign in
      return true;
    },
    // modifies te session object
    async session({ session }) {
      //  get user from data base
      const user = await User.findOne({ email: session.user.email });
      // assign the user id to the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
