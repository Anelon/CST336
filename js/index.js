/*global $*/
/*global _*/
//consts
const right = 1;
const left = 2;
const up = 4;
const down = 8;
const downAndRight = 16;
const downAndLeft = 32;
const upAndRight = 64;
const upAndLeft = 128;
const downRight = down | right | downAndRight;
const downLeft = down | left | downAndLeft;
const upRight = up | right | upAndRight;
const upLeft = up | left | upAndLeft;
const upRightDown = up | right | down | upAndRight | downAndRight;
const upLeftDown = up | left | down | upAndLeft | downAndLeft;
const rightUpLeft = right | up | left | upAndRight | upAndLeft;
const rightDownLeft = right | down | left | downAndLeft | downAndRight;
const allRound = up | down | left | right | downAndLeft | downAndRight | upAndRight | upAndLeft;
const dirs = [[1,0,right],[-1,0,left],[0,-1,up],[0,1,down],[1,1,downAndRight],[-1,1,downAndLeft],[1,-1,upAndRight],[-1,-1,upAndLeft]];

const SIZE = 19;

function isWalkable(i,j) {
    if($(`#${i + "-" + j}`).attr('class').includes("wall")) return false;
    if($(`#${i + "-" + j}`).attr('class').includes("red")) return false;
    if($(`#${i + "-" + j}`).attr('class').includes("blue")) return false;
    if($(`#${i + "-" + j}`).attr('class').includes("green")) return false;
    return true;
}

class Mob {
    constructor(i,j,color) {
        this.i = i;
        this.j = j;
        this.color = color;
        this.class = color;
        this.active = false;
        $(`#${i + "-" + j}`).addClass(this.class);
    }
    activate() {
        $(`#${this.i + "-" + this.j}`).removeClass(this.class);
        this.class = this.color + "Mob";
        $(`#${this.i + "-" + this.j}`).addClass(this.class);
        this.active = true;
    }
}

let mobs = [];

class Player {
    constructor(i,j) {
        //I am sorry I is y j is x and its too late to change it
        this.i = i;
        this.j = j;
        this.facing = [-1,0];
        $(`#${i + "-" + j}`).addClass("player");
    }
    move(y,x) {
        this.facing = [y,x];
        let i = this.i + y;
        let j = this.j + x;
        //dont walk into walls
        if(!isWalkable(i,j)) {
            return;
        }
        ///$(`#${this.i + "-" + this.j}`).animate() do this later?
        $(`#${this.i + "-" + this.j}`).removeClass("player");
        $(`#${i + "-" + j}`).addClass("player");
        this.i = i;
        this.j = j;
    }
    use() {
        let i = this.i + this.facing[0];
        let j = this.j + this.facing[1];
        if($(`#${i + "-" + j}`).attr('class').includes("red")) {
            console.log("Found red");
            return false;
        } if($(`#${i + "-" + j}`).attr('class').includes("blue")) {
            console.log("Found blue");
            return false;
        } if($(`#${i + "-" + j}`).attr('class').includes("green")) {
            console.log("Found green");
            return false;
        }
    }
}

let gameboard = $("gameBoard");
let room = [];
let player;
let pause = true;


//mainish
$(document).ready(function() {
    mapInit();
    init();
    $(document).keypress(function() {
        //console.log(event.key)
        if(event.key == "w") player.move(-1, 0);
        else if(event.key == "a") player.move(0, -1);
        else if(event.key == "s") player.move(+1, 0);
        else if(event.key == "d") player.move(0, +1);
        else if(event.key == " ") player.use();
        else if(event.key == "Enter") {
            pause = !pause;
            if(pause) {
                $("info").show();
            } else {
                $("info").hide();
            }
        }
        
        //ai move?
    });
});

function getAround(i,j) {
    //console.log("getting Around");
    let curr = room[i][j];
    let around = 0;
    for (const dir in dirs) {
        //console.log(dirs[dir]);
        let newI = dirs[dir][0] + i;
        let newJ = dirs[dir][1] + j;
        if(newI < 0 || newJ < 0 || newI >= SIZE || newJ >= SIZE) {
            around = around | dirs[dir][2];
            continue;
        }
        if(curr == room[newI][newJ]) {
            around = around | dirs[dir][2];
        }
    }
    console.log(`Tile ${i}, ${j}: ${around}`);
    //see if statements in getImg from mapGen.py
    //if self.desc == "fence":
    if(curr == "w") {
        if (!(around ^ allRound)) {
            if(i == 0 && j == 0) return "TTL";
            if(i == 0 && j == 18) return "TTR";
            return "TTC"; //self.tileArr[17]
        }
        if (around & up) {
            if (around & right) {
                if (around & down) {
                    if (around & left) {
                        if (!(around & upAndRight))
                            return "TR";//self.tileArr[7]
                        if (!(around & upAndLeft))
                            return "BR";//self.tileArr[13]
                        if (!(around & downAndRight))
                            return "TL";//self.tileArr[6]
                        if (!(around & downAndLeft))
                            return "BL";//self.tileArr[12]
                    }
                    return "BC";//self.tileArr[3]
                }
                if (around & left)
                    return "L";//self.tileArr[10]
                return "ITR";//self.tileArr[4]
            }
            if (around & left) {
                if (around & down)
                    return "TC";//self.tileArr[15]
                return "IBR";//self.tileArr[16]
            }
        }
        if (around & down) {
            if (around & right) {
                if (around & left) {
                    return "R";//self.tileArr[8]
                }
                return "ITL";//self.tileArr[2]
            }
            if (around & left) {
                return "IBL";//self.tileArr[14]
            }
        }
    }
    return "C";//self.tileArr[1]
}

function init() {
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            let tileClass = "";
            if(room[i][j] == "w") {
                let around = getAround(i,j);
                tileClass += " wall" + around;
            }
            gameboard.append(`<div id="${i}-${j}" class="tile ${tileClass}"></div>`);
            if(room[i][j] == "B") {
                mobs.push(new Mob(i,j,"blue"));
            } else if(room[i][j] == "R") {
                mobs.push(new Mob(i,j,"red"));
            } else if(room[i][j] == "G") {
                mobs.push(new Mob(i,j,"green"));
            } else if(room[i][j] == "p") {
                player = new Player(i,j);
            }
        }
    }
}
function mapInit() {
    room.push("wwwwwwwwwwwwwwwwwww");
    room.push("wwwwwwwwwwwwwwwwwww");
    room.push("wBfffffffffffffffRw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wfffffffffffffffffw");
    room.push("wpfffffffffffffffGw");
    room.push("wwwwwwwwwwwwwwwwwww");
}