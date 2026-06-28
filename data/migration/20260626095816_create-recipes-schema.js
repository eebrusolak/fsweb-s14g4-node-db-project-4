/**
 * Migration çalıştırıldığında bu fonksiyon çalışır.
 * Tabloları oluşturur.
 */
exports.up = async function (knex) {

  // Tarifler tablosu
  await knex.schema.createTable("recipes", (tbl) => {
    tbl.increments("recipe_id"); // Otomatik artan Primary Key

    tbl
      .string("recipe_name") // Tarif adı
      .notNullable()         // Boş olamaz
      .unique();             // Aynı isim iki kez eklenemez

    tbl.timestamp("created_at") // Oluşturulma tarihi
      .defaultTo(knex.fn.now()); // Otomatik bugünün tarihi
  });

  // Tarif adımları tablosu
  await knex.schema.createTable("steps", (tbl) => {
    tbl.increments("step_id");

    tbl
      .integer("recipe_id")
      .unsigned()
      .notNullable()
      .references("recipe_id")   // recipes tablosundaki recipe_id'ye bağlanır
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.integer("step_number").notNullable(); // 1,2,3...
    tbl.string("instructions").notNullable(); // Yapılacak işlem
  });

  // Malzemeler tablosu
  await knex.schema.createTable("ingredients", (tbl) => {
    tbl.increments("ingredient_id");

    tbl
      .string("ingredient_name")
      .notNullable()
      .unique(); // Aynı malzeme tekrar eklenmesin
  });

  // Ara tablo
  await knex.schema.createTable("step_ingredients", (tbl) => {

    tbl
      .integer("step_id")
      .unsigned()
      .notNullable()
      .references("step_id")
      .inTable("steps")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("ingredient_id")
      .unsigned()
      .notNullable()
      .references("ingredient_id")
      .inTable("ingredients")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    // Malzeme miktarı
    tbl.float("quantity").notNullable();

    // Aynı malzeme aynı adımda sadece bir kez bulunabilir.
    tbl.primary(["step_id", "ingredient_id"]);
  });

};

/**
 * Migration geri alınırsa bu fonksiyon çalışır.
 * Tabloları siler.
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("step_ingredients");
  await knex.schema.dropTableIfExists("ingredients");
  await knex.schema.dropTableIfExists("steps");
  await knex.schema.dropTableIfExists("recipes");
};