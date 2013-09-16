function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
	this.caption = ko.computed( function() {
		return this.team1() + ' vs. ' + this.team2();
	}, this );
	return this;
}

var ActiveMatches = ViewModel.extend({
	page: { id: 'activeMatches' },

	init: function( data ) {
		var self = this;

		$.mobile.iscrollview.prototype.options.pullDownResetText = Locale.get('activeMatches.pulldownLabel')
		$.mobile.iscrollview.prototype.options.pullDownPulledText = Locale.get('activeMatches.releaseLabel')
		$.mobile.iscrollview.prototype.options.pullDownLoadingText = Locale.get('activeMatches.loadingLabel')

		self._super( data );

		self.matches = ko.observableArray( [] );
		self.requestMatches();
	},

	requestMatches: function(){
		// Get the match list from RESTfull server
		var self = this;
		if ( !self.matches.lenght ) {
			$.getJSON( config.remoteUrl + '/get_active_matches', function( all_data ) {
		        var mappedMatches = $.map( all_data, function( match ) { 
		        	return new Match( match ) });
		        self.matches( mappedMatches );
			});
		}
	},

	showMatch: function( match ) {
		if (match) {
			viewModels.scorer.setMatch( match );
			viewModels.scorer.show( { transition: 'slide' } );
		}
	},

	onPageInit: function( event ) {
		this._super( event );
		var self = this;
		self.$page.find('.iscroll-wrapper').on( 'iscroll_onpulldown', function( event, data ){
			self.requestMatches();
			self.$page.find('#listview').listview('refresh');
			data.iscrollview.refresh();
		});
	}

});

