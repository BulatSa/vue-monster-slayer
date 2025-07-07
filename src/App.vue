<script setup lang="ts">
import { onBeforeMount } from 'vue'
import Container from './components/Container.vue'
import Controls from './components/Controls.vue'
import Log from './components/Log.vue'
import Monster from './components/Monster.vue'
import Player from './components/Player.vue'
import { useActionStore } from './stores/action'
import { useGameStore } from './stores/game'

const actionStore = useActionStore();
const gameStore = useGameStore()

onBeforeMount(() => {
  actionStore.init();
})

</script>

<template>
  <header>
    <h1>Monster Slayer</h1>
  </header>
  <div id="game">
    <Monster />
    <Player />
    <Container v-if="gameStore.winner" />
    <Controls v-else />
    <Log />
  </div>
</template>
