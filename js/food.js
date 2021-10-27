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