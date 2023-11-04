<template>
  <q-card style="padding: 0 0 12px 24px">
    <q-card-section class="q-pa-none">
      <p class="text" v-text="`Category: ${move.Category}`" />
      <p class="text" v-text="move.Description" />
      <p class="text" v-if="move.Effect && move.Effect !== '-'" v-text="`Effect: ${move.Effect}`" />
      <p class="text">
        <span>Type: <span v-text="move.Type" :class="`type-text type-${move.Type}`" /></span>
      </p>

      <p class="text" v-text="`Power: ${move.Power}`" />
    </q-card-section>

    <q-card-section v-if="move.Damage1" class="q-pa-none">
      <p class="text">
        Damage: <span :class="`type-text type-${move.Damage1}`" v-text="move.Damage1" />

        <template v-if="move.Damage2">
          &
          <span :class="`type-text type-${move.Damage2}`" v-text="move.Damage2" />
        </template>
      </p>
    </q-card-section>

    <q-card-section v-if="move.Accuracy1" class="q-pa-none">
      <p class="text">
        Accuracy: <span :class="`type-text type-${move.Accuracy1}`" v-text="move.Accuracy1" />

        <template v-if="move.Accuracy2">
          &
          <span :class="`type-text type-${move.Accuracy2}`" v-text="move.Accuracy2" />
        </template>
      </p>
    </q-card-section>

    <q-card-section class="q-pa-none">
      <p class="text" v-text="`Target: ${move.Target}`" />
    </q-card-section>

    <q-card-section class="q-pa-none" v-if="move.Attributes && Object.keys(move.Attributes).length > 0">
      <p class="text" v-text="`Attributes:`" />
      <div class="q-pl-sm">
        <p class="text" v-if="move.Attributes.Priority" v-text="`Priority: ${move.Attributes.Priority}`" />
        <p class="text" v-if="move.Attributes.NeverFail" v-text="`Never Fails`" />
        <p class="text" v-if="move.Attributes.HighCritical" v-text="`High Critical`" />
        <p class="text" v-if="move.Attributes.Lethal" v-text="`Lethal`" />
        <p class="text" v-if="move.Attributes.SwitcherMove" v-text="`Switcher Move`" />
        <p class="text" v-if="move.Attributes.PhysicalRanged" v-text="`Physical Ranged`" />
        <p class="text" v-if="move.Attributes.BlockDamagePool" v-text="`Block Damage pool: ${move.Attributes.BlockDamagePool}`" />
        <p class="text" v-if="move.Attributes.AccuracyReduction" v-text="`Accuracy Reduction: ${move.Attributes.AccuracyReduction}`" />
        <p class="text" v-if="move.Attributes.SuccessiveActions" v-text="`Successive Actions`" />
        <p class="text" v-if="move.Attributes.ShieldMove" v-text="`Shield Move`" />
        <p class="text" v-if="move.Attributes.Charge" v-text="`Charge`" />
        <p class="text" v-if="move.Attributes.MustRecharge" v-text="`Must Recharge`" />
        <p class="text" v-if="move.Attributes.DoubleAction" v-text="`Double Action`" />
        <p class="text" v-if="move.Attributes.SoundBased" v-text="`Sound Based`" />
        <p class="text" v-if="move.Attributes.Recoil" v-text="`Recoil`" />
        <p class="text" v-if="move.Attributes.DestroyShield" v-text="`Destroy Shield`" />
        <p class="text" v-if="move.Attributes.FistBased" v-text="`Fist Based`" />
        <p class="text" v-if="move.Attributes.IgnoreDefenses" v-text="`Ignore Defenses`" />
        <p class="text" v-if="move.Attributes.ResetTerrain" v-text="`Reset Terrain`" />
        <p class="text" v-if="move.Attributes.UserFaints" v-text="`User Faints`" />
        <p class="text" v-if="move.Attributes.IgnoreShield" v-text="`Ignore Shield`" />
        <p class="text" v-if="move.Attributes.AlwaysCrit" v-text="`Always Crit`" />
        <p class="text" v-if="move.Attributes.Rampage" v-text="`Rampage`" />
        <p class="text" v-if="move.Attributes.ResistedWithDefense" v-text="`Resisted With Defense`" />
      </div>
    </q-card-section>

    <q-card-section class="q-pa-none" v-if="move.AddedEffects && Object.keys(move.AddedEffects).length > 0">
      <p class="text" v-text="`Added Effects:`" />
      <div class="q-pl-sm">
        <div v-if="move.AddedEffects.Heal">
          <p class="text" v-text="`Heal:`" />
          <div class="q-pl-sm">
            <p class="text" v-text="`Type: ${move.AddedEffects.Heal.Type}`" />
            <p class="text" v-text="`Target: ${move.AddedEffects.Heal.Target}`" />
            <p class="text" v-if="move.AddedEffects.Heal.Percentage" v-text="`Percentage: ${move.AddedEffects.Heal.Percentage * 100}%`" />
            <p class="text" v-if="move.AddedEffects.Heal.WillPointCost" v-text="`Will Point Cost: ${move.AddedEffects.Heal.WillPointCost}`" />
          </div>
        </div>

        <div v-if="move.AddedEffects.StatChanges">
          <p class="text" v-text="`Stat Changes:`" />
          <div class="q-pl-sm" v-for="(change, index) in move.AddedEffects.StatChanges" :key="index">
            <p class="text" v-text="`Stats: ${change.Stats.join(', ')}`" />
            <p class="text" v-text="`Stages: ${change.Stages}`" />
            <p class="text" v-text="`Affects: ${change.Affects}`" />
            <p class="text" v-if="change.ChanceDice" v-text="`Chance Dice: ${change.ChanceDice}`" />
          </div>
        </div>

        <div v-if="move.AddedEffects.Ailments">
          <p class="text" v-text="`Ailments:`" />
          <div class="q-pl-sm" v-for="(ailment, index) in move.AddedEffects.Ailments" :key="index">
            <p class="text" v-text="`Type: ${ailment.Type}`" />
            <p class="text" v-text="`Affects: ${ailment.Affects}`" />
            <p class="text" v-if="ailment.ChanceDice" v-text="`Chance Dice: ${ailment.ChanceDice}`" />
            <p class="text" v-if="ailment.Rounds" v-text="`Rounds: ${ailment.Rounds}`" />
            <p class="text" v-if="ailment.TargetType" v-text="`Target Type: ${ailment.TargetType}`" />
          </div>
        </div>

        <div v-if="move.AddedEffects.AilmentHeal">
          <p class="text" v-text="`Ailment Heal: ${move.AddedEffects.AilmentHeal.join(', ')}`" />
        </div>

        <div v-if="move.AddedEffects.FixedDamage">
          <p class="text" v-text="`Fixed Damage:`" />
          <div class="q-pl-sm">
            <p class="text" v-text="`Type: ${move.AddedEffects.FixedDamage.Type}`" />
            <p class="text" v-text="`Target: ${move.AddedEffects.FixedDamage.Target}`" />
            <p class="text" v-if="move.AddedEffects.FixedDamage.Value" v-text="`Value: ${move.AddedEffects.FixedDamage.Value}`" />
            <p class="text" v-if="move.AddedEffects.FixedDamage.MaxValue" v-text="`Max Value: ${move.AddedEffects.FixedDamage.MaxValue}`" />
          </div>
        </div>

        <div v-if="move.AddedEffects.TerrainEffect">
          <p class="text" v-text="`Terrain Effect: ${move.AddedEffects.TerrainEffect}`" />
        </div>

        <div v-if="move.AddedEffects.IgnoreShield">
          <p class="text" v-text="`Ignore Shield`" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { MoveEntry } from 'src/MoveEntry';

export default defineComponent({
  name: 'PokeMove',
  props: {
    move: {
      type: Object as PropType<MoveEntry>,
      required: true,
    },
  },
});
</script>
