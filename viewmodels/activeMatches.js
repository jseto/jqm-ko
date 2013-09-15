function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
	this.caption = ko.computed( function() {
		return this.team1() + ' vs. ' + this.team2();
	}, this );
	return this;
}

var ActiveMatches = ViewModel.extend({
	page: { id: 'activeMatches' },

	init: function( pageid, data ) {
		var self = this;
		self._super( pageid, data );

		self.matches = ko.observableArray( [] );

		// Get the match list from RESTfull server
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
});

