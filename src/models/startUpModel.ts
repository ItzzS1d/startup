import { StartupCardType } from "@/app/(root)/page";
import mongoose, { Document, Schema, Model, ObjectId } from "mongoose";

interface StartUpType {
  title: string;
  author: ObjectId;
  views: number;
  category: string;
  image: string;
  description: string;
  pitch: string;
}
const startUpSchema: Schema<StartUpType> = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: "User" },
  views: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  pitch: { type: String, required: true },
},{timestamps:true});

const Startup: Model<StartUpType> =
  mongoose.models.Startup ||
  mongoose.model<StartUpType>("Startup", startUpSchema);

export default Startup;
