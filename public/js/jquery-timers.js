/*
 * Modified from
 * http://jquery.offput.ca/every/
 */

jQuery.fn.extend( {
	everyTime : function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay);
		});
	},
	oneTime : function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	killTime : function(label, fn) {
		return this.each(function() {
			jQuery.timer.kill(this, label, fn);
		});
	},
	pauseTime : function(label, fn) {
		return this.each(function() {
			jQuery.timer.pause(this, label, fn);
		});
	},
	resumeTime : function(label, fn) {
		return this.each(function() {
			jQuery.timer.resume(this, label, fn);
		});
	},
	killAll : function() {
		return this.each(function() {
			jQuery.timer.kill_all(this);
		});
	},
	pauseAll : function() {
		return this.each(function() {
			jQuery.timer.pause_all(this);
		});
	},
	resumeAll : function() {
		return this.each(function() {
			jQuery.timer.resume_all(this);
		});
	},
	dumpAll : function() {
		return this.each(function() {
			jQuery.timer.list(this);
		});
	}
});

jQuery
		.extend( {
			timer : {
				guid : 1,
				global : {},
				regex : /^([0-9]+)\s*(.*s)?$/,
				powers : {
					// Yeah this is major overkill...
					'ms' : 1,
					'cs' : 10,
					'ds' : 100,
					's' : 1000,
					'das' : 10000,
					'hs' : 100000,
					'ks' : 1000000
				},
				timeParse : function(value) {
					if (value == undefined || value == null)
						return null;
					var result = this.regex.exec(jQuery.trim(value.toString()));
					if (result[2]) {
						var num = parseInt(result[1], 10);
						var mult = this.powers[result[2]] || 1;
						return num * mult;
					} else {
						return value;
					}
				},
				add : function(element, interval, label, fn, times, belay) {
					var counter = 0;

					if (jQuery.isFunction(label)) {
						if (!times)
							times = fn;
						fn = label;
						label = interval;
					}

					interval = jQuery.timer.timeParse(interval);

					if (typeof interval != 'number' || isNaN(interval)
							|| interval <= 0)
						return;

					if (times && times.constructor != Number) {
						belay = !!times;
						times = 0;
					}

					times = times || 0;
					belay = belay || false;

					if (!element.$timers)
						element.$timers = {};

					if (!element.$timers[label])
						element.$timers[label] = {};

					fn.$timerID = fn.$timerID || this.guid++;

					var handler = function() {
						if (belay && this.inProgress)
							return;
						this.inProgress = true;
						if ((++counter > times && times !== 0)
								|| fn.call(element, counter) === false)
							jQuery.timer.kill(element, label, fn);
						this.inProgress = false;
					};

					handler.$timerID = fn.$timerID;

					if (!element.$timers[label][fn.$timerID]) {
						handler.$interval = interval;
						handler.$timer = window.setInterval(handler, interval);
						element.$timers[label][fn.$timerID] = handler;
					}

					if (!this.global[label])
						this.global[label] = [];
					this.global[label].push(element);

				},
				resume : function(element, label, fn) {
					var timers = element.$timers, ret;
					if (timers) {
						if (!label) {
							for (label in timers)
								this.resume(element, label, fn);
						} else if (timers[label]) {
							if (fn) {
								if (fn.$timerID) {
									var handler = timers[label][fn.$timerID];
									if (!handler.$timer) {
										handler.$timer = window.setInterval(
												handler, handler.$interval);
										timers[label][fn.$timerID] = handler;
									}
								}
							} else {
								for ( var fn in timers[label]) {
									var handler = timers[label][fn];
									if (!handler.$timer) {
										handler.$timer = window.setInterval(
												handler, handler.$interval);
										timers[label][fn] = handler;
									}
								}
							}
						}
					}
				},
				pause : function(element, label, fn) {
					var timers = element.$timers, ret;
					if (timers) {
						if (!label) {
							for (label in timers)
								this.pause(element, label, fn);
						} else if (timers[label]) {
							if (fn) {
								if (fn.$timerID) {
									var handler = timers[label][fn.$timerID];
									window.clearInterval(handler.$timer);
									handler.$timer = null;
									timers[label][fn] = handler;
								}
							} else {
								for ( var fn in timers[label]) {
									var handler = timers[label][fn];
									window.clearInterval(handler.$timer);
									handler.$timer = null;
									timers[label][fn] = handler;
								}
							}
						}
					}
				},
				kill : function(element, label, fn) {
					var timers = element.$timers, ret;
					if (timers) {
						if (!label) {
							for (label in timers)
								this.kill(element, label, fn);
						} else if (timers[label]) {
							if (fn) {
								if (fn.$timerID) {
									var handler = timers[label][fn.$timerID];
									window.clearInterval(handler.$timer);
									delete timers[label][fn.$timerID];
								}
							} else {
								for ( var fn in timers[label]) {
									var handler = timers[label][fn];
									window.clearInterval(handler.$timer);
									delete timers[label][fn];
								}
							}

							for (ret in timers[label])
								break;
							if (!ret) {
								ret = null;
								delete timers[label];
							}
						}

						for (ret in timers)
							break;
						if (!ret)
							element.$timers = null;
					}
				},
				list : function(element) {
					var timers = element.$timers;
					for ( var label in timers) {
						for ( var fn in timers[label]) {
							var handler = timers[label][fn];
							alert("Timer [ label:" + label + " | id:"
									+ handler.$timerID + "]");
						}
					}
				},
				kill_all : function(element) {
					var timers = element.$timers;
					for ( var label in timers) {
						jQuery.timer.kill(element, label);
					}
				},
				pause_all : function(element) {
					var timers = element.$timers;
					for ( var label in timers) {
						jQuery.timer.pause(element, label);
					}
				},
				resume_all : function(element) {
					var timers = element.$timers;
					for ( var label in timers) {
						jQuery.timer.resume(element, label);
					}
				}
			}
		});

if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.timer.global;
		for ( var label in global) {
			var els = global[label], i = els.length;
			while (--i)
				jQuery.timer.remove(els[i], label);
		}
	});