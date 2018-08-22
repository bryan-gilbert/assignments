import React from 'react';


class Amount extends React.Component {
	constructor(props) {
		super(props);
		let amount = props.amount;
		this.state = {amount: amount};
    this.handleChange = this.handleChange.bind(this);
  }

	updateState(amount) {
    this.setState({amount: amount});
		this.props.callbackFromParent(amount);  
	}
	
  handleChange(event) {
  	this.updateState(event.target.value);
  }
  
	render() {
		return 	<label> 
			Amount:
			<input type="currency" value={this.state.amount} onChange={this.handleChange} />
		</label>
	}
}

export default Amount;
