var Scorer = ViewModel.extend({
	setMatch: function( match ) {
		ko.mapping.fromJS( match, {}, this );
	},

	addPointTeam1: function() {
		this.score1( this.score1()+1 );
	},

	addPointTeam2: function() {
		this.score2( this.score2()+1 );
	},

	substractPointTeam1: function() {
		if ( this.score1() > 0 ) {
			this.score1( this.score1()-1 );
		}
	},

	substractPointTeam2: function() {
		if ( this.score2() > 0 ) {
			this.score2( this.score2()-1 );
		}
	}
});