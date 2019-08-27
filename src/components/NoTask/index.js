import React from 'react'
import freedome from '../../assets/images/freedom.jpg'
import './style.css'
class NoTask extends React.Component {
    render() {
        return (
            <div className="container">
                <img src={freedome} className="img"></img>
                <h3>Today, You are free</h3>
            </div>
        )
    }
}
export default NoTask;