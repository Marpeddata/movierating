import {Recipe, Ingredient} from '../types';
import { ObjectId } from "mongodb";
import RecipeModel from '../models/recipeModel';
import IngredientModel from '../models/ingredientModel';

export default {
    createRecipe: async (_parrent:any, args:Recipe) => {
        console.log(args);
         const newRecipe = new RecipeModel({
            id: new ObjectId(),
            name: args.name,
            description: args.description,
            ingredients: args.ingredients,
        });
        console.log(newRecipe);

        args.ingredients.forEach(async (ingredient) => {
            const ing = await IngredientModel.findOne({_id: ingredient});
            ing?.recipes.push(newRecipe.id);
            ing?.save();
        })

        await newRecipe.save();
        return newRecipe.populate('ingredients');
    },
    createIngredient: async (_parrent:any, args:Ingredient) => {
        console.log(args);
        const newIngredient = new IngredientModel({
            name: args.name,
        });
        console.log(newIngredient);
        await newIngredient.save();
        return newIngredient.populate('recipes');
    },
    deleteRecipe: async (_:any, {id}:ObjectId) => {

        if(await RecipeModel.findById(id)){
        const recipe = await RecipeModel.findById(id);
        if(recipe?.ingredients.length !== -1){
        recipe?.ingredients.forEach(async (ingredient) => {
            const ing = await IngredientModel.findOne({_id: ingredient});
            ing?.recipes.splice(ing?.recipes.indexOf(recipe.id), 1);
            ing?.save();

        });
        } else {
        
        }
        await RecipeModel.findByIdAndDelete(recipe?.id)
        return true;
        } else {
            return false;
        }
    }
}

