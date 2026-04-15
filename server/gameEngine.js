class GameEngine {
  constructor(players) {
    this.players = players.map((p, idx) => ({
      id: p.id,
      name: p.name,
      hand: [],
      money: 2,
      properties: {},
      turn: idx === 0,
      index: idx
    }));
    this.currentPlayerIndex = 0;
    this.deck = this.createDeck();
    this.discardPile = [];
    this.dealInitialCards();
  }

  createDeck() {
    const deck = [];
    const propertyCards = [
      { name: 'Mediterranean Avenue', color: 'brown', value: 1 },
      { name: 'Baltic Avenue', color: 'brown', value: 1 },
      { name: 'Oriental Avenue', color: 'lightblue', value: 1 },
      { name: 'Vermont Avenue', color: 'lightblue', value: 1 },
      { name: 'Connecticut Avenue', color: 'lightblue', value: 1 },
      { name: 'St. Charles Place', color: 'pink', value: 2 },
      { name: 'States Avenue', color: 'pink', value: 2 },
      { name: 'Virginia Avenue', color: 'pink', value: 2 },
      { name: 'Tennessee Avenue', color: 'orange', value: 2 },
      { name: 'New York Avenue', color: 'orange', value: 2 },
      { name: 'Kentucky Avenue', color: 'orange', value: 2 },
      { name: 'Indiana Avenue', color: 'red', value: 3 },
      { name: 'Illinois Avenue', color: 'red', value: 3 },
      { name: 'Atlantic Avenue', color: 'red', value: 3 },
      { name: 'Pennsylvania Avenue', color: 'yellow', value: 3 },
      { name: 'Pacific Avenue', color: 'yellow', value: 3 },
      { name: 'North Carolina Avenue', color: 'yellow', value: 3 },
      { name: 'Pennsylvania Railroad', color: 'railroad', value: 2 },
      { name: 'Reading Railroad', color: 'railroad', value: 2 },
      { name: 'B&O Railroad', color: 'railroad', value: 2 },
      { name: 'Short Line', color: 'railroad', value: 2 },
      { name: 'Electric Company', color: 'utility', value: 1 },
      { name: 'Water Works', color: 'utility', value: 1 },
      { name: 'Boardwalk', color: 'darkblue', value: 4 },
      { name: 'Park Place', color: 'darkblue', value: 4 }
    ];

    const moneyCards = [
      { type: 'money', value: 1, count: 20 },
      { type: 'money', value: 2, count: 20 },
      { type: 'money', value: 5, count: 16 },
      { type: 'money', value: 10, count: 12 }
    ];

    propertyCards.forEach(card => deck.push({ ...card, type: 'property' }));
    moneyCards.forEach(card => {
      for (let i = 0; i < card.count; i++) {
        deck.push({ type: 'money', value: card.value });
      }
    });

    const actionCards = [
      { type: 'action', name: 'Deal', description: 'Draw 3 cards' },
      { type: 'action', name: 'Just Say No', description: 'Block an action' },
      { type: 'action', name: 'Rent', description: 'Collect rent' },
      { type: 'action', name: 'House', description: 'Add house' },
      { type: 'action', name: 'Hotel', description: 'Add hotel' }
    ];

    actionCards.forEach(card => {
      for (let i = 0; i < 3; i++) {
        deck.push(card);
      }
    });

    return this.shuffleDeck(deck);
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealInitialCards() {
    this.players.forEach(() => {
      for (let i = 0; i < 5; i++) {
        if (this.deck.length > 0) {
          const card = this.deck.pop();
          this.players[this.players.length - 1].hand.push(card);
        }
      }
    });
  }

  playCard(playerId, cardIndex) {
    const player = this.players.find(p => p.id === playerId);
    if (!player || !player.turn) {
      return { success: false, message: 'Not your turn' };
    }

    const card = player.hand[cardIndex];
    if (!card) {
      return { success: false, message: 'Card not found' };
    }

    if (card.type === 'property') {
      if (!player.properties[card.color]) {
        player.properties[card.color] = [];
      }
      player.properties[card.color].push(card);
    } else if (card.type === 'money') {
      player.money += card.value;
    }

    player.hand.splice(cardIndex, 1);
    this.discardPile.push(card);
    this.drawCard(player);
    this.endTurn();

    return { success: true };
  }

  drawCard(player) {
    if (this.deck.length === 0 && this.discardPile.length > 0) {
      this.deck = this.shuffleDeck([...this.discardPile]);
      this.discardPile = [];
    }
    if (this.deck.length > 0) {
      player.hand.push(this.deck.pop());
    }
  }

  endTurn() {
    this.players[this.currentPlayerIndex].turn = false;
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.players[this.currentPlayerIndex].turn = true;
  }

  getGameState() {
    return {
      players: this.players.map(p => ({
        id: p.id,
        name: p.name,
        money: p.money,
        hand: p.hand,
        properties: p.properties,
        turn: p.turn
      })),
      currentPlayerIndex: this.currentPlayerIndex,
      deckSize: this.deck.length
    };
  }
}

module.exports = GameEngine;
