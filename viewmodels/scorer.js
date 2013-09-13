var Scorer = ViewModel.extend({
	init: function ( pageid, data ) {		
		this.header = { title: ko.observable( locale.header.scorer ) }
		this._super( pageid, data );
	}
});