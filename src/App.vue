<script setup lang="ts">
import Container from './components/Container.vue'
import Controls from './components/Controls.vue'
import Log from './components/Log.vue'
import Monster from './components/Monster.vue'
import Player from './components/Player.vue'
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
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
