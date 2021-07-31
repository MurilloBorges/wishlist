import { Schema, model, Document, Model, Types } from 'mongoose';
import { IClient } from './Clients';

export interface IFavoriteProduct extends Document {
  id: string;
  client: IClient;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteProductSchema = new Schema(
  {
    client: {
      type: Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const FavoriteProduct: Model<IFavoriteProduct> = model(
  'FavoriteProduct',
  FavoriteProductSchema,
);
