var Scorer = ViewModel.extend({
	setMatch: function( match ) {
		var unwrap = ko.mapping.toJS( match );
		if ( !this.match ) {
			this.match = ko.mapping.fromJS( unwrap );
		}
		else {
			ko.mapping.fromJS( unwrap, this.match );
		}
	},

	addPointTeam1: function() {
		this.match.score1( this.match.score1()+1 );
		this.postScores();
	},

	addPointTeam2: function() {
		this.match.score2( this.match.score2()+1 );
		this.postScores();
	},

	substractPointTeam1: function() {
		if ( this.match.score1() > 0 ) {
			this.match.score1( this.match.score1()-1 );
			this.postScores();
		}
	},

	substractPointTeam2: function() {
		if ( this.match.score2() > 0 ) {
			this.match.score2( this.match.score2()-1 );
			this.postScores();
		}
	},

	postScores: function() {
		$.ajax({
			url: config.remoteUrl + '/update_score',
			type: 'POST',
			data: ko.mapping.toJS( this.match ),
		})
	},
});