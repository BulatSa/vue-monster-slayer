<template>
  <section id="controls">
    <button @click="gameStore.attackMonster">ATTACK</button>
    <button :disabled="gameStore.mayUseSpecialAttack" @click="gameStore.specialAttackMonster">SPECIAL ATTACK</button>
    <button @click="gameStore.healPlayer">HEAL</button>
    <button @click="gameStore.surrender">SURRENDER</button>
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>
