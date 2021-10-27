(
    function() {
        //记录游戏对象
        var that;

        function Game(map) {
            this.food = new Food();
            this.snake = new Snake();
            this.map = map;
            that = this;
        }
        //游戏开始
        Game.prototype.start = function() {
                //食物渲染
                this.food.render(map);
                // 蛇渲染
                this.snake.render(map);
                //蛇动起来
                runSnake();
                // 键盘控制方向
                bindKey();
            }
            //私有函数
        function runSnake() {
            //开启定时器，让蛇动起来
            var timerId = setInterval(function() {
                this.snake.move(this.food, this.map);
                this.snake.render(this.map);

                //当蛇遇到边界，游戏结束
                var maxX = this.map.offsetWidth / this.snake.width;
                var maxY = this.map.offsetHeight / this.snake.height;
                var headX = this.snake.body[0].x;
                var headY = this.snake.body[0].y;
                if (headX < 0 || headX >= maxX) {
                    alert('Game Over!!');
                    clearInterval(timerId);
                }
                if (headY < 0 || headY >= maxY) {
                    alert('Game Over!!');
                    clearInterval(timerId);
                }
            }.bind(that), 150)
        }
        //通过键盘控制蛇移动的方向
        function bindKey() {
            // document.onkeydown = function() {
            // }
            // 37 left
            // 38 top
            // 39 right
            // 40 bottom
            document.addEventListener('keydown', function(e) {
                console.log(e.keyCode);
                switch (e.keyCode) {
                    case 37:
                        this.snake.direction = 'left';
                        break;
                    case 38:
                        this.snake.direction = 'top';
                        break;
                    case 39:
                        this.snake.direction = 'right';
                        break;
                    case 40:
                        this.snake.direction = 'bottom';
                        break;
                }
            }.bind(that), false);
        }
        window.Game = Game;
    }

)();