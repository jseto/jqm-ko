function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
	this.caption = ko.computed( function() {
		return this.team1() + ' vs. ' + this.team2();
	}, this );
}
/*
var ViewModel = Class.extend({
	init: function() {
		this	
	},
	generatePage: function()
});
*/
function ActiveMatchesList()  {
	var self = this;
	self.appliedBindings = false;

	var page = generatePage( 'activeMatches', 'activeMatches.html' );

	// Locales for this view
	ko.mapping.fromJS( locale, {}, this );

/***** Data ***********/
	self.headerTitle = ko.observable( locale.header_title );
	self.matches = ko.observableArray( [] );
	self.selectedMatch = ko.observable( null );

	// Get the match list from RESTfull server
	if ( !self.matches.lenght ) {
		$.getJSON( config.remoteUrl + '/get_active_matches', function( all_data ) {
	        var mappedMatches = $.map( all_data, function( match ) { 
	        	return new Match( match ) });
	        self.matches( mappedMatches );
		});
	}

/***** Behaviour ******/
	self.showDetails = function( match ) {
		if (match) {
			self.headerTitle( match.caption() );
		}
		self.selectedMatch( match );
	}

	self.show = function( data ) {
		$.mobile.changePage( page, data.options );
		if ( !self.appliedBindings ) {
			ko.applyBindings( self );	
			self.applyBindings = true;	
		}
	}
}

