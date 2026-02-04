// =============================================================================
// BACKGROUND SERVICE WORKER - Runs in the background
// =============================================================================
// This script receives board data from content.js and processes it
// (e.g., run Stockfish analysis, store data, send results back)

console.log("Chess Pal: Background service worker started!");

// =============================================================================
// MESSAGE LISTENER - Receives data from content script
// =============================================================================

/**
 * Listens for messages from content.js (or popup.js)
 * When board state is sent, we can analyze it or process it
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background received message:", message);

    // Check what type of message we received
    if (message.type === 'BOARD_STATE') {
        // Extract the board data
        const boardData = message.data;

        console.log("=".repeat(40));
        console.log("Board state received in background!");
        console.log("=".repeat(40));
        console.log("Number of pieces:", Object.keys(boardData).length);
        console.log("Board data:", boardData);

        // HERE IS WHERE YOU'D USE THE DATA:
        // ----------------------------------
        // 1. Run Stockfish analysis
        // 2. Calculate best moves
        // 3. Store in chrome.storage
        // 4. Send results back to content script

        // Example: Analyze the board
        analyzePosition(boardData);

        // Send a response back to content.js (optional)
        sendResponse({
            status: 'success',
            message: 'Board state received and analyzed'
        });
    }

    // Return true to indicate we'll send a response asynchronously
    return true;
});

// =============================================================================
// ANALYSIS FUNCTIONS
// =============================================================================

/**
 * Analyzes the board position
 * In the future, this would use Stockfish to calculate best moves
 */
function analyzePosition(boardData) {
    console.log("Analyzing position...");

    // Count pieces by type
    const pieceCounts = {};
    for (const piece of Object.values(boardData)) {
        pieceCounts[piece] = (pieceCounts[piece] || 0) + 1;
    }

    console.log("Piece counts:", pieceCounts);

    // TODO: Add Stockfish integration here
    // For now, just log a placeholder
    console.log("Analysis complete (Stockfish integration coming soon)");

    // Example: You could send results back to content script
    // chrome.tabs.sendMessage(tabId, { type: 'ANALYSIS_RESULT', data: {...} });
}

// =============================================================================
// FUTURE FEATURES
// =============================================================================
// - Integrate Stockfish chess engine
// - Calculate best moves and evaluations
// - Store game history in chrome.storage
// - Detect when moves are made and auto-analyze
// - Send suggestions back to content script for display

