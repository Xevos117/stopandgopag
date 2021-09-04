import { Component } from "react"

class Card extends Component{
    render(){
        return(
            <div>
                <div className="card" style={{width:180}}>
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 className="card-title">{this.props.titolo}</h5>
                <p className="card-text">{this.props.testo}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{this.props.elemento1}</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
            </div>
            </div>
        )
    }
}

export default Card