import {Component} from 'react'
import './index.css'
import Boolean from '../boolean/index'
import Spelling from '../spelling/index'

class Header extends Component{
    state = {
        b : true,
    }

    booleanFunction = () => {
        this.setState({b:true})
    }

    spellingFunction = () =>{
        this.setState({b:false})
    }

    render(){
        const {b} = this.state
        let navElements1 = ""
        let navElements2 = ""
        if(b){
            navElements1 = "navElements yes"
            navElements2 = "navElements no"
        }else{
            navElements1 = "navElements no"
            navElements2 = "navElements yes"
        }
        return (
            <div>
                <div className="nav">
                <div className={navElements1} onClick={this.booleanFunction}>
                    <p  >Boolean retrieval model</p>
                </div>
                <div className={navElements2} onClick={this.spellingFunction}>
                    <p  >spelling correction</p>
                </div>
            </div>
            {b?<Boolean/>:<Spelling/>}
                
            </div>
        )
    }
}

export default Header;