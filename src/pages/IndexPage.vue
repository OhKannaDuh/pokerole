<template>
  <q-page class="row items-start justify-start content-start">
    <div class="q-pa-sm q-pt-md col-12">
      <q-input label="Search" filled v-model:model-value="search" debounce="500" />
    </div>
    <div class="q-pa-sm col-12 row">
      <div class="col-12 col-md-6 col-lg-3 q-px-sm">
        <q-toggle label="Search exact match" v-model:model-value="searchExact" />
      </div>
      <div class="col-12 col-md-6 col-lg-3 q-px-sm">
        <q-toggle label="Only show starters" v-model:model-value="starterOnly" />
      </div>
      <div class="col-12 col-md-6 col-lg-3 q-px-sm">
        <q-select label="Type One" v-model:model-value="typeOne" :options="types" />
      </div>
      <div class="col-12 col-md-6 col-lg-3 q-px-sm">
        <q-select label="Type Two" v-model:model-value="typeTwo" :options="types" />
      </div>
    </div>

    <div v-for="(entry, index) in entries" :key="index" class="q-pa-sm col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <q-card :class="{ goodStarter: entry.GoodStarter, legendary: entry.Legendary }" class="entry">
        <q-card-section class="row items-start justify-start content-start">
          <q-avatar size="128px" class="col-shrink">
            <img :src="`/images/${entry.Image}`" alt="test" />
          </q-avatar>
          <div class="col-grow">
            <p class="text" v-text="`#${entry.DexID}`" />
            <p class="text" v-text="entry.Name" />
            <p class="text" v-text="entry.DexCategory" />
            <p class="text">
              <span :class="`type-text type-${entry.Type1}`" v-text="entry.Type1" />

              <template v-if="entry.Type2">
                &
                <span :class="`type-text type-${entry.Type2}`" v-text="entry.Type2" />
              </template>
            </p>

            <p class="text" v-text="`Avg Height: ${entry.Height.Meters}m`" />
            <p class="text" v-text="`Avg Weight: ${entry.Weight.Kilograms}kg`" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn class="full-width" square color="positive" @click="openModal(entry)">View</q-btn>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="modalShow" square full-width full-height>
      <q-card>
        <q-card-section class="q-pb-none">
          <q-btn class="full-width" square color="negative" @click="modalShow = false">Close</q-btn>
        </q-card-section>
        <q-card-section class="q-pb-none">
          <div class="text-h6" v-text="`#${modalEntry.DexID} - ${modalEntry.Name}`" />
          <div v-text="modalEntry.DexCategory" />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-py-none" style="text-align: center">
          <q-avatar size="256px" class="col-shrink"> <img :src="`/images/${modalEntry.Image}`" alt="test" /></q-avatar>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text">
            A <span :class="`type-text type-${modalEntry.Type1}`" v-text="modalEntry.Type1" />

            <template v-if="modalEntry.Type2">
              &
              <span :class="`type-text type-${modalEntry.Type2}`" v-text="modalEntry.Type2" />
            </template>
            Type
          </p>

          <p class="text" v-text="`Avg Height: ${modalEntry.Height.Meters}m`" />
          <p class="text" v-text="`Avg Weight: ${modalEntry.Weight.Kilograms}kg`" />
        </q-card-section>

        <q-card-section>{{ modalEntry.DexDescription }}</q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text" v-text="`Base HP: ${modalEntry.BaseHP}`" />
          <poke-attribute name="Strength" :base="modalEntry.Strength" :max="modalEntry.MaxStrength" />
          <poke-attribute name="Dexterity" :base="modalEntry.Dexterity" :max="modalEntry.MaxDexterity" />
          <poke-attribute name="Vitality" :base="modalEntry.Vitality" :max="modalEntry.MaxVitality" />
          <poke-attribute name="Special" :base="modalEntry.Special" :max="modalEntry.MaxSpecial" />
          <poke-attribute name="Insight" :base="modalEntry.Insight" :max="modalEntry.MaxInsight" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text" v-text="`Abilities:`" />
          <p class="text" v-text="`${modalEntry.Ability1}:`" />
          <p class="text" v-text="abilities[modalEntry.Ability1].Effect" />

          <template v-if="modalEntry.Ability2">
            <p class="text" v-text="`${modalEntry.Ability2}:`" />
            <p class="text" v-text="abilities[modalEntry.Ability2].Effect" />
          </template>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text" v-text="`Moves:`" />
          <q-expansion-item
            v-for="(move, index) in modalEntry.Moves"
            :key="index"
            :label="`${move.Name} (${move.Learned})`"
            expand-separator
            header-inser-level="0"
          >
            <poke-move :move="moves[move.Name]" />
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pokedex from '../data/pokedex.json';
import abilities from '../data/abilities.json';
import moves from '../data/moves.json';
import Entry from 'src/Entry';
import PokeAttribute from 'src/components/PokeAttribute.vue';
import PokeMove from 'src/components/PokeMove.vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    PokeAttribute,
    PokeMove,
  },

  setup() {
    const search = ref<string>('');
    const searchExact = ref<boolean>(false);
    const starterOnly = ref<boolean>(false);

    const types = ref<string[]>(['']);
    const typeOne = ref<string>('');
    const typeTwo = ref<string>('');

    for (const key in pokedex) {
      const entry: Entry = pokedex[key] as Entry;

      if (!types.value.includes(entry.Type1)) {
        types.value.push(entry.Type1);
      }

      if (!types.value.includes(entry.Type2)) {
        types.value.push(entry.Type2);
      }
    }

    const modalEntry = ref<Entry>(pokedex[0]);
    const modalShow = ref<boolean>(false);

    return { pokedex, abilities, moves, search, searchExact, starterOnly, types, typeOne, typeTwo, modalEntry, modalShow };
  },

  methods: {
    openModal(entry: Entry): void {
      this.modalEntry = entry;
      this.modalShow = true;
    },
  },

  computed: {
    entries(): Entry[] {
      let output: Entry[] = [];
      const search = this.search.toUpperCase().trim();
      const pattern = this.searchExact ? new RegExp('\\b(' + search + ')\\b', 'gim') : new RegExp(search, 'gim');

      for (const key in this.pokedex) {
        const entry: Entry = this.pokedex[key] as Entry;

        if (this.starterOnly && !entry.GoodStarter) {
          continue;
        }

        if (this.typeOne !== '' && entry.Type1 !== this.typeOne && entry.Type2 !== this.typeOne) {
          continue;
        }

        if (this.typeTwo !== '' && this.typeTwo !== this.typeOne && entry.Type1 !== this.typeTwo && entry.Type2 !== this.typeTwo) {
          continue;
        }

        if (search === '') {
          output.push(entry);
          continue;
        }

        if (pattern.test(entry.Name)) {
          output.push(entry);
          continue;
        }

        if (pattern.test(entry.DexDescription)) {
          output.push(entry);
          continue;
        }

        if (pattern.test(entry.DexCategory)) {
          output.push(entry);
          continue;
        }
      }

      return output;
    },
  },
});
</script>

<style scoped lang="scss">
.entry {
  box-shadow: none;
  border: 4px transparent solid;
}

.goodStarter {
  border-bottom: 4px green solid;
}

.legendary {
  border-bottom: 4px goldenrod solid;
}
</style>

<style lang="scss">
.q-dialog__inner {
  padding: 0;
}
</style>
