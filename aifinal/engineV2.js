// AI engine to play connect 4

function score_position(board, player_id) {
  let score = 0;
  /** 
    // Horizontal score
    for (let row of board){
        for (let col = 0; col < 4; col++){
            row = []
            let window = row [col:col+4]
            score += evaluate_window(window, player_id)
        }
    }
    // Vertical score
    for col in range(7):
        for row in range(3):
            window = [board[row+i][col] for i in range(4)]
            score += evaluate_window(window, player_id)

    // Diagonal score (positive slope)
    for row in range(3):
        for col in range(4):
            window = [board[row+i][col+i] for i in range(4)]
            score += evaluate_window(window, player_id)

    // Diagonal score (negative slope)
    for row in range(3):
        for col in range(4):
            window = [board[row+3-i][col+i] for i in range(4)]
            score += evaluate_window(window, player_id)
    */
  return score;
}

function evaluate_window(window, player_id) {}

function is_terminal_node(board) {}

function get_valid_moves(board) {}

function is_win(board, player_id) {}

function min_max(board, depth, maximizing_player, player_id) {}

function drop_piece(board, col, player_id) {}

function make_move(gameboard, player_id) {}
