board.height = window.innerHeight - 120;
board.width = board.height;

const chess_set = "Chess_Set_1";
const piece_size = 0.75;
const black_king = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png");
const black_queen = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png");
const black_rook = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png");
const black_bishop = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png");//
const black_knight = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png");//
const black_pawn = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png");
const white_king = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png");
const white_queen = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png");
const white_rook = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png");//
const white_bishop = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png");
const white_knight = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png");
const white_pawn = initializeImageVariable("https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png");
const image_board = initializeImageVariable("https://cdn.pixabay.com/photo/2018/05/03/16/01/pattern-3371709_960_720.jpg")


let board_offset = 30;
let sqw = (board.width - (2 * board_offset))/8; //squarewidth


//init
initBoard();
loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");


function loadFEN(fen) {
    let piece_placement_string = fen.substring(0, fen.indexOf(" "));
    let index = 0;
    for (let i = 0; i < piece_placement_string.length; i++) {
        switch(piece_placement_string.charAt(i)) {
            case "/":
                break;
            case "k":
                renderPiece(black_king, index);
                index++;
                break;
            case "q":
                renderPiece(black_queen, index);
                index++;
                break;
            case "r":
                renderPiece(black_rook, index);
                index++;
                break;
            case "b":
                renderPiece(black_bishop, index);
                index++;
                break;
            case "n":
                renderPiece(black_knight, index);
                index++;
                break;
            case "p":
                renderPiece(black_pawn, index);
                index++;
                break;
            case "K":
                renderPiece(white_king, index);
                index++;
                break;
            case "Q":
                renderPiece(white_queen, index);
                index++;
                break;
            case "R":
                renderPiece(white_rook, index);
                index++;
                break;
            case "B":
                renderPiece(white_bishop, index);
                index++;
                break;
            case "N":
                renderPiece(white_knight, index);
                index++;
                break;
            case "P":
                renderPiece(white_pawn, index);
                index++;
                break;
            default:
                if (!isNaN(parseInt(piece_placement_string.charAt(i)))) {
                    index += parseInt(piece_placement_string.charAt(i));
                }
                break;
        }
    }
}

function initBoard() {
    context.beginPath();
    context.drawImage(image_board, 0, 0, board.width, board.height)
    context.strokeRect(board_offset, board_offset, board.width - board_offset * 2, board.height - board_offset * 2)
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + (j%2)) % 2 == 0)   context.fillStyle = "white";
            else                        context.fillStyle = "grey";
            context.fillRect(i * sqw + board_offset, j * sqw + board_offset, sqw, sqw);
        }
    }
    context.stroke();
    initBoardNotation();
}

function initializeImageVariable(img_path) {
    let img = new Image();
    img.src = img_path;
    return img;
}

function renderPiece(piece, index) {
    let file = index%8;
    let rank = Math.floor(index/8);

    context.beginPath();
    context.drawImage(
        piece,
        board_offset + (sqw/2) + (file*sqw) - (sqw*piece_size/2),   //x
        board_offset + (sqw/2) + (rank*sqw) - (sqw*piece_size/2),   //y
        sqw*piece_size,                                             //width
        sqw*piece_size                                              //height
    );
}

function initBoardNotation() {
    let font_size = 20;
    context.beginPath();
    context.font = font_size + "px serif";
    context.fillStyle = "black";
    for (let i = 0; i < 8; i++) {
        context.fillText(
            8 - i,
            (board_offset/2) - (context.measureText(8 - i).width/2),
            (i * sqw) + board_offset + (sqw/2) + (font_size/2)
        ); //ranks 123...
        context.fillText(
            String.fromCharCode(97 + i),
            board_offset + (sqw/2) - (context.measureText(String.fromCharCode(97 + i)).width/2) + (i * sqw),
            (board_offset/2) + (font_size/2)
        ); //files, abc...
    }
    context.stroke();
}