import React from 'react';


class AmountOutput extends React.Component {
	render() {
		return 	<label> 
			Amount:{this.props.amount}
		</label>
	}
}

export default AmountOutput;
