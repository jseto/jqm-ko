function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
	this.caption = ko.computed( function() {
		return this.team1() + ' vs. ' + this.team2();
	}, this );
}

function ActiveMatchesList( locale )  {
	var self = this;


	// Locales for this view
	ko.mapping.fromJS( locale, {}, this );

/***** Data ***********/
	self.headerTitle = ko.observable( locale.header_title );
	self.matches = ko.observableArray( [] );
	self.selectedMatch = ko.observable( null );
	self.showingList = ko.computed( function() {
		var a = self.selectedMatch();
		var b = self.matches().length;
		var result = a==null && b; //( self.selectedMatch() == null ) && ( self.matches().lenght );
		return a==null;
	}, this);


/***** Behaviour ******/
	self.showList = function( show ) {
		self.showDetails( null ); //hide detail view

		if ( show && ( !self.matches.lenght ) ) {
			self.loadData();
		}
		self.headerTitle( locale.header_title );
	}

	self.showDetails = function( match ) {
		if (match) {
			self.headerTitle( match.caption() );
		}
		self.selectedMatch( match );
	}

	// Get the match list from RESTfull server
	self.loadData = function() {
		$.getJSON( config.remoteUrl + '/get_active_matches', function( all_data ) {
	        var mappedMatches = $.map( all_data, function( match ) { 
	        	return new Match( match ) });
	        self.matches( mappedMatches );
		});
	}

	self.showList( true );
}

