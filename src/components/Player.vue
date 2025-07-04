<template>
  <section id="player" class="container">
    <h2>Your Health</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="gameStore.playerBarStyle"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>
