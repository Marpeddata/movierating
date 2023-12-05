import {Recipe} from '../types';
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
import RecipeModel from '../models/recipeModel';
import ingredientModel from '../models/ingredientModel';

export default {
    hello: () => 'Hello World!',
    recipes: async () => {
        const recipes = await RecipeModel.find().populate('ingredients');
        return recipes;
    },
    //the argument list takes: async (parent, args, context) args is the id, if only the args arguemtn is needed, the parent still needs to be parsed. _:any is a common way to state that the parent arguemtn is not needed, while still defining it.
    //Had issues with this syntax for a few hours since I was trying to pass async (id: String) leaving the return on the query as "undefined".
    recipe: async (_:any, {id}:ObjectId) => {
        console.log(id);
        const reci = await RecipeModel.findById(id).populate('ingredients');
        return reci;
    },
    ingredients: async () => {
        const ingredients = await ingredientModel.find().populate('recipes');
        return ingredients;
    },
    ingredient: async (_:any, {id}:ObjectId) => {
        const ingredient = await ingredientModel.findById(id).populate('recipes');
        return ingredient;
    },
    

    
}