<template>
  <q-page class="row items-start justify-start content-start">
    <div class="q-pa-sm q-pt-md col-12">
      <q-input label="Search" filled v-model:model-value="search" debounce="500" />
    </div>
    <div class="q-pa-sm col-12 row">
      <div class="col q-px-sm">
        <q-toggle label="Search exact match" v-model:model-value="searchExact" />
      </div>
      <div class="col q-px-sm">
        <q-toggle label="Only show starters" v-model:model-value="starterOnly" />
      </div>
      <div class="col q-px-sm">
        <q-select label="Type One" v-model:model-value="typeOne" :options="types" />
      </div>
      <div class="col q-px-sm">
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
            <p class="text" v-text="`${entry.Name} (${entry.DexCategory})`" />
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
          {{ entry.DexDescription }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pokedex from '../data/pokedex.json';

interface Move {
  Learned: string;
  Name: string;
}

interface Height {
  Meters: number;
  Feet: number;
}

interface Weight {
  Kilograms: number;
  Pounds: number;
}

interface Evolution {
  To: string;
  Kind: string;
  Speed: string;
}

interface Entry {
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

export default defineComponent({
  name: 'IndexPage',
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

    return { pokedex, search, searchExact, starterOnly, types, typeOne, typeTwo };
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
.text {
  margin: 0;
}

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

.type-Normal {
  color: #a8a77a;
}

.type-Fire {
  color: #ee8130;
}

.type-Water {
  color: #6390f0;
}

.type-Electric {
  color: #f7d02c;
}

.type-Grass {
  color: #7ac74c;
}

.type-Ice {
  color: #96d9d6;
}

.type-Fighting {
  color: #c22e28;
}

.type-Poison {
  color: #a33ea1;
}

.type-Ground {
  color: #e2bf65;
}

.type-Flying {
  color: #a98ff3;
}

.type-Psychic {
  color: #f95587;
}

.type-Bug {
  color: #a6b91a;
}

.type-Rock {
  color: #b6a136;
}

.type-Ghost {
  color: #735797;
}

.type-Dragon {
  color: #6f35fc;
}

.type-Dark {
  color: #705746;
}

.type-Steel {
  color: #b7b7ce;
}

.type-Fairy {
  color: #d685ad;
}
</style>
