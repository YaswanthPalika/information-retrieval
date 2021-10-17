import {Component} from 'react'
import './index.css'

class Boolean extends Component{
    state = {
        inputQuery : "",
        output : "",
    }

    queryFunction = (event) => {
        this.setState({inputQuery: event.target.value})
    }

    clickFunction =async () => {
        const {inputQuery} = this.state
        //console.log(inputQuery)
        let details = {inputQuery}
        details = JSON.stringify(details);
        //console.log(details)
        const url = "http://localhost:3001/"
        const options = {
            method : 'POST',
            body : details,
            headers: {
                "Content-Type": "application/json",
            }
        }
       // console.log(url,options);
        await fetch(url,options)
            .then(response => {
                return response.text();
            })
            .then(data => {
                this.setState({output: data})
            })
    }
    
    render(){
        const {inputQuery,output} = this.state
        return(
            <div className="mainbox">
                <h1>Boolean retrieval model</h1>
                <div className="search">
                    <p>write your query using "and","or","not</p>
                    <div className="search-bar">
                        <input className="input-box" 
                            placeholder="example : brutus and ceaser not calpornia" 
                            value={inputQuery}
                            onChange={this.queryFunction}/>  
                        <button onClick={this.clickFunction}>search</button>
                    </div>
                </div>
                <hr/>
                <p className="output">{output}</p>
            </div>
        )
    }
}
export default Boolean