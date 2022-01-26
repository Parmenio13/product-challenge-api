import { Schema, model, Document } from 'mongoose'
// Product ID, Average Review Score, Number of Reviews
export interface IProducts extends Document {
    productId: string;
    averageReviewScore: string;
    numberOfReviews: string;
};

const productSchema = new Schema({

    productId: {
        type: String,
        unique: true,
        required: true,
        min: 4,
    },
    averageReviewScore: {
        type: String,
        required: true,
    },
    numberOfReviews: {
        type: String,
        required: true
    }
});
export default model<IProducts>('Products', productSchema);