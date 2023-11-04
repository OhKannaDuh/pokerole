import Evolution from './Evolution';
import Height from './Height';
import Move from './Move';
import Weight from './Weight';

export interface Entry {
  Number: number;
  DexID: string;
  Name: string;
  Type1: string;
  Type2: string;
  BaseHP: number;
  Strength: number;
  MaxStrength: number;
  Dexterity: number;
  MaxDexterity: number;
  Vitality: number;
  MaxVitality: number;
  Special: number;
  MaxSpecial: number;
  Insight: number;
  MaxInsight: number;
  Ability1: string;
  Ability2: string;
  HiddenAbility: string;
  EventAbilities: string;
  RecommendedRank: string;
  GenderType: string;
  Legendary: boolean;
  GoodStarter: boolean;
  _id: string;
  DexCategory: string;
  Height: Height;
  Weight: Weight;
  DexDescription: string;
  Evolutions: Evolution[];
  Image: string;
  Moves: Move[];
}

export default Entry;
