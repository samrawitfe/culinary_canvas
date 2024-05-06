import React from "react";
import Image from "next/image";
import { Heart, MessageCircleMore } from "lucide-react";
import { chefType, recipeType } from "@/app/schema/recipe";
import { Button } from "./button";
import Link from "next/link";
import { getChef } from "@/lib/actions";

export const returnChef = async (id: number) => {
  const chef = await getChef(id);
  return chef as chefType;
};

const Recipy_card = async ({ recipe }: { recipe: recipeType }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-5 rounded-lg text-white bg-black flex flex-col gap-3 border-4 border-transparent hover:border-pink-400">
        {/* border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-auto */}
        {/* {JSON.stringify(recipe)} */}
        <div className="flex justify-center items-center">
          <Image
            src={
              "https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?cs=srgb&dl=pexels-pixabay-434258.jpg&fm=jpg&_gl=1*ngbhgn*_ga*NTEyNTc1MDMxLjE3MTQ2OTUwOTQ.*_ga_8JE65Q40S6*MTcxNDY5NTA5NC4xLjEuMTcxNDY5NTE5NC4wLjAuMA.."
            }
            alt=""
            width={300}
            height={100}
            className="w-100 h-48 rounded-xl shadow-md shadow-indigo-500"
          />
        </div>
        <h2 className="font-bold text-pink-500">{recipe.name}</h2>

        {/* DESCRIPTION */}
        <div>{recipe.description.slice(1, 100)}...</div>

        {/* CHEF */}
        <div className="flex justify-between items-center">
          <div className=" flex items-center gap-3">
            <Image
              src={"/noavatar.png"}
              alt=""
              width={10}
              height={30}
              className="rounded-full w-12 h-12"
            />{" "}
            <span className="text-gray-500">
              {(await returnChef(recipe.chefId)).username}
            </span>
          </div>
          <div>{recipe.countryOfOrigin.slice(0, 3).toUpperCase()}</div>
        </div>

        {/* SOCIALS */}

        <div className="flex justify-around">
          <div className="text-red-500 flex gap-2">
            <Heart /> 12
          </div>
          <div className="text-indigo-500 flex gap-2">
            <MessageCircleMore /> 22
          </div>
        </div>
      </div>
      {/* <button className="w-fit p-4 rounded-lg bg-pink-500 text-white border-white text-lg">
    View Details
  </button> */}
      <Button>
        <Link href={`/recipies/${recipe.id}}`}>Explore Me</Link>
      </Button>
    </div>
  );
};

export default Recipy_card;
