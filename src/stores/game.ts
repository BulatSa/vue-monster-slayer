import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useGameStore = defineStore('game', () => {
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
    saveData()
  })

  watch(monsterHealth, (val) => {
    if (val <= 0 && playerHealth.value <= 0) {
      winner.value = 'draw'
    } else if (val <= 0) {
      winner.value = 'player'
    }
    saveData()
  })

  function init() {
    if (!localStorage.getItem("gameStore")) {
      startGame()
      saveData();
    } else {
      loadData()
    }
  }

  function saveData() {
    const gameStore = {
      playerHealth: playerHealth.value,
      monsterHealth: monsterHealth.value,
      currentRound: currentRound.value,
      winner: winner.value,
      logMessages: logMessages.value,
    };

    localStorage.setItem("gameStore", JSON.stringify(gameStore))
  }

  function loadData() {
    const gameStore = JSON.parse(localStorage.getItem('gameStore') || '')

    playerHealth.value = gameStore.playerHealth
    monsterHealth.value = gameStore.monsterHealth
    currentRound.value = gameStore.currentRound
    winner.value = gameStore.winner
    logMessages.value = gameStore.logMessages
  }

  function getRandomValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function startGame() {
    playerHealth.value = 100
    monsterHealth.value = 100
    currentRound.value = 0
    winner.value = null
    logMessages.value = []
  }
  function attackMonster() {
    currentRound.value++
    const attackValue = getRandomValue(5, 12)
    monsterHealth.value -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }

  function attackPlayer() {
    const attackValue = getRandomValue(8, 15)
    playerHealth.value -= attackValue
    addLogMessage('monster', 'attack', attackValue)
  }
  function specialAttackMonster() {
    currentRound.value++
    const attackValue = getRandomValue(10, 25)
    monsterHealth.value -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }
  function healPlayer() {
    currentRound.value++
    const healValue = getRandomValue(8, 20)
    if (playerHealth.value + healValue > 100) {
      playerHealth.value = 100
    } else {
      playerHealth.value += healValue
    }
    addLogMessage('player', 'heal', healValue)
    attackPlayer()
  }
  function surrender() {
    winner.value = 'monster'
  }
  function addLogMessage(who: string, what: string, value: number) {
    logMessages.value.unshift({
      actionBy: who,
      actionType: what,
      actionValue: value,
    })
  }

  return {
    playerHealth,
    monsterHealth,
    currentRound,
    winner,
    logMessages,
    monsterBarStyle,
    playerBarStyle,
    mayUseSpecialAttack,
    init,
    startGame,
    attackMonster,
    attackPlayer,
    specialAttackMonster,
    healPlayer,
    surrender,
    addLogMessage
  }
})
