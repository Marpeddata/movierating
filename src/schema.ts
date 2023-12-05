const typeDefs = `#graphql
type Recipe {
        id: ID!
        name: String!
        description : String!
        category: Category
        ingredients: [Ingredient!] 

    }

type Ingredient {
        id: ID!
        name: String!
        recipes: [Recipe!] 
    } 
    
type Category {
    id: ID!
    name: String!
    recipes: [Recipe!] 
    }

    
type Query {
    hello: String
    recipes: [Recipe!]!
    categories: [Category!]!
    ingredients: [Ingredient!]!
    recipe(id: ID!): Recipe
    ingredient(id: ID!): Ingredient
    category(id: ID!): Category

    }

type Mutation {
    createRecipe(name: String!, description: String!, ingredients: [ID!]): Recipe
    createIngredient(name: String!): Ingredient
    deleteRecipe(id: ID!): Boolean
}

`;

export default typeDefs;