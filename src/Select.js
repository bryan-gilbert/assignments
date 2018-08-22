import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class CountryList extends React.Component {

	constructor(props) {
		super(props);
		this.onTargetSelect = this.onTargetSelect.bind(this);
		this.dict = props.countryCodes;
		this.state = { title: props.title };
	}
	
	onTargetSelect(target) {
		console.log(target);
		this.setState({ title: target.name });
		this.props.callbackFromParent(target);
	}

	render() {
		var dict = this.dict;
		return (
				<DropdownButton title={this.state.title} id="dropdown-target">
					{Object.keys(dict).map(key => {
						var value = dict[key];
						//console.log(key,value);
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
