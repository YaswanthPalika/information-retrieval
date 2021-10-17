import {Component} from 'react'
import './index.css'
import Book from '../book'

class Books extends Component{
    state = {
        searchInput : "",
        booklist : [],
        correctword : "",
    }

    searchChange = e => {
        this.setState({searchInput : e.target.value})
    }

    searchButton =async () => {
        const {searchInput} = this.state
        let details = {searchInput}
        details = JSON.stringify(details);
        //console.log(details,searchInput)
        const url = 'http://localhost:3001/books'
        const options = {
            method : 'POST',
            body : details,
            headers: {
                "Content-Type": "application/json",
            }
        }
        await fetch(url,options)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            const list = jsonData;
            console.log(list)
            this.setState({correctword:list[0]})
            this.setState({booklist:list[1]})
           // console.log(this.state.booklist)
        })

        
    }

    searchButtonProcess = () =>{
        this.searchButton()
    }

    print = () => {
        console.log("")
    }

    componentDidMount = () => {
        this.searchButton()
    }

    render(){
        const {booklist,searchInput,correctword} = this.state
        return(
            <div className="books-container">
                <div>
                <input placeholder="search your book here" value={searchInput} className="input-box" onChange={this.searchChange}/>
                <button className="search-button" onClick={this.searchButtonProcess}>search</button>
                </div>
                <div className="books-result"> 
                    {correctword === ""?<p></p>:<p className="correct-word">
                        giving the result of : <span className="span">{correctword}</span></p>}
                    <ul>
                    {booklist.map(each => (
                        <Book data={each} key={each.id}/>
                    ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default  Books