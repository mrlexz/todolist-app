import React from 'react';
import { NavLink } from 'react-router-dom';
class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink exact className="nav-item nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-item nav-link" to="/blog">Blog</NavLink>
                            <NavLink className="nav-item nav-link" to="/todo">Todo</NavLink>
                            <NavLink className="nav-item nav-link" to="/clock">Clock</NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;