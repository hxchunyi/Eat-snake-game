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