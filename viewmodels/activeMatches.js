function Match( match ) {
	ko.mapping.fromJS( match, {}, this );
/*	this.id = ko.observable( match.id ),
	this.team1 = ko.observable( match.team1 ),
	this.team2 = ko.observable( match.team2 ),
	this.score1 = ko.observable( match.score1 ),
	this.score2 = ko.observable( match.score2 ),
	this.status = ko.observable( match.status )
*/}

function ActiveMatchesList( locale )  {
	var self = this;
	self.matches = ko.observableArray( [] );
	ko.mapping.fromJS( locale, {}, this );

	$.getJSON( config.remoteUrl + '/get_active_matches', function( all_data ) {
        var mappedMatches = $.map( all_data, function( match ) { 
        	return new Match( match ) });
        self.matches( mappedMatches );
	})
}

