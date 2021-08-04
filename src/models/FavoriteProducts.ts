import { Schema, model, Document, Model, Types } from 'mongoose';

export interface IFavoriteProduct extends Document {
  id?: string;
  client?: string;
  productId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  preview?: string;
}

const FavoriteProductSchema = new Schema(
  {
    client: {
      type: Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FavoriteProducts: Model<IFavoriteProduct> = model('FavoriteProduct', FavoriteProductSchema);

export default FavoriteProducts;
