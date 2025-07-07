import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useActionStore } from './action'
import Game from '@/classes/Game'

export const useGameStore = defineStore('game', () => {
  const action = useActionStore()
  const game = Game.getInstance();
  const gameData = reactive(game.data)

  const monsterBarStyle = computed(() => {
    if (gameData.monsterHealth < 0) {
      return { width: '0%' }
    }
    return { width: gameData.monsterHealth + '%' }
  })

  const playerBarStyle = computed(() => {
    if (gameData.playerHealth < 0) {
      return { width: '0%' }
    }
    return { width: gameData.playerHealth + '%' }
  })

  const mayUseSpecialAttack = computed(() => {
    return gameData.currentRound % 3 !== 0
  })

  watch(() => gameData.playerHealth, (val) => {
    if (val <= 0 && gameData.monsterHealth <= 0) {
      gameData.winner = 'draw'
    } else if (val <= 0) {
      gameData.winner = 'monster'
    }
    action.saveData();
    game.updateData({ playerHealth: val, winner: gameData.winner });
  }, { deep: true })

  watch(() => gameData.monsterHealth, (val) => {
    if (val <= 0 && gameData.playerHealth <= 0) {
      gameData.winner = 'draw'
    } else if (val <= 0) {
      gameData.winner = 'player'
    }
    action.saveData();
    game.updateData({ monsterHealth: val, winner: gameData.winner });
  })

  watch(() => gameData.currentRound, (val) => {
    game.updateData({ currentRound: val })
  })

  const resetData = () => {
    gameData.playerHealth = 100;
    gameData.monsterHealth = 100;
    gameData.currentRound = 0;
    gameData.winner = null;
    gameData.logMessages = [];
    game.resetData()
  }

  return {
    gameData,
    monsterBarStyle,
    playerBarStyle,
    mayUseSpecialAttack,
    resetData
  }
})
