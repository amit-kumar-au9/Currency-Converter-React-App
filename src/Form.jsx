import React from 'react'
class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currency: '',
            isLoaded: false,
            base: '',
            output: '',
            amount : '',
            output_amount: ''
        }
    }

    componentDidMount = () => {
        fetch("https://api.exchangeratesapi.io/latest?base=USD")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    currency: result,
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
        const rate = this.state.output/this.state.base
        const output = rate * this.state.amount
        this.setState({
            output_amount: output
        })
    }

    render(){
        return (
            <form className="bg-primary" onSubmit={this.submitHandler}>
                <h2 className="text-white">Currency Convertor</h2>
                <hr/>
                <label className="text-white">Base currency</label>
                <select className="form-control" name="base" onChange={this.changeHandler} value={this.state.base} required>
                    <option value="">Select currency</option>
                    {
                        this.state.isLoaded && Object.keys(this.state.currency.rates).map((rate,index) => <option key={index} value={this.state.currency.rates[rate]}>{rate}</option>)
                    }
                </select>
                <label className="text-white mt-3">Output currency</label>
                <select className="form-control" name="output" onChange={this.changeHandler} value={this.state.ouput} required>
                    <option value="">Select currency</option>
                    {
                        this.state.isLoaded && Object.keys(this.state.currency.rates).map((rate,index) => <option key={index} value={this.state.currency.rates[rate]}>{rate}</option>)
                    }
                </select>
                <label className="text-white mt-3">Enter the amount</label>
                <input type="number" min="0" name="amount" className="form-control" onChange={this.changeHandler} value={this.state.amount} required/>
                <hr/>
                {this.state.output_amount && 
                <>
                    <label className="text-white">The converted amount is</label>
                    <input className="form-control" value={this.state.output_amount} required readOnly/> 
                    <hr/>
                </>
                }
                <center>
                    <button className="btn btn-success mt-4">Submit</button>
                </center>
            </form>
        )   
    }
}
export default Form