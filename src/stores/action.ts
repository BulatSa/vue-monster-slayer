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
      playerHealth: game.gameData.playerHealth,
      monsterHealth: game.gameData.monsterHealth,
      currentRound: game.gameData.currentRound,
      winner: game.gameData.winner,
      logMessages: game.gameData.logMessages,
    };

    localStorage.setItem("gameStore", JSON.stringify(gameStore))
  }

  function loadData() {
    const parsedGameStore = JSON.parse(localStorage.getItem('gameStore') || '')

    game.gameData.playerHealth = parsedGameStore.playerHealth
    game.gameData.monsterHealth = parsedGameStore.monsterHealth
    game.gameData.currentRound = parsedGameStore.currentRound
    game.gameData.winner = parsedGameStore.winner
    game.gameData.logMessages = parsedGameStore.logMessages
  }

  function getRandomValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function startGame() {
    game.resetData();
  }

  function attackMonster() {
    game.gameData.currentRound++
    const attackValue = getRandomValue(5, 12)
    game.gameData.monsterHealth -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }

  function attackPlayer() {
    const attackValue = getRandomValue(8, 15)
    game.gameData.playerHealth -= attackValue
    addLogMessage('monster', 'attack', attackValue)
  }

  function specialAttackMonster() {
    game.gameData.currentRound++
    const attackValue = getRandomValue(10, 25)
    game.gameData.monsterHealth -= attackValue
    addLogMessage('player', 'attack', attackValue)
    attackPlayer()
  }

  function healPlayer() {
    game.gameData.currentRound++
    const healValue = getRandomValue(8, 20)
    if (game.gameData.playerHealth + healValue > 100) {
      game.gameData.playerHealth = 100
    } else {
      game.gameData.playerHealth += healValue
    }
    addLogMessage('player', 'heal', healValue)
    attackPlayer()
  }

  function surrender() {
    game.gameData.winner = 'monster'
  }

  function addLogMessage(who: string, what: string, value: number) {
    game.gameData.logMessages.unshift({
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
