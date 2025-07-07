import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useActionStore } from './action'

export const useGameStore = defineStore('game', () => {
  const action = useActionStore()

  const playerHealth = ref(100)
  const monsterHealth = ref(100)
  const currentRound = ref(0)
  const winner = ref<null | string>(null)
  const logMessages = ref<{ actionBy: string, actionType: string, actionValue: number }[]>([])

  const monsterBarStyle = computed(() => {
    if (monsterHealth.value < 0) {
      return { width: '0%' }
    }
    return { width: monsterHealth.value + '%' }
  })

  const playerBarStyle = computed(() => {
    if (playerHealth.value < 0) {
      return { width: '0%' }
    }
    return { width: playerHealth.value + '%' }
  })

  const mayUseSpecialAttack = computed(() => {
    return currentRound.value % 3 !== 0
  })

  watch(playerHealth, (val) => {
    if (val <= 0 && monsterHealth.value <= 0) {
      winner.value = 'draw'
    } else if (val <= 0) {
      winner.value = 'monster'
    }
    action.saveData()
  })

  watch(monsterHealth, (val) => {
    if (val <= 0 && playerHealth.value <= 0) {
      winner.value = 'draw'
    } else if (val <= 0) {
      winner.value = 'player'
    }
    action.saveData()
  })

  return {
    playerHealth,
    monsterHealth,
    currentRound,
    winner,
    logMessages,
    monsterBarStyle,
    playerBarStyle,
    mayUseSpecialAttack,
  }
})
