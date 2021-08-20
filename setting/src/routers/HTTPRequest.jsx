import React from 'react'
import model from '../model'

class HTTPRequest extends React.Component {
    constructor() {
        super();
        this.state={
            keywords:[],
            loading: false,
            error: null
        }
        this.call = this.call.bind(this)
    }

    call() {
        this.setState({loading:true});
        const result = model.get() // model.get() is a async functions, so returns a promise.
        result.then((data)=>this.setState({keywords: data}));
        this.setState({loading:false});
    }

    render() {
        return (
            <div className="httprequest">
                <button onClick={this.call}>GET Request</button>
                <p>{this.state.keywords.map((keyword, i)=><span key={i}>{keyword.keyword} </span>)}</p>
            </div>
        )
    }
}

export default HTTPRequest