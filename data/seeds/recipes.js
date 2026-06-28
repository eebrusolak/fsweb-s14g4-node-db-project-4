exports.seed = async function(knex) {
  await knex("step_ingredients").del();
  await knex("ingredients").del();
  await knex("steps").del();
  await knex("recipes").del();

  await knex("recipes").insert([
    {
      recipe_id: 1,
      recipe_name: "Menemen",
    },
    {
      recipe_id: 2,
      recipe_name: "Omlet",
    }
  ])

  await knex("steps").insert([
    {
      step_id: 1,
      recipe_id: 1,
      step_number: 1,
      instructions: "Tavayı Isıt",
    },

    {
      step_id: 2,
      recipe_id: 1,
      step_number: 2,
      instructions: "Zeytinyağını ekle",
    },

    {
      step_id: 3,
      recipe_id: 2,
      step_number: 1,
      instructions: "Yumurtayı çırp",
    },
  ]);

  await knex("ingredients").insert([
    {
      ingredient_id: 1,
      ingredient_name: "Yumurta",
    },
    {
      ingredient_id:2,
      ingredient_name: "Domates",
    },
    {
      ingredient_id: 3,
      ingredient_name: "Zeytinyağı",
    },
  ]);

  await knex("step_ingredients").insert([
    {
      step_id: 2,
      ingredient_id: 3,
      quantity: 1,
    },
    {
      step_id: 3,
      ingredient_id: 1,
      quantity: 2,
    },
  ])

}