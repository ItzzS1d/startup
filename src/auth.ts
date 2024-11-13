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
        console.log(token.sub);
        const user = await User.findOne({ gitHubId: token.sub });
        console.log("user" , user);
        if (user) {
          token.id = user.gitHubId; // Add the user ID to the token.
        }
      }
      return token;
    },

    // This is where we attach 'token.id' to the session object.
    async session({ session, token }) {
      // Log to check if token.id exists
      // Assign the token.id to the session
      if (token.id) {
        Object.assign(session, { id: token.jti });
      }

      return session;
    },
  },
});
