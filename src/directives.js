// mostly taken from http://www.codinginsight.com/angularjs-and-pickadate/

angular.module('angular-datepicker', [])
	.directive('pickADate', function () {
	    return {
	        restrict: "A",
	        scope: {
	            pickADate: '=',
	            minDate: '=',
	            maxDate: '='
	        },
	        link: function (scope, element, attrs) {
	            element.pickadate({
	                onSet: function (e) {
	                    if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
	                        return;
	                    var select = element.pickadate('picker').get('select'); // selected date
	                    scope.$apply(function () {
	                        if (e.hasOwnProperty('clear')) {
	                            scope.pickADate = null;
	                            return;
	                        }
	                        if (!scope.pickADate || typeof scope.pickADate === 'string')
	                            scope.pickADate = new Date(0);
	                        scope.pickADate.setYear(select.obj.getYear() + 1900); // hello Y2K...
	                        // It took me half a day to figure out that javascript Date object's getYear
	                        // function returns the years since 1900. Ironically setYear() accepts the actual year A.D.
	                        // So as I got the $#%^ 114 and set it, guess what, I was transported to ancient Rome 114 A.D.
	                        // That's it I'm done being a programmer, I'd rather go serve Emperor Trajan as a sex slave.
	                        scope.pickADate.setMonth(select.obj.getMonth());
	                        scope.pickADate.setDate(select.obj.getDate());
	                    });
	                },
	                onClose: function () {
						if (typeof cordova === 'undefined' || !cordova.plugins || !cordova.plugins.Keyboard) {
							return;
						}

						var keyboardShowCallback = function () {
							cordova.plugins.Keyboard.close();
							window.removeEventListener('native.keyboardshow', this);
						};

						window.addEventListener('native.keyboardshow', keyboardShowCallback);

						setTimeout(function () {
							window.removeEventListener('native.keyboardshow', keyboardShowCallback);
						}, 500);
	                },
					container: document.body
	            });

				setTimeout(function() {
					if (scope.pickADate) {
						element.pickadate('picker').set('select', scope.pickADate);
					}
				}, 1000);
	        }
	    };
	})
	.directive('pickATime', function () {
	    return {
	        restrict: "A",
	        scope: {
	            pickATime: '='
	        },
	        link: function (scope, element, attrs) {
	            element.pickatime({
	                onSet: function (e) {
	                    if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
	                        return;
	                    var select = element.pickatime('picker').get('select'); // selected date
	                    scope.$apply(function () {
	                        if (e.hasOwnProperty('clear')) {
	                            scope.pickATime = null;
	                            return;
	                        }
	                        if (!scope.pickATime || typeof scope.pickATime === 'string')
	                            scope.pickATime = new Date();

	                        scope.pickATime.setHours(select.hour);
	                        scope.pickATime.setMinutes(select.mins);
	                        scope.pickATime.setSeconds(0);
	                        scope.pickATime.setMilliseconds(0);
	                    });
	                },
	                onClose: function () {
						if (typeof cordova ==='undefined' || !cordova.plugins || !cordova.plugins.Keyboard) {
							return;
						}
						
						var keyboardShowCallback = function () {
							cordova.plugins.Keyboard.close();
							window.removeEventListener('native.keyboardshow', this);
						};

						window.addEventListener('native.keyboardshow', keyboardShowCallback);
						
						setTimeout(function () {
							window.removeEventListener('native.keyboardshow', keyboardShowCallback);
						}, 500);
	                },
					container: document.body
	            });

				setTimeout(function() {
					if (scope.pickATime) {
						element.pickatime('picker').set('select', scope.pickATime);
					}
				}, 1000);
	        }
	    };
	});	