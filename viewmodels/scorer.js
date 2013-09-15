var Scorer = ViewModel.extend({
	page: {
		id: 'scorer',
		attributes: {
			'data-add-back-btn': true,
			'data-back-btn-text': { locale: 'header.backButtonText' },
		}
	},
	header: {
		attributes: {
			"data-fullscreen": true,
		}
	},
	footer: {
		attributes: {
			"data-fullscreen": true,
		}
	},

	setMatch: function( match ) {
		if ( this.match ) {
			ko.cleanNode( this.$page.find('[data-role="content"]')[0] );
			this.match = match;
			ko.applyBindings( this, this.$page.find('[data-role="content"]')[0] );
		}
		else {
			this.match = match;
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