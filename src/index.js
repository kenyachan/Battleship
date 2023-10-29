import './css/style.css';
import './img/battleship.jpeg';

const ScreenController = require('./screenController');
const Battleship = require('./battleship');

let app = new Battleship();
let sc = new ScreenController(app);

/*
app.computerPlayer.shoot(11, app.player.getBoard());
app.computerPlayer.shoot(66, app.player.getBoard());
onsole.log(app.player.getBoard());
sc.updateBoard(sc.friendlyBoard, app.player.getBoard());
*/

