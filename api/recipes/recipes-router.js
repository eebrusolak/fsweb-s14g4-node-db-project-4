const router = require("express").Router();

const Recipes = require("./recipes-model");

router.get("/:recipe_id", async (req, res, next) => {
    try {
        const {recipe_id} = req.params;

        const recipe = await Recipes.idyeGoreTarifGetir(recipe_id);

        if(!recipe) {
            return res.status(404).json({
                message: "Recipe not found",

            })
        }
        res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
})

module.exports = router