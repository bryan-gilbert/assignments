import React from 'react';

/*
Display a number and label
 */
class AmountOutput extends React.Component {
	// TODO allow for the label to be configurable
	render() {
		return 	<span>
			<label>Amount</label>
			<label>{this.props.amount}</label>
			</span>
	}
}

export default AmountOutput;
