import React from 'react';
import AmountOutput from './AmountOutput';
import Amount from './Amount';
import fetchCurrency from './currencyLookup';
import CountryList from './CountryList';

/**
 * Container is the root component of the Currency Calculator.
 *
 * It creates the input form that contains a number input (currency in)
 * and two drop down lists with the countries.  As the user makes changes to these
 * input Container will update the results.  But only when we have all three inputs.
 *
 * Uses fetchCurrency() to retrieve the conversion rates.
 *
 * Uses outer container needs to provide the list of countries.  See props.countryCodes.
 *
 * See TODO's below
 */

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
			srcCurrency: undefined,
			dstCurrency: undefined
		};
	}

	updateInput(newAmount) {
		const _this = this;
		//console.log('newAmount', newAmount);
		this.composeState(newAmount,this.state.srcCurrency, this.state.dstCurrency)
		.then((s) => {
			_this.setState(s);
		})
	}

	selectSource(target) {
		const _this = this;
		//console.log('selectSrc', target);
		this.composeState(this.state.amount,target, this.state.dstCurrency)
		.then((s) => {
			_this.setState(s);
		});
	}

	selectDestination(target) {
		const _this = this;
		//console.log('selectDst', target);
		this.composeState(this.state.amount,this.state.srcCurrency, target)
		.then((s) => {
			_this.setState(s);
		})
	}


	composeState(amount, src, dst) {
		if (src && dst) {
			return fetchCurrency(src.currencyCode, dst.currencyCode)
			.then((values) => {
				let srcAmountInEur = values.src * amount;
				let convertedAmount = values.dst * srcAmountInEur;
				let displayAmount = src.symbol + ' ' + Number(amount).toLocaleString('en');
				let displayConverted = dst.symbol + ' ' + Number(convertedAmount).toLocaleString('en');
				//console.log("convertedAmount, displayConverted", convertedAmount, displayConverted);
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
						amount: amount,
						srcCurrency: src,
						dstCurrency: dst
					}
			);
		}
	}
	render() {
		var amount = this.state.amount;
		var displayConverted = this.state.displayConverted;
		var srcCurrency = this.state.srcCurrency;
		// TODO improve the CSS layout. Add space between elements.
		// TODO Improve look and feel. Improve instructions.
		// TODO Select some countries to be at the top of the list. Like CAD, USD, etc.
		return <div>

			<div className="Q1">
				<header className="Q1-header">
					<h1 className="Q1-title">Currencies</h1>
				</header>
				<p className="Q1-intro">
					Ready to get currency exchange rates?  Select the starting and ending country and enter an amount.
				</p>
			</div>

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

export default Container;