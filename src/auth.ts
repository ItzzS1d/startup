import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectToDB from "./lib/db";
import User from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user, profile }) {
      await connectToDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          gitHubId: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          profile: profile?.bio || "",
        });
      }

      return true;
    },

    // This is where we are adding the 'id' to the token.
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Log to check if the profile.id is present
        console.log("Profile ID from GitHub:", token);

        const user = await User.findOne({ gitHubId: profile.id });
        if (user) {
          token.id = user.id;  // Add the user ID to the token.
          console.log("Setting token.id:", token.id);
        }
      }
      return token;
    },

    // This is where we attach 'token.id' to the session object.
    async session({ session, token }) {
      // Log to check if token.id exists
      console.log("Session Token:", token);
      
      // Assign the token.id to the session
      if (token.id) {
        Object.assign(session , {id:token.id})
      }
      
      return session;
    },
  },
});
