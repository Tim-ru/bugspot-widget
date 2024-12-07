import { Schema, model, Document } from "mongoose";

interface IReport extends Document {
  message: string;
  url: string;
  userAgent: string;
  createdAt: Date;
}

const reportSchema = new Schema<IReport>({
  message: { type: String, required: true },
  url: { type: String, required: true },
  userAgent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Report = model<IReport>("Report", reportSchema);
export default Report;
