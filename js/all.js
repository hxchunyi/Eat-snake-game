// Tools
;
(
    function() {
        var Tools = {
            getRandom: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        window.Tools = Tools;
    }
)()
//food
;
(function() { //自调用函数，避免命名冲突
        var position = 'absolute';
        var elements = [];

        function Food(options) {
            options = options || {};
            this.width = options.width || 20;
            this.height = options.height || 20;
            this.backgroundColor = options.backgroundColor || 'green';
            this.x = options.x || 0;
            this.y = options.y || 0;
        }

        Food.prototype.render = function(map) {
            remove();
            //调用随机数工具
            this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
            this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
            //创建div加入到map中
            var div = document.createElement("div");
            map.appendChild(div);
            //把div加入数组中
            elements.push(div);
            //初始化食物
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.backgroundColor;
            div.style.position = position;
            div.style.left = this.x + 'px';
            div.style.top = this.y + 'px';
        }

        //删除div元素
        function remove() {
            for (i = elements.length - 1; i >= 0; i--) {
                //删除div
                elements[i].parentNode.removeChild(elements[i]);
                //删除数组中元素
                //第一个参数 从哪个元素开始删
                //第二个元素 删除几个
                elements.splice(i, 1)
            }

        }
        //全局变量让外部访问
        window.Food = Food;
    }

)()
//snake
;
(
    function() {
        var position = 'absolute'
        var elements = [];

        function Snake(options) {
            options = options || {};
            this.width = options.width || 20;
            this.height = options.height || 20;
            this.direction = options.direction || 'right'
            this.body = [
                { x: 3, y: 2, color: 'red' },
                { x: 2, y: 2, color: 'blue' },
                { x: 1, y: 2, color: 'blue' }
            ]
        }

        Snake.prototype.render = function(map) {
            // 删除蛇
            remove();

            //把每一个蛇节渲染到地图上
            for (var i = 0, len = this.body.length; i < len; i++) {
                var object = this.body[i];
                var div = document.createElement('div');
                map.appendChild(div);
                elements.push(div);
                //设置样式
                div.style.position = position;
                div.style.width = this.width + 'px';
                div.style.height = this.height + 'px';
                div.style.backgroundColor = object.color;
                div.style.left = object.x * this.width + 'px';
                div.style.top = object.y * this.height + 'px';
            }

        }


        //删除蛇 私有成员
        function remove() {
            for (var i = elements.length - 1; i >= 0; i--) {
                elements[i].parentNode.removeChild(elements[i]);
                elements.splice(i, 1);
            }
        }

        //蛇的移动
        Snake.prototype.move = function(food, map) {
            //只管蛇身不管蛇头
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            // 蛇头
            var head = this.body[i]
            switch (this.direction) {
                case 'right':
                    head.x += 1;
                    break;
                case 'left':
                    head.x += -1;
                    break;
                case 'top':
                    head.y += -1;
                    break;
                case 'bottom':
                    head.y += 1;
                    break;
            }

            //判断蛇头，是否和食物重合
            var headX = head.x * this.width;
            var headY = head.y * this.height;
            if (headX === food.x && headY === food.y) {
                //让蛇增加一节
                var last = this.body[this.body.length - 1];
                this.body.push({
                        x: last.x,
                        y: last.y,
                        color: last.color
                    })
                    //重新加载食物
                food.render(map);
            }
        }

        window.Snake = Snake;
    }
)()


//game
;
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

//main 调用
;
(
    function() {
        var map = document.getElementById('map');
        var game = new Game(map);
        game.start();
    }
)();