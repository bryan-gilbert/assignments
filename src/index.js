import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AmountOutput from './AmountOutput';
import Amount from './Amount';

import getCountryCodes from './countryCodes';
import fetchCurrency from './currencyLookup';
import CountryList from './Select';

import TestComponentCorrect from './question2/TestComponent';
import SeriesCalculator from './question3/SeriesCalculator';


ReactDOM.render(<TestComponentCorrect />, document.getElementById('testComponent'));
ReactDOM.render(<SeriesCalculator />, document.getElementById('series'));


let defaultSrcCurrency = {ccode: "CA", currencyCode: "CAD", symbol: "$", name: "Canada"};
let defaultDstCurrency = {ccode: "US", currencyCode: "USD", symbol: "$", name: "United States"};


class Container extends React.Component {
	constructor(props) {
		super(props);
		this.composeState = this.composeState.bind(this);
		this.updateInput = this.updateInput.bind(this);
		this.selectSource = this.selectSource.bind(this);
		this.selectDestination = this.selectDestination.bind(this);
		this.state = {
			amount: 1.0,
			displayedAmount: 1.0,
			srcCurrency: defaultSrcCurrency,
			dstCurrency: defaultDstCurrency
		};
	}

	updateInput(newAmount) {
		const _this = this;
		console.log('newAmount', newAmount);
		this.composeState(newAmount,this.state.srcCurrency, this.state.dstCurrency)
		.then((s) => {
			_this.setState(s);
		})
	}

	selectSource(target) {
		const _this = this;
		console.log('selectSrc', target);
		this.composeState(this.state.amount,target, this.state.dstCurrency)
		.then((s) => {
			_this.setState(s);
		});
	}

	selectDestination(target) {
		const _this = this;
		console.log('selectDst', target);
		this.composeState(this.state.amount,this.state.srcCurrency, target)
		.then((s) => {
			_this.setState(s);
		})
	}


	composeState(amount, src, dst) {
		if (src && dst) {
			console.log("have src and dst", src, dst);
			return fetchCurrency(src.currencyCode, dst.currencyCode)
			.then((values) => {
				let srcAmountInEur = values.src * amount;
				let convertedAmount = values.dst * srcAmountInEur;
				let displayAmount = src.symbol + ' ' + Number(amount).toLocaleString('en');
				let displayConverted = dst.symbol + ' ' + Number(convertedAmount).toLocaleString('en');
				console.log("convertedAmount, displayConverted", convertedAmount, displayConverted);
				let results = {
					amount: amount,
					convertedAmount : convertedAmount,
					displayedAmount: displayAmount,
					displayConverted: displayConverted,
					srcCurrency: src,
					dstCurrency: dst
				};
				return results;
			});
		} else {
			return Promise.resolve({
						amount: 1.0,
						convertedAmount: 1.0,
						displayedAmount: '',
						displayConverted: ""
					}
			);
		}
	}
	render() {
		var amount = this.state.amount;
		var displayConverted = this.state.displayConverted;
		var srcCurrency = this.state.srcCurrency;
		return <div>
			<Amount amount={amount} srcCurrency={srcCurrency} callbackFromParent={this.updateInput}/>
			<AmountOutput amount={displayConverted} srcCurrency={srcCurrency}/>
			<CountryList
					id="src"
					title="Convert From"
					countryCodes={this.props.countryCodes}
					callbackFromParent={this.selectSource}/>
			<CountryList
					id="dst"
					title="Convert To"
					countryCodes={this.props.countryCodes}
					callbackFromParent={this.selectDestination}/>
		</div>
	}
}



getCountryCodes().then(countryCodes => {
	ReactDOM.render(<Container countryCodes={countryCodes}/>, document.getElementById('currencyConversion'));

})

