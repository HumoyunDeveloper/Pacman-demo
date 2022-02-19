class Circle {
    constructor(_r = 10) {
        (this.r = _r),
            (this.x = 0),
            (this.y = 0),
            (this.color = "yellow"),
            (this.radian = Math.PI * 2);
        this.mode = "simple";
        this.radianAnim = Math.PI;
        this.open = true;
        this.speedR = 0.7;
        this.speedRY = 0;
        this.speedN = 0.7;
        this.type = null;
        this.direction = "r";
    }

    draw(_ctx) {
        if (this.mode === "simple") {
            _ctx.fillStyle = this.color;
            _ctx.beginPath();
            _ctx.arc(this.x, this.y, this.r, 0, this.radian);
            _ctx.closePath();
            _ctx.fill();
        } else {
            if (Game.timer % 20 === 0) this.open = !this.open;
            _ctx.fillStyle = this.color;
            _ctx.beginPath();
            _ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            _ctx.fill();
            _ctx.closePath();
            if (this.open) {
                switch (this.direction) {
                    case "r":
                        this.directionRight(_ctx);
                        break;
                    case "l":
                        this.directionLeft(_ctx);
                        break;
                    case "t":
                        this.directionTop(_ctx);
                        break;
                    case "b":
                        this.directionBottom(_ctx);
                        break;
                }
            }
        }
    }

    directionRight(_ctx) {
        _ctx.fillStyle = "#133";
        _ctx.beginPath();
        _ctx.moveTo(this.x, this.y);
        _ctx.lineTo(this.x + this.r + 1.5, this.y - this.r);
        _ctx.lineTo(this.x + this.r + 1.5, this.y + this.r);
        _ctx.closePath();
        _ctx.fill();
    }

    directionLeft(_ctx) {
        _ctx.fillStyle = "#133";
        _ctx.beginPath();
        _ctx.moveTo(this.x, this.y);
        _ctx.lineTo(this.x - this.r - 1.5, this.y - this.r);
        _ctx.lineTo(this.x - this.r - 1.5, this.y + this.r);
        _ctx.closePath();
        _ctx.fill();
    }

    directionTop(_ctx) {
        _ctx.fillStyle = "#133";
        _ctx.beginPath();
        _ctx.moveTo(this.x, this.y);
        _ctx.lineTo(this.x - this.r - 1.5, this.y - this.r);
        _ctx.lineTo(this.x + this.r + 1.5, this.y - this.r);
        _ctx.closePath();
        _ctx.fill();
    }

    directionBottom(_ctx) {
        _ctx.fillStyle = "#133";
        _ctx.beginPath();
        _ctx.moveTo(this.x, this.y);
        _ctx.lineTo(this.x - this.r - 1.5, this.y + this.r);
        _ctx.lineTo(this.x + this.r + 1.5, this.y + this.r);
        _ctx.closePath();
        _ctx.fill();
    }

    update() {
        this.x += this.speedR;
        this.y += this.speedRY;
        this.collisionWall();
    }

    collisionWall() {
        if (this.x - this.r - this.speedR <= 0) {
            this.x = this.r + this.speedR + 4;
            this.speedR = 0;
        }
        if (this.x + this.r + this.speedR >= Game.dimensions[0]) {
            this.x = Game.dimensions[0] - (this.r + this.speedR) - 2;
            this.speedR = 0;
        }
        if (this.y + this.r + this.speedRY >= Game.dimensions[1]) {
            this.y = Game.dimensions[1] - (this.r + this.speedRY) - 2;
            this.speedRY = 0;
        }
        if (this.y - this.r - this.speedRY <= 0) {
            this.y = this.r + this.speedRY + 4;
            this.speedRY = 0;
        }
    }
}

class Rect {
    constructor(_w = 10, _h = 10) {
        (this.w = _w),
            (this.h = _h),
            (this.x = 0),
            (this.y = 0),
            (this.color = "#00c");
    }

