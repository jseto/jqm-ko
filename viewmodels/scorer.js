var Scorer = ViewModel.extend({
	init: function ( pageid ) {		
		this.header = { title: ko.observable( locale.header.scorer ) }
		this._super( pageid );
	},

	setMatch: function( match ) {
		ko.mapping.fromJS( match, {}, this );
	}
});