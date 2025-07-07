import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', () => {
  const player = {
    health: {
      max: 100
    },
    attackRange: {
      min: 5,
      max: 12
    },
    specialAttackRange: {
      min: 10,
      max: 25
    },
    heal: {
      min: 8,
      max: 20
    }
  }

  const monster = {
    health: {
      max: 100
    },
    attackRange: {
      min: 8,
      max: 15
    }
  }

  return {
    player,
    monster
  }
})
