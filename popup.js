// =============================================================================
// POPUP SCRIPT - Runs when you click the extension icon
// =============================================================================
// This script handles the popup UI interactions

console.log("Chess Pal: Popup script loaded!");

// =============================================================================
// BUTTON HANDLERS
// =============================================================================

/**
 * Button to open Chess.com in a new tab
 * Uses Chrome's tabs API to create a new tab
 */
document.getElementById('openChess').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://www.chess.com/play/online' });
});

// =============================================================================
// FUTURE FEATURES - You can expand this with:
// =============================================================================
// - Display current board state from the active Chess.com tab
// - Show analysis results from Stockfish
// - Toggle extension on/off
// - Display move history and notation
// - Show evaluation score and suggested moves
