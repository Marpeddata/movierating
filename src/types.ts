import { ObjectId } from "mongodb";

type Recipe = {
    id: ObjectId;
    name: string;
    description: string;
    ingredients: ObjectId[];
    category: ObjectId;
}

type Ingredient = {
    id: string;
    name: string;
    recipes: ObjectId[];
}

type Category = {
    id: string;
    name: string;
    recipes: ObjectId[];
}



export type { Recipe, Ingredient, Category };