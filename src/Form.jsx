import React from 'react'
class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currency_rates: '',
            isLoaded: false,
            base_currency: '',
            output_currency: '',
            input_amount : '',
            output_amount: ''
        }
    }

    componentDidMount = () => {
        fetch("https://api.exchangeratesapi.io/latest?base=USD")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    currency_rates: result.rates,
                    isLoaded: true
                })
            }
        )
    }
    
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        if (this.state.base_currency.length > 0 && parseInt(this.state.input_amount) > 0 && this.state.output_currency.length > 0){
            const rate = this.state.output_currency.split('/')[0]/this.state.base_currency.split('/')[0]
            const output = rate * this.state.input_amount
            this.setState({
                output_amount: output
            })
        }
    }

    clearForm = (e) => {
        e.preventDefault()
        this.setState({
            base_currency: '',
            output_currency: '',
            input_amount : '',
            output_amount: ''
        })
    }
    
    render(){
        const errorMsg = (base_currency, output_currency) =>{
            if(base_currency === output_currency && base_currency && output_currency){
                return (
                    <div className="form-group col-md-12">
                        <p>Both the currency cannot be same</p>
                    </div>
                )
            }
        }

        const button = (output_amount) => {
            if(output_amount){
                return <button className="btn btn-outline-light text-white" onClick={this.clearForm}>Clear</button>
            }
            else{
                return <button className="btn btn-outline-light text-white">Convert</button>
            }
        }
        return (
            <form onSubmit={this.submitHandler} className="text-white">
                <h2 className="text-white">Currency Convertor</h2>
                <hr/>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Base currency</label>
                        <select className="form-control" name="base_currency" onChange={this.changeHandler} value={this.state.base_currency} required>
                            <option value="">Select currency</option>
                            {
                                this.state.isLoaded && Object.keys(this.state.currency_rates).map((rate,index) => <option key={index} value={this.state.currency_rates[rate] + '/' + rate}>{rate}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Output currency</label>
                        <select className="form-control" name="output_currency" onChange={this.changeHandler} value={this.state.output_currency} required size="1">
                            <option value="">Select currency</option>
                            {
                                this.state.isLoaded && Object.keys(this.state.currency_rates).map((rate,index) => <option key={index} value={this.state.currency_rates[rate] + '/' + rate}>{rate}</option>)
                            }
                        </select>
                    </div>
                    {errorMsg(this.state.base_currency, this.state.output_currency)}
                    <div className="form-group col-md-12">
                        <label>Enter the amount</label>
                        <input type="number" min="0" name="input_amount" className="form-control" onChange={this.changeHandler} value={this.state.input_amount} required/>
                        <hr/>
                    </div>
                    {this.state.output_amount && 
                    <>
                        <div className="form-group col-md-12">
                            <label>Converted amount <span>({this.state.base_currency.split('/')[1]} to {this.state.output_currency.split('/')[1]})</span></label>
                            <input className="form-control" value={this.state.output_amount} required readOnly/> 
                            <hr/>
                        </div>
                    </>
                    }
                </div>
                <center>
                    {button(this.state.output_amount)}
                </center>
            </form>
        )   
    }
}
export default Form