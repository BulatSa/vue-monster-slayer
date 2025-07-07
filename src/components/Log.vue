<template>
  <section id="log" class="container">
    <h2>Battle Log</h2>
    <ul>
      <li v-for="(logMessage, index) in gameStore.gameData.logMessages" :key="index">
        <span
          :class="{
            'log--player': logMessage.actionBy === 'player',
            'log--monster': logMessage.actionBy === 'monster',
          }"
          >{{ logMessage.actionBy === 'player' ? 'Player' : 'Monster' }}</span
        >
        <span v-if="logMessage.actionType === 'heal'">
          heals himself for <span class="log--heal">{{ logMessage.actionValue }}</span>
        </span>
        <span v-else>
          attacks and deals <span class="log--damage">{{ logMessage.actionValue }}</span></span
        >
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>
