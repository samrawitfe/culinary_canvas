import { NewRecipe, insertRecipeSchema } from "@/db/schema/recipe";
import { createRecipe } from "@/server/recipe";
import { revalidatePath } from "next/cache";

import { readRecipes } from "@/server/recipe";

export const dynamic = "force-dynamic";
export const GET = async () => {
  try {
    const allRecipes = await readRecipes();
    return Response.json(allRecipes);
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const request = insertRecipeSchema.parse(body);
    const recipe: NewRecipe = {
      name: request.name,
      description: request.description,
      benefit: request.benefit,
      preparation: request.preparation,
      activeIngredient: request.activeIngredient,
      category: request.category,
      countryOfOrigin: request.countryOfOrigin,
      calories: request.calories,
      cookingTime: request.cookingTime,
      chefId: request.chefId,
      image_url: request.image_url,
    };

    const newRecipe = await createRecipe(recipe);
    if (!newRecipe)
      return Response.json({ error: "Recipe already exists" }, { status: 409 });
    revalidatePath("/api/recipes");
    return Response.json(newRecipe, { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
