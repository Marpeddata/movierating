import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
import { Recipe } from '../types';
import ingredientModel from './ingredientModel';

const recipeSchema = new mongoose.Schema<Recipe>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
},{
    collection: "recipes"
});


const RecipeModel = mongoose.model<Recipe>('Recipe', recipeSchema);

export default RecipeModel;