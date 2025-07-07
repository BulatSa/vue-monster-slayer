import { defineStore } from 'pinia'
import { useGameStore } from './game'

export const useActionStore = defineStore('action', () => {
  const game = useGameStore();

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
      playerHealth: game.playerHealth,
      monsterHealth: game.monsterHealth,
      currentRound: game.currentRound,
      winner: game.winner,
      logMessages: game.logMessages,
    };

    localStorage.setItem("gameStore", JSON.stringify(gameStore))
  }

  function loadData() {
    const parsedGameStore = JSON.parse(localStorage.getItem('gameStore') || '')

    game.playerHealth = parsedGameStore.playerHealth
    game.monsterHealth = parsedGameStore.monsterHealth
    game.currentRound = parsedGameStore.currentRound
    game.winner = parsedGameStore.winner
    game.logMessages = parsedGameStore.logMessages
  }

  function getRandomValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function startGame() {
    game.playerHealth = 100
    game.monsterHealth = 100
    game.currentRound = 0
    game.winner = null
    game.logMessages = []
  }
  function attackMonster() {
    game.currentRound++
    const attackValue = getRandomValue(5, 12)
    game.monsterHealth -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }

  function attackPlayer() {
    const attackValue = getRandomValue(8, 15)
    game.playerHealth -= attackValue
    addLogMessage('monster', 'attack', attackValue)
  }
  function specialAttackMonster() {
    game.currentRound++
    const attackValue = getRandomValue(10, 25)
    game.monsterHealth -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }
  function healPlayer() {
    game.currentRound++
    const healValue = getRandomValue(8, 20)
    if (game.playerHealth + healValue > 100) {
      game.playerHealth = 100
    } else {
      game.playerHealth += healValue
    }
    addLogMessage('player', 'heal', healValue)
    attackPlayer()
  }
  function surrender() {
    game.winner = 'monster'
  }
  function addLogMessage(who: string, what: string, value: number) {
    game.logMessages.unshift({
      actionBy: who,
      actionType: what,
      actionValue: value,
    })
  }

  return {
    init,
    startGame,
    attackMonster,
    attackPlayer,
    specialAttackMonster,
    healPlayer,
    surrender,
    addLogMessage,
    saveData
  }
})
