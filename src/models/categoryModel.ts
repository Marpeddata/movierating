import mongoose from 'mongoose';
import { Category } from '../types';

const categorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
    }
},{
    collection: "categories"
});


const categoryModel = mongoose.model<Category>('Category', categorySchema);

export default categoryModel;