    draw(_ctx) {
        _ctx.fillStyle = this.color;
        _ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

const Game = {
    canvas: document.querySelector("#game-scene"),
    res: document.querySelector("#res"),
    ctx: null,
    colors: ["#c00", "#cc0", "#ec0"],
    score: 0,
    ctxType: "2d",
    dimensions: [0, 0],
    ww: window.innerWidth,
    wh: window.innerHeight,
    timer: 0,
    cells: 0,
    enemies: [],
    map: [
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 3, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    ],
    mouseControl: {
        x: undefined,
        y: undefined,
    },
    mapObjects: [],
    boxHeight: 0,
    boxWidth: 0,
    player: {},
    lineMaps: [],
    init() {
        this.dimensions = [innerWidth * 0.7, innerWidth * 0.7];
        this.ctx = this.canvas.getContext(this.ctxType);
        this.setWorldDimensions(this.dimensions);
        this.boxWidth = this.dimensions[0] / this.map[0].length;
        this.boxHeight = this.dimensions[1] / this.map.length;
        this.loadMap();
        this.cells = this.mapObjects.filter(ob => ob.type === "sc").length;
    },
    loadMap() {
        this.mapObjects = [];
        this.lineMaps = [];
        this.map.forEach((_col, _ci) => {
            _col.forEach((_row, _ri) => {
                if(_row === 0) {
                    let cell = new Circle(this.boxWidth / 20);
                    cell.type = "sc";
                    cell.color = "#fefefe";
                    cell.x =
                        _ri * this.boxWidth +
                        this.boxWidth / 2 -
                        this.boxWidth / 20;
                    cell.y =
                        _ci * this.boxHeight +
                        this.boxHeight / 2 -
                        this.boxHeight / 20;
                    this.mapObjects.push(cell);
                    this.lineMaps.push({
                        x: cell.x,
                        y: cell.y,
                        r: Game.player.r,
                    });
                }
                else if (_row === 1) {
                    let cell = new Rect(this.boxWidth, this.boxHeight);
                    cell.x = _ri * this.boxWidth;
                    cell.y = _ci * this.boxHeight;
                    cell.type = _row;
                    this.mapObjects.push(cell);
                } else if (_row === 2) {
                    this.player = new Circle(this.boxWidth / 2.8);
                    this.player.mode = "player";
                    this.player.x = _ri * this.boxWidth + this.boxWidth / 2;
                    this.player.y = _ci * this.boxHeight + this.boxHeight / 2;
                    this.mapObjects.push(this.player);
                } else {
                    let enemy = new Circle(this.boxWidth / 2.8);
                    enemy.mode = "enemy";
                    enemy.color = Game.getRandomColor();
                    enemy.x = _ri * this.boxWidth + this.boxWidth / 2;
                    enemy.y = _ci * this.boxHeight + this.boxHeight / 2;
                    this.mapObjects.push(enemy);
                }
            });
        });
        return this.mapObjects;
    },
    getRandomColor() {
        return this.colors[this.getRange(0, this.colors.length)];
    },
    updateTime() {
        this.timer++;
    },
    setWorldDimensions(_arr = []) {
        this.canvas.width = _arr[0];
        this.canvas.height = _arr[1];
    },
    get getWorldDimensions() {
        return this.dimensions;
    },
    getRange(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    },
    getRandom(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
    },
    rangeIntersect(min0, max0, min1, max1) {
        return (
            Math.max(min0, max0) >= Math.min(min1, max1) &&
            Math.min(min0, max0) <= Math.max(min1, max1)
        );
    },
    collisionDetection(_r1, _r2) {
        return (
            _r1.x + _r1.r + _r1.speedR >= _r2.x &&
            _r1.x - _r1.r - _r1.speedR <= _r2.x + _r2.w &&
            _r1.y + _r1.r + _r1.speedRY >= _r2.y &&
            _r1.y - _r1.r - _r1.speedRY <= _r2.y + _r2.h
        );
    },
    collisionCircleDetection(_r1, _r2) {
        return (
            _r1.x + _r1.r - _r1.speedR >= _r2.x &&
            _r1.x - _r1.r - _r1.speedR <= _r2.x + _r1.r &&
            _r1.y + _r1.r + _r1.speedRY >= _r2.y &&
            _r1.y - _r1.r - _r1.speedRY <= _r2.y + _r1.r
        );
    },
    distance(c0, c1) {
        let xd = c0.x - c1.x;
        let yd = c0.y - c1.y;
        return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
    },
    updateScore() {
        this.res.innerText = (this.score < 10 ? "00" + this.score : "0" + this.score) + "/" + this.cells;
    },
    update() {
        this.updateTime();
        this.clearScreen();
        this.updateScore();

        this.mapObjects.forEach((obj, index) => {
            if (
                obj.mode !== "player" &&
                this.distance(Game.player, obj) <= Game.player.r - obj.r
            ) {
                ++this.score;
                this.mapObjects.splice(index, 1);
            }
        });
        this.mapObjects.forEach((obj, index) => {
            if (obj.mode === "player") {
                obj.update();
            } else {
                if (this.collisionDetection(Game.player, obj)) {
                    this.player.speedR = this.player.speedRY = 0;
                    const el = this.lineMaps.find(
                        (_ob) => Game.distance(Game.player, _ob) <= _ob.r * 2
                    );
                    this.player.x = el.x;
                    this.player.y = el.y;
                }
            }
            obj.draw(this.ctx);
        });
    },
    _eventRefresh() {
        Game.init();
    },
    _eventMouseDownDetectPC(_event) {
        Game.mouseControl.x = _event.clientX;
        Game.mouseControl.y = _event.clientY;
    },
    _eventTouchDownDetectPC(_event) {
        Game.mouseControl.x = _event.touches[0].clientX;
        Game.mouseControl.y = _event.touches[0].clientY;
    },
    _evenRightClick() {
        Game.player.direction = "r";
        Game.player.speedR = Game.player.speedN;
        Game.player.speedRY = 0;
    },
    _eventLeftClick() {
        Game.player.direction = "l";
        Game.player.speedR = -Game.player.speedN;
        Game.player.speedRY = 0;
    },
    _eventTopClick() {
        Game.player.direction = "t";
        Game.player.speedRY = -Game.player.speedN;
        Game.player.speedR = 0;
    },
    _eventBottomClick() {
        Game.player.direction = "b";
        Game.player.speedRY = Game.player.speedN;
        Game.player.speedR = 0;
    },
};

Game.init();
animate();

function animate() {
    Game.update();
    window.requestAnimationFrame(animate);
}

const select = (_name) => document.querySelector(_name);

window.addEventListener("mousedown", Game._eventMouseDownDetectPC);
window.addEventListener("touchstart", Game._eventTouchDownDetectPC);
window.addEventListener("resize", Game._eventRefresh);

select(".left").addEventListener("click", Game._eventLeftClick);
select(".right").addEventListener("click", Game._evenRightClick);
select(".top").addEventListener("click", Game._eventTopClick);
select(".bottom").addEventListener("click", Game._eventBottomClick);
