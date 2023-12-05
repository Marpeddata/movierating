import mongoose from 'mongoose';
import { Ingredient } from '../types';

const ingredientSchema = new mongoose.Schema<Ingredient>({
    name: {
        type: String,
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
},{
    collection: "ingredients"
});


const ingredientModel = mongoose.model<Ingredient>('Ingredient', ingredientSchema);

export default ingredientModel;