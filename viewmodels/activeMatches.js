function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
	this.caption = ko.computed( function() {
		return this.team1() + ' vs. ' + this.team2();
	}, this );
}

var ActiveMatches = ViewModel.extend({
	init: function( pageid ) {
		var self = this;

		self._super( pageid );
		self.matches = ko.observableArray( [] );
//		self.selectedMatch = ko.observable( null );

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
			viewModels.scorer = new Scorer( 'scorer', match );
			$.mobile.changePage( '#scorer' );
//			self.headerTitle( match.caption() );
		}
//		self.selectedMatch( match );
	},
});

