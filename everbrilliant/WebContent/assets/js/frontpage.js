( function($) {
		$(function() {

			var chart1 = new Highcharts.Chart({
				chart : {
					renderTo : 'chart1'
				},
				title : {
					text : 'Tokyo climate'
				},
				legend : {
					enabled : false
				},
				xAxis : [{
					categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				}],
				yAxis : [{// Primary yAxis
					labels : {
						formatter : function() {
							return this.value + '°C';
						},
						style : {
							color : '#DDDF0D'
						},
						align : 'left',
						x : 0,
						y : -2
					},
					showFirstLabel : false,
					title : {
						text : 'Temperature',
						style : {
							color : '#89A54E'
						}
					}
				}, {// Secondary yAxis
					title : {
						text : 'Rainfall',
						style : {
							color : '#4572A7'
						}
					},
					labels : {
						align : 'right',
						x : 0,
						y : -2,
						formatter : function() {
							return this.value + ' mm';
						},
						style : {
							color : '#4572A7'
						}
					},
					showFirstLabel : false,
					opposite : true
				}],
				tooltip : {
					formatter : function() {
						if (this.series.name == 'Sunshine') {
							return '<b>' + this.point.name + ':</b> ' + this.y;
						} else {
							return '' + this.x + ': ' + this.y + (this.series.name == 'Rainfall' ? ' mm' : '°C');
						}
					}
				},
				series : [{
					name : 'Rainfall',
					color : '#4572A7',
					type : 'column',
					yAxis : 1,
					data : [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

				}, {
					name : 'Temperature',
					color : '#DDDF0D',
					type : 'spline',
					data : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
				}, {
					name : 'Sunshine',
					type : 'pie',
					data : [{
						y : 2020,
						name : 'Sunshine hours',
						sliced : true
					}, {
						y : 6740,
						name : 'Non sunshine hours (including night)'
					}],
					dataLabels : {
						enabled : true,
						distance : 20,
						formatter : function() {
							if (this.point.name == 'Sunshine hours') {
								return this.point.name;
							} else {
								return null;
							}
						}
					},
					center : [60, 45],
					size : 50
				}]
			});

			// Create the stock example
			// Create the chart
			var chart2 = new Highcharts.StockChart({
				chart : {
					renderTo : 'chart2'
				},
				rangeSelector : {
					selected : 1,
					inputEnabled : false
				},

				navigator : {
					height : 30
				},

				title : {
					text : 'USD to EUR',
					floating : true,
					align : 'right',
					x : -20,
					top : 20
				},

				xAxis : {
					maxZoom : 14 * 24 * 3600000 // fourteen days
				},

				series : [{
					name : 'USD to EUR',
					data : usdeur,
					tooltip : {
						yDecimals : 4
					}
				}]
			});

			
			// The Clock
			function getNow() {
				var now = new Date();

				return {
					hours : now.getHours() + now.getMinutes() / 60,
					minutes : now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
					seconds : now.getSeconds() * 12 / 60
				};
			};

			
			function pad(number, length) {
				// Create an array of the remaining length +1 and join it with 0's
				return new Array((length || 2) + 1 - String(number).length).join(0) + number;
			}
			var now = getNow();

			// Create the chart
			var chart3 = new Highcharts.Chart({

				chart : {
					renderTo : 'chart3',
					type : 'gauge',
					backgroundColor: null,
					borderWidth: 0,
					height : 180
				},

				credits : {
					enabled : false
				},

				title : {
					text : null
				},

				pane : {
					background : [{
						backgroundColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
							[0, '#444444'],
							[1, '#111111']
							]
						},
						borderWidth: 0
					}, {
						backgroundColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0.5,
								y2: 1
							},
							stops: [
							[0, '#FFFFFF'],
							[1, '#000000']
							]
						},
						innerRadius: '103%',
						borderWidth: 0
					}, {
						// reflex for supported browsers
						backgroundColor : Highcharts.svg ? {
							radialGradient : {
								cx : 0.5,
								cy : -0.4,
								r : 1.9
							},
							stops : [
								[0.5, 'rgba(255, 255, 255, 0.05)'], 
								[0.5, 'rgba(0, 0, 0, 0.2)']
							]
						} : null,
						borderWidth: 0
					}]
				},

				yAxis : {
					labels : {
						distance : -20
					},
					min : 0,
					max : 12,
					lineWidth : 0,
					showFirstLabel : false,

					minorTickInterval : 'auto',
					minorTickWidth : 1,
					minorTickLength : 5,
					minorTickPosition : 'inside',
					minorGridLineWidth : 0,
					minorTickColor : '#666',

					tickInterval : 1,
					tickWidth : 2,
					tickPosition : 'inside',
					tickLength : 10,
					tickColor : '#666',
					title : {
						text : '<span style="font-size: 8px">Powered by</span><br/><span style="font-weight: normal; font-size: 11px">Highcharts</span>',
						style : {
							color : '#777777',
							lineHeight: '12px'
						},
						y : 10
					}
				},
				
				tooltip: {
			    	formatter: function () {
			    		return chart3.tooltipText;
			    	},
			    	shared: true
			    },

				series : [{
					data : [{
						id : 'hour',
						y : now.hours,
						dial : {
							radius : '60%',
							baseWidth : 4,
							baseLength : '95%',
							rearLength : 0,
							backgroundColor: 'white'
						}
					}, {
						id : 'minute',
						y : now.minutes,
						dial : {
							baseLength : '95%',
							rearLength : 0,
							backgroundColor: 'white'
						}
					}, {
						id : 'second',
						y : now.seconds,
						dial : {
							radius : '100%',
							baseWidth : 1,
							rearLength : '20%',
							backgroundColor: 'rgb(173, 204, 94)'
						}
					}],
					pivot: {
						backgroundColor: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
							[0, 'rgb(173, 204, 94)'],
							[1, '#416F29']
							]
						}
					},
					animation : false,
					dataLabels : {
						enabled : false
					}
				}]
			},

			// Move
			function(chart) {
				setInterval(function() {
					var hour = chart.get('hour'), minute = chart.get('minute'), second = chart.get('second'), now = getNow(),
					// run animation unless we're wrapping around from 59 to 0
					animation = now.seconds == 0 ? false : {
						easing : 'easeOutElastic'
					};
					
					// Cache the tooltip text
			        chart.tooltipText = 
						pad(Math.floor(now.hours), 2) + ':' + 
			    		pad(Math.floor(now.minutes * 5), 2) + ':' + 
			    		pad(now.seconds * 5, 2);

					hour.update(now.hours, true, animation);
					minute.update(now.minutes, true, animation);
					second.update(now.seconds, true, animation);

				}, 1000);

			});
			
		});

		
		// Extend jQuery with some easing (copied from jQuery UI)
		$.extend($.easing, {
			easeOutElastic : function(x, t, b, c, d) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				if (a < Math.abs(c)) {
					a = c;
					var s = p / 4;
				} else
					var s = p / (2 * Math.PI) * Math.asin(c / a);
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			}
		});
		
		
	}(jQuery));
