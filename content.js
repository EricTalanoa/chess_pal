// =============================================================================
// CONTENT SCRIPT - Runs on Chess.com game pages
// =============================================================================
// This script is injected into Chess.com pages to read the board state
// and analyze moves in real-time

console.log("Chess Pal: Content script loaded!");

// =============================================================================
// BOARD READING FUNCTIONS
// =============================================================================

/**
 * Gets the current board state by reading the DOM
 * Chess.com uses div elements with specific classes to represent squares
 * Each square has a class indicating its position (e.g., "square-11" = a1)
 */
function getBoardState() {
    // Find all chess pieces on the board
    // Chess.com uses classes like "piece wp" (white pawn), "bp" (black pawn), etc.
    const pieces = document.querySelectorAll('.piece');

    const boardState = {};

    pieces.forEach(piece => {
        // Get the parent square element to find position
        const square = piece.parentElement;

        // Extract square ID (e.g., "square-11" represents a1, "square-88" represents h8)
        const squareClass = square.className.match(/square-(\d)(\d)/);

        if (squareClass) {
            const file = squareClass[1]; // 1-8 representing a-h
            const rank = squareClass[2]; // 1-8 representing ranks
            const squareName = convertToChessNotation(file, rank);

            // Get piece type from class (e.g., "wp" = white pawn, "bk" = black king)
            const pieceClass = piece.className.match(/[wb][pnbrqk]/);
            if (pieceClass) {
                boardState[squareName] = pieceClass[0];
            }
        }
    });

    return boardState;
}

/**
 * Converts Chess.com's numeric coordinates to standard chess notation
 * Files: 1=a, 2=b, 3=c, 4=d, 5=e, 6=f, 7=g, 8=h
 * Ranks: 1-8 stay the same
 */
function convertToChessNotation(file, rank) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return files[file - 1] + rank;
}

/**
 * Displays the board state in a readable format
 */
function displayBoardState() {
    const board = getBoardState();

    console.log("=".repeat(40));
    console.log("Current Board State:");
    console.log("=".repeat(40));

    // Count pieces
    const whitePieces = Object.values(board).filter(p => p.startsWith('w')).length;
    const blackPieces = Object.values(board).filter(p => p.startsWith('b')).length;

    console.log(`White pieces: ${whitePieces}`);
    console.log(`Black pieces: ${blackPieces}`);
    console.log("\nPiece positions:");

    // Log each piece
    for (const [square, piece] of Object.entries(board)) {
        const color = piece[0] === 'w' ? 'White' : 'Black';
        const pieceType = getPieceName(piece[1]);
        console.log(`  ${square}: ${color} ${pieceType}`);
    }

    console.log("=".repeat(40));
}

/**
 * Converts piece code to readable name
 * p=Pawn, n=Knight, b=Bishop, r=Rook, q=Queen, k=King
 */
function getPieceName(code) {
    const pieces = {
        'p': 'Pawn',
        'n': 'Knight',
        'b': 'Bishop',
        'r': 'Rook',
        'q': 'Queen',
        'k': 'King'
    };
    return pieces[code] || 'Unknown';
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Wait for the chess board to load before trying to read it
 * Chess.com loads the board dynamically, so we need to wait
 */
function initialize() {
    // Check if the board exists
    const boardElement = document.querySelector('.board');

    if (boardElement) {
        console.log("Chess Pal: Board detected!");

        // Read and display the initial board state
        displayBoardState();

        // Set up a button to manually refresh board state (for testing)
        setupTestButton();

    } else {
        console.log("Chess Pal: Waiting for board to load...");
        // If board isn't loaded yet, try again in 1 second
        setTimeout(initialize, 1000);
    }
}

/**
 * Adds a test button to the page for manual board reading
 * This helps with development and testing
 */
function setupTestButton() {
    const button = document.createElement('button');
    button.textContent = 'Read Board (Chess Pal)';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '10000';
    button.style.padding = '10px 15px';
    button.style.backgroundColor = '#769656';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';

    button.onclick = () => {
        displayBoardState();
    };

    document.body.appendChild(button);
    console.log("Chess Pal: Test button added to page");
}

// =============================================================================
// START THE EXTENSION
// =============================================================================

// Start initialization when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    // DOM already loaded
    initialize();
}
