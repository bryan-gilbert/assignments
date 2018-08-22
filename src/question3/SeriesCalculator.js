import React from 'react';

class Amount extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	updateState(amount) {
		// this.setState({amount: amount});
		this.props.callbackFromParent(amount);
	}

	handleChange(event) {
		let min = this.props.min ? this.props.min : 0;
		let max = this.props.max ? this.props.max : Number.MAX_SAFE_INTEGER;
		let v = Number(event.target.value);
		if (v >= min && v <= max) {
			this.updateState(v);
		} else {
			this.updateState(1);
		}
	}

	render() {
		//console.log("render amount", this.state, this.props)
		let theLabel = this.props.label;
		return <span>	<label>{theLabel}</label>
				<input type="number" value={this.props.amount} onChange={this.handleChange} />
		</span>
	}
}


class AmountOutput extends React.Component {
	render() {
		return 	<label>
			{this.props.label}  {this.props.amount}
		</label>
	}
}

function question3(inputs) {
	let start = inputs.seriesStart;
	let end = inputs.seriesEnd;
	let incr = inputs.seriesIncrement;
	let type = inputs.seriesType;
	let specifiedDigit = ''+ inputs.specifiedDigit;
	var re = new RegExp(specifiedDigit, 'g');
	//console.log("look for ", specifiedDigit);
	let series = [];
	let total = 0;
	for(var i = start; i < end; i += incr) {
		let str = '' + i;
		var count = (str.match(re) || []).length;
		if(type === 1) {
			series.push(i);
			total += count;
		} else if(type === 2) {
			if(i % 2 === 0) {
				series.push(i);
				total += count;
			}
		} else if(type === 3) {
			if(i % 2 === 1) {
				series.push(i);
				total += count;
			}
		}
	}
	let calculatedResults = total;
	inputs.calculatedResults = calculatedResults;
	inputs.series = series;
	//console.log(inputs,series);
}

class SeriesCalculator extends React.Component {
	constructor(props) {
		super(props);
		this.types =['all','even','odd'];
		this.state = 	{
			series: [],
			seriesStart: 1,
			seriesEnd : 11,
			seriesIncrement: 1,
			seriesType: 1,
			calculatedResults: 0,
			specifiedDigit: 1
		};
		this.updateStart = this.updateStart.bind(this);
		this.updateEnd = this.updateEnd.bind(this);
		this.updateIncrement = this.updateIncrement.bind(this);
		this.updateType = this.updateType.bind(this);
		this.updateAnswer = this.updateAnswer.bind(this);
		this.updateSpecifiedDigit = this.updateSpecifiedDigit.bind(this);
	}

	componentDidMount() {
		this.updateAnswer(1,23,1,1,1);
	}

	updateSpecifiedDigit(digit) {
		var checkedValue = Number(digit);
		this.updateAnswer(this.state.seriesStart, this.state.seriesEnd, this.state.seriesIncrement, this.state.seriesType, checkedValue);
	}
	updateStart(value) {
		var checkedValue = Number(value);
		this.updateAnswer(checkedValue, this.state.seriesEnd, this.state.seriesIncrement, this.state.seriesType, this.state.specifiedDigit);
	}
	updateEnd(value) {
		var checkedValue = Number(value);
		this.updateAnswer(this.state.seriesStart,checkedValue, this.state.seriesIncrement, this.state.seriesType, this.state.specifiedDigit);
	}
	updateIncrement(value) {
		var checkedValue = Number(value);
		this.updateAnswer(this.state.seriesStart,this.state.seriesEnd, checkedValue, this.state.seriesType, this.state.specifiedDigit);
	}
	updateType(value) {
		var checkedValue = Number(value);
		this.updateAnswer(this.state.seriesStart,this.state.seriesEnd, this.state.seriesIncrement, checkedValue, this.state.specifiedDigit);
	}

	updateAnswer(start, end, incr, type, digit) {
		console.log(start, end, incr, type, digit);
		let results = {
			series: [],
			seriesStart: start,
			seriesEnd: end,
			seriesIncrement: incr,
			seriesType: type,
			specifiedDigit : digit
		};
		question3(results);
		this.setState(results);
	}

	render() {
		//console.log("render series", this.state);
		let seriesStart = this.state.seriesStart;
		let series = this.state.series.join(',');
		console.log(series);
		return (
				<div className="test-component" ref="seriesContainer">
					<dl>
						<dt>Start</dt>
						<dd><Amount amount={seriesStart} callbackFromParent={this.updateStart}/></dd>

						<dt>End</dt>
						<dd><Amount amount={this.state.seriesEnd} callbackFromParent={this.updateEnd}/></dd>

						<dt>Increment</dt>
						<dd><Amount amount={this.state.seriesIncrement} callbackFromParent={this.updateIncrement}/></dd>

						<dt>Specified Digit</dt>
						<dd><Amount amount={this.state.specifiedDigit} max={9} min={0} callbackFromParent={this.updateSpecifiedDigit}/></dd>

						<dt>Type</dt>
						<dd><Amount amount={this.state.seriesType} max={3} min={1} callbackFromParent={this.updateType}/></dd>
					</dl>
					<AmountOutput label="results" amount={this.state.calculatedResults} />
					<div>{series}</div>
				</div>
	);
	}
}


export default SeriesCalculator;
