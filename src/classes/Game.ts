type gameStateType = {
  playerHealth: number;
  monsterHealth: number;
  currentRound: number;
  winner: null | string;
  logMessages: { actionBy: string, actionType: string, actionValue: number }[]
}

export default class Game {
  // Data
  #state: gameStateType = {
    playerHealth: 100,
    monsterHealth: 100,
    currentRound: 0,
    winner: null,
    logMessages: []
  };
  get data() { return this.#state }

  // Singleton
  static instance;
  static {
    this.instance = new Game();
  }

  constructor() {
    if (Game.instance) {
      throw new Error("Use Game.getInstance() instead.")
    }
  }

  static getInstance() {
    return this.instance;
  }

  updateData(data: Partial<gameStateType>) {
    this.#state = {...this.#state, ...data};
  }

  resetData() {
    this.#state.playerHealth = 100;
    this.#state.monsterHealth = 100;
    this.#state.currentRound = 0;
    this.#state.winner = null;
    this.#state.logMessages = [];
  }
}
