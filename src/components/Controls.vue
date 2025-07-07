<template>
  <section id="controls">
    <button @click="actionStore.attackMonster">ATTACK</button>
    <button :disabled="gameStore.mayUseSpecialAttack" @click="actionStore.specialAttackMonster">SPECIAL ATTACK</button>
    <button @click="actionStore.healPlayer">HEAL</button>
    <button @click="actionStore.surrender">SURRENDER</button>
  </section>
</template>

<script setup lang="ts">
import { useActionStore } from '@/stores/action';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const actionStore = useActionStore()
</script>
