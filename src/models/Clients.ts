import { Schema, model, Document, Model } from 'mongoose';

export interface IClient extends Document {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Clients: Model<IClient> = model('Client', ClientSchema);

export default Clients;
