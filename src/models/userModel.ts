import mongoose, { Document, Schema, Model } from "mongoose";

interface userTypes extends Document {
  gitHubId: string;
  name: string;
  username: string;
  email: string;
  image: string;
  bio?: string;
}
const userSchema: Schema<userTypes> = new Schema(
  {
    gitHubId: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    bio: { type: String },
  },
  { timestamps: true }
);

const User: Model<userTypes> =
  mongoose.models.User || mongoose.model<userTypes>("User", userSchema);

export default User;
