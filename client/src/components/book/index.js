import './index.css'
//import {Link} from 'react-router-dom'

const Book = props => {
        const {id,name,image,author} = props.data
        return (
            <div to={`/book/${id}`} className="card">
                    <img src={image} alt="book-ima" className="book-image"/>
                    <h5>{name}</h5>
                    <p>by</p>
                    <p className="author">{author}</p>
            </div>
        )
    }


export default Book