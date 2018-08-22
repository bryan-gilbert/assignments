import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

/*
Display a dropdown list of countries.  On selection pass the selected country back to the parent via callbackFromParent
 */
class CountryList extends React.Component {

	constructor(props) {
		super(props);
		this.onTargetSelect = this.onTargetSelect.bind(this);
		this.state = { title: props.title };
	}
	
	onTargetSelect(target) {
		//console.log(target);
		// display the selected country on the drop down
		this.setState({ title: target.name });
		this.props.callbackFromParent(target);
	}

	render() {
		var dict = this.props.countryCodes;
		return (
				<DropdownButton title={this.state.title} id="dropdown-target">
					{Object.keys(dict).map(key => {
						var value = dict[key];
						return <MenuItem
								key={key}
								href={`#${value}`}
								onSelect={() => this.onTargetSelect(value) }>
								{ value.name + ' ' + value.symbol}
							</MenuItem>
					})
					}
				</DropdownButton>
		);
	}

}


export default CountryList;
