/**
 * $.dullImgScroll
 * @extends jquery.1.9.1
 * @author dullBear
 * @email 1317981032@qq.com
 * @site www.dullbear.com
 * @version 1.0
 * @date 2013-11-05
 * Copyright (c) 2013-2013 dullBear
 * @example   $("#scrollWrap").dullImgScroll();
 */

(function($) {
	//命名空间
	var dbUI = dbUI || {};

	$.fn.dullImgScroll = function(options) {
		//默认参数
		var defaults = {
			//用户获取滚动外层高宽以判断是否满足滚动条件
			scrollBox: '#scrollBox',
			//滚动内容
			boxName: '#scrollBox',
			//下一帧按钮
			nextBtn: '#nextBtn',
			//上一帧按钮
			prevBtn: '#prevBtn',
			//滚动方向
			direction: 'left',
			//滚动个数
			cun: 1,
			//滚动速度
			speed: 2000
		};

		var PNAME = 'dullImgScroll';

		var objData = $(this).data(PNAME);

		//get instance object
		if (typeof options == 'string' && options == 'instance') {
			return objData;
		};

		var options = $.extend({}, defaults, options || {});

		return $(this).each(function() {
			var dullImgScroll = new dbUI.dullImgScroll(options);

			dullImgScroll.$element = $(this);

			dullImgScroll._init();
		});
	};

	dbUI.dullImgScroll = function(options) {
		this.name = 'dullImgScroll';
		this.version = 1.0;
		this.options = options;
	};

	dbUI.dullImgScroll.prototype = {
		_init: function() {
			this.$scrollWrap = this.$element;
			this.$scrollBox = this.$scrollWrap.find(this.options.scrollBox)
			this.$box = this.$scrollWrap.find(this.options.boxName);
			this.len = this.$box.children().length;
			//获取单个项目的宽度
			this.itemWidth = this.$box.children().first().outerWidth(true);
			//获取单个项目的高度
			this.itemHeight = this.$box.children().first().outerHeight(true);
			//查找按钮
			this.$nextBtn = this.$scrollWrap.find(this.options.nextBtn);
			this.$prevBtn = this.$scrollWrap.find(this.options.prevBtn);
			this.direction = this.options.direction;
			this.cun = this.options.cun;
			this.i = 0;

			//判断是否向左滚动
			if (this.direction == 'left') {
				if (this.$scrollBox.width() / this.itemWidth < this.len) {
					//复制追加两个到尾部
					this.$box.append(this.$box.children().clone());
					this.$box.append(this.$box.children().clone());
					this.auto();
					this.next();
					this.clear();
					this.prev();
				};
			}

			//判断是否向上滚动
			else if (this.direction == 'top') {
				if (Math.ceil(this.$scrollBox.height() / this.itemHeight) < this.len) {
					//复制追加两个到尾部
					this.$box.append(this.$box.children().clone());
					this.$box.append(this.$box.children().clone());
					this.auto();
					this.next();
					this.clear();
					this.prev();
				};
			};



		},
		defaults: function() {
			//向左滚动
			if (this.direction == 'left') {
				//滚动宽度
				this.i -= this.itemWidth * this.cun;
				//当滚动宽度大于等于总宽度
				var sum = parseInt(this.len) + parseInt(this.cun);
				if (-this.i >= sum * this.itemWidth) {
					this.$box.css('margin-left', 0);
					this.i = -this.cun * this.itemWidth;
				};
				this.$box.stop().animate({
					'margin-left': this.i + 'px'
				});
			};
			//向上滚动
			if (this.direction == 'top') {
				//滚动高度
				this.i -= this.itemHeight * this.cun;
				//当滚动宽度大于等于总高度
				var sum = parseInt(this.len) + parseInt(this.cun);
				if (-this.i >= sum * this.itemHeight) {
					this.$box.css('margin-top', 0);
					this.i = -this.cun * this.itemHeight;
				};
				this.$box.stop().animate({
					'margin-top': this.i + 'px'
				});
			};
		},
		auto: function() {
			var _self = this;
			this.time = setInterval(function() {
				_self.defaults();
			}, this.options.speed);

		},
		next: function() {
			var _self = this;
			this.$nextBtn.bind({
				click: function() {
					_self.defaults();
				}
			});
		},
		prev: function() {
			var _self = this;
			this.$prevBtn.bind({
				click: function() {
					//向左滚动
					if (_self.direction == 'left') {
						//滚动宽度
						_self.i += _self.itemWidth * _self.cun;
						//当滚动宽度大于等于0
						var sum = parseInt(_self.len) + parseInt(_self.cun);
						if (_self.i >= 0) {
							_self.$box.css('margin-left', -(sum) * _self.itemWidth + 'px');
							_self.i = -_self.len * _self.itemWidth;
						};
						_self.$box.stop().animate({
							'margin-left': _self.i + 'px'
						});
					};
					//向右滚动
					if (_self.direction == 'top') {
						//滚动高度
						_self.i += _self.itemHeight * _self.cun;
						//当滚动宽度大于等于0
						var sum = parseInt(_self.len) + parseInt(_self.cun);
						if (_self.i >= 0) {
							_self.$box.css('margin-top', -(sum) * _self.itemHeight + 'px');
							_self.i = -_self.len * _self.itemHeight;
						};
						_self.$box.stop().animate({
							'margin-top': _self.i + 'px'
						});
					};
				}
			});
		},
		clear: function() {
			var _self = this;
			this.$scrollWrap.bind({
				mouseenter: function() {
					clearInterval(_self.time);
				},
				mouseleave: function() {
					_self.auto();
				}
			});
		},
		debug: function($message) {
			if (typeof $message == 'undefined') {
				$message = this;
			} else if (window.console && window.console.log) {
				window.console.log($message);
			} else {
				alert($message);
			}
		},
		callback: function(evt) {
			if (typeof this.options[evt + 'callback'] != 'function') {
				return false;
			} else {
				this.options[evt + 'callback'].call(this);
			}
		}
	};

})(jQuery);