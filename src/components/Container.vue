<template>
  <section class="container">
    <h2>Game over!</h2>
    <h3 v-if="gameStore.gameData.winner === 'monster'">You lost!</h3>
    <h3 v-else-if="gameStore.gameData.winner === 'player'">You won!</h3>
    <h3 v-else>It's a draw!</h3>
    <button @click="actionStore.startGame">Start New Game</button>
  </section>
</template>

<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const actionStore = useActionStore()
</script>
