// This command is responsible for raising the event to the server.
Ext.define('Sjs.apps.player.app.controller.command.RaiseEventCommand', {
	extend: 'Sjs.apps.player.app.controller.command.Command',
	event: '',
	blocking: false,
	clientOnly: false,

	constructor: function(controller, event, blocking, clientOnly) {
		this.controller = controller;
		this.event = event;
		this.blocking = blocking || false;
		this.clientOnly = clientOnly || false;
	},

	// Raise event locally on the client if listener is specified
	raiseEvent: function() {
		var me = this;

		var executionChain = function (listeners) {
			var current = -1;
			var _execute = function (callback) {
				if (listeners[current] &&
						listeners[current].listener &&
						typeof listeners[current].listener === 'function') {
					var obj = listeners[current];
					var args = [me.controller.learningContext, me.controller.currentActivity, callback];

					if(obj.scope && typeof(obj.scope) == 'object') {
						obj.listener.apply(obj.scope, args);
					} else {
						obj.listener(me.controller.learningContext, me.controller.currentActivity, callback);
					}

					if(!me.blocking || !obj.async) {
						_next();
					}
				}
			};

			var callback = {
				'next': _next,

				'error': function(e) {
					if(me.blocking) {
						throw e;
					}
				}
			};

			var _next = function () {
				current++;
				if(listeners && listeners.length && current < listeners.length) {
					try {
						_execute(callback);
					} catch (e) {
						if(me.blocking) {
							throw e;
						} else {
							_next();
						}
					}
				}
			};
			callback.next = _next;

			return callback;
		};


		if(this.controller.playerListeners && this.controller.playerListeners[this.event]) {
			var listeners = [].concat( this.controller.playerListeners[this.event] );
			var chain = executionChain(listeners);

			try {
				chain.next();
			} catch(e) {
				e.severity = 'fatal';
				me.controller.handleError(e);
				return;
			}
		}
		if(this.event === 'onLessonLaunch') {
			this.controller.navigationRequest = null;
		}
		this.callParent([], this.execute);
	},

	getEventInfo: function() {
		if(this.event === 'onLessonLaunch') {
			this.controller.stopWatch.start();
		}

		if(this.event === 'onLessonExit') {
			this.controller.stopWatch.stop();

			//For Saba Video (Kaltura Video) Content send Current Time and Total Duration of Kaltura Video along with TimeSpent for deciding the Completion
			if(this.controller.contentInfo && this.controller.contentInfo.contentFormat == 17 && this.controller.contentInfo.vendorId =='KALTURA'){
			    var videoPlayer = Sjs.getCmp('cntinlinevideoplayer-'+this.controller.contentInfo.id);
			    if(videoPlayer && videoPlayer.videoProperties){
			        var kalturaPlayer = videoPlayer.videoProperties.kdp;
			        if(kalturaPlayer){
			            var onExitParams = {
                        				'@type': 'java.util.Map',
                        				'timeSpent': this.controller.stopWatch.formattedTime(),
                        				'kalturaCurrentTime': videoPlayer.videoProperties.videoEnded ? kalturaPlayer.evaluate('{duration}') : kalturaPlayer.evaluate('{video.player.currentTime}'),
                        				'kalturaVideoDuration': kalturaPlayer.evaluate('{duration}')
                        			};
                        videoPlayer.destroy();
                        return onExitParams;
			        }
			    }
			}else{
			    return {
                				'@type': 'java.util.Map',
                				'timeSpent': this.controller.stopWatch.formattedTime()
                			};
			}

		}
		if(this.controller && this.controller.learningContext && this.controller.learningContext.pinValue && this.event==="preLaunch")
		{
			return {
				'@type': 'java.util.Map',
				'Pin': this.controller.learningContext.pinValue
			};
		}
		else
		{
			return {
				'@type': 'java.util.Map'
			};
		}

	},

	execute: function() {
		var me = this,
		anonymousSubscriptionId = Player.context.learningContext.anonymousSubscriptionId;
		this.controller.notifyClient('Raising event:' + me.event);
		if(this.clientOnly) {
			this.raiseEvent();
			return;
		}


		var ajaxUrl = "/Saba/api/content/playerevent/raiseevent/event/{event}/context/{context}/subscription/{subscription}/activity/{activity}"
			.replace('{event}', me.event)
			.replace('{context}', me.controller.learningContext.contextId)
			.replace('{subscription}', me.controller.learningContext.subscriptionId)
			.replace('{activity}', me.controller.currentActivity ? encodeURIComponent(me.controller.currentActivity) : 'dummy');

		var successCallback = function(response, options) {
			me.raiseEvent();
		};

		var failureCallback = function(response, options) {
			var error = Ext.decode(response.responseText, true);
			if(error === null){
				me.controller.contentNotFound=true;
   				error = {
	   				errorCode: 404,
	   				errorMessage: $i18n($i18n.CONTENT,'kI18nPlayerMsg003')
	   			};
	   			me.blocking = true;
			} else {
				if(error.errorCode && (error.errorCode == 43328)){ // errorCode reserved for Incorrect PIn error...
					Sjs.apply(Player.context.learningContext, { 
		                'incorrectPin': true
		            });
				}	
			}
			
			me.controller.handleError({
				name: '' + error.errorCode,
				message: error.errorMessage,
				severity: (me.blocking) ? 'fatal' : 'ignore'
			});

			if(!me.blocking) {
				me.raiseEvent();
			}

		};

		Sjs.require('Sjs.Ajax', function() {
			Sjs.Ajax.request({
			url: ajaxUrl,
			disableCaching : true,
			method : "POST",
			success: successCallback,
			failure: failureCallback,
			scope  : this,
			timeout: 30000,
			headers: {
			    Accept: 'application/json',
			    AnonymousContentId: anonymousSubscriptionId
			},
			jsonData: me.getEventInfo()
		    });
		});

	}

});