// src/utils/localStorageUtils.js

function saveGameState(gameState) {
  const serializedState = JSON.stringify(gameState);
  localStorage.setItem('gameState', serializedState);
}

function loadGameState() {
  const serializedState = localStorage.getItem('gameState');
  if (serializedState) {
    return JSON.parse(serializedState);
  }
  return null;
}

export { saveGameState, loadGameState };
