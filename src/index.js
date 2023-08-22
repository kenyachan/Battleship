import './css/style.css';
import './img/battleship.jpeg';

const ScreenController = require('./screenController');
const Battleship = require('./battleship');

let app = new Battleship();
let sc = new ScreenController(document.querySelector('body'), app.player, app.computerPlayer);

//console.log(app.player.getBoard());

sc.updateBoard(sc.friendlyBoard, app.player.getBoard());
