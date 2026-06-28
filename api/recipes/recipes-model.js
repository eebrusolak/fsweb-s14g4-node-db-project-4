const db = require("../../data/db-config");



async function idyeGoreTarifGetir(recipe_id) {
    const recipe = await db("recipes")
        .where("recipe_id", recipe_id)
        .first();

        if(!recipe) return null;

        const steps = await db("steps")
            .where("recipe_id", recipe_id)
            .orderBy("step_number");


        for(const step of steps) {
            step.ingredients = await db("step_ingredients")
                .join(
                    "ingredients",
                    "step_ingredients.ingredient_id",
                    "=",
                    "ingredients.ingredient_id",
                )
                .select(
                    "ingredients.ingredient_id",
                    "ingredients.ingredient_name",
                    "step_ingredients.quantity",

                )
                .where("step_ingredients.step_id", step.step_id);
        }

        recipe.steps = steps;

        return recipe;
}




module.exports = {
    idyeGoreTarifGetir,
}