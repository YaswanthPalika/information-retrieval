import {Component} from 'react'
import './index.css'
import Books from '../books'

class Spelling extends Component{
    render(){
        return (
            <div>
                <h1>Library</h1>
                <Books/>
            </div>
        )
    }
}

export default Spelling