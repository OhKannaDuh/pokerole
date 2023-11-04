export interface MoveEntry {
  Name: string;
  Type: string;
  Power: number;
  Damage1: string;
  Damage2: string;
  Accuracy1: string;
  Accuracy2: string;
  Target: string;
  Effect: string;
  Description: string;
  _id: string;
  Attributes?: Attributes;
  AddedEffects?: AddedEffects;
  Category: string;
}

export interface AddedEffects {
  Heal?: Heal;
  StatChanges?: StatChange[];
  Ailments?: Ailment[];
  AilmentHeal?: string[];
  FixedDamage?: FixedDamage;
  TerrainEffect?: string;
  IgnoreShield?: boolean;
}

export interface Ailment {
  Type: string;
  Affects: string;
  ChanceDice?: number;
  Rounds?: number;
  TargetType?: string;
}

export interface FixedDamage {
  Type: string;
  Value?: number;
  Target: string;
  MaxValue?: number;
}

export interface Heal {
  Type: string;
  Percentage?: number;
  Target: string;
  WillPointCost?: number;
}

export interface StatChange {
  Stats: string[];
  Stages: number;
  Affects: string;
  ChanceDice?: number;
}

export interface Attributes {
  Priority?: number;
  NeverFail?: boolean;
  HighCritical?: boolean;
  Lethal?: boolean;
  SwitcherMove?: boolean;
  PhysicalRanged?: boolean;
  BlockDamagePool?: number;
  AccuracyReduction?: number;
  SuccessiveActions?: boolean;
  ShieldMove?: boolean;
  Charge?: boolean;
  MustRecharge?: boolean;
  DoubleAction?: boolean;
  SoundBased?: boolean;
  Recoil?: boolean;
  DestroyShield?: boolean;
  FistBased?: boolean;
  IgnoreDefenses?: boolean;
  ResetTerrain?: boolean;
  UserFaints?: boolean;
  IgnoreShield?: boolean;
  AlwaysCrit?: boolean;
  Rampage?: boolean;
  ResistedWithDefense?: boolean;
}
