import React from 'react';

class TestComponentCorrect extends React.Component {
	constructor(props) {
		// Fix 1: invoke super constructor
		super(props);
		// set the default internal state
		this.state = {
			clicks: 0
		};
		// Fix 2: bind the click handler to this object so the method has access to the instance
		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.refs.myComponentDiv.addEventListener(
            'click',
		this.clickHandler
	);
	}

	componentWillUnmount() {
		this.refs.myComponentDiv.removeEventListener(
				'click',
		this.clickHandler
	);
	}

	clickHandler() {
		// Fix 3: the code attempted to dereference this.click which does not exist.
		// Change to reference the click property in the state
		this.setState({
			clicks: this.state.clicks + 1
		});
	}

	render() {
		let children = this.props.children;

		return (
				<div className="test-component" ref="myComponentDiv">
                <h2>Test Component ({this.state.clicks} clicks})</h2>
								<h3>{this.props.headerText}</h3>
		{children}
	</div>
	);
	}
}


export default TestComponentCorrect;
