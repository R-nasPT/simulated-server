import { Schema, Document, model } from "mongoose";

export type IHero = Document & {
  name: string;
  real_name: string;
  powers: string[];
  affiliation: string;
  age: number;
  status: boolean;
  appearance: {
    height: number;
    weight: number;
  };
  universe: string;
};

const heroesSchema = new Schema({
  name: String,
  real_name: String,
  powers: [String],
  affiliation: String,
  age: Number,
  status: Boolean,
  appearance: {
    height: Number,
    weight: Number,
  },
  universe: String,
});

const HeroModel = model<IHero>("hero_collections", heroesSchema);

export default HeroModel;
