var Scorer = ViewModel.extend({
	setMatch: function( match ) {
		ko.mapping.fromJS( match, {}, this );
	}
});