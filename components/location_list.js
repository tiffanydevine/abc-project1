var React = require('react'); 
var LocationItem = require('./location_item');

var LocationList = React.createClass({
	render(){

		 var self = this; 
		 var locations = this.props.locations.map(function(l){
		 	var active = self.props.activeLocations == l.address; 

		 	return <LocationItem address={l.address} timestamp={l.timestamp} key={l.timestamp}
					active={active} onClick={self.props.onClick} />

		 }); 

		 if(!locations.length){
		 	return null; 
		 }


		return (
			<div className="list-group col-xs-12 col-md-6 col-md-offset-3">
				<span className="list-group-item active">Saved Locaitons</span>{locations}
			</div>
		)
	}
}); 

module.exports = LocationList;
