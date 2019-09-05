import React from 'react';
import './style.css'
class TaskInput extends React.Component {
    state = {
        title: '',
        searchValue: '',
        showPopupAdd: false
    };
    changeHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    addItemHandler = (event) => {
        event.preventDefault();
        console.log(this.state.title);
        this.props.addItem(this.state.title);
        this.state.title = '';
        // this.togglePopupAdd(event);
    }
    // togglePopupAdd = (event) => {
    //     event.stopPropagation();
    //     console.log('xxxxxxxx');
    //     this.setState({
    //         showPopupAdd: !this.state.showPopupAdd
    //     })
    // }

    render() {
        return (
            <div className="container main">
                {/* <div className="input-group-append search-group">
                    <button className="btn btn-outline-success" type="submit" id="button-addon2" onClick={this.togglePopupAdd}><i className="fas fa-plus"></i></button>
                    <form className="form-inline my-2 my-lg-0 search-form">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                {this.state.showPopupAdd ?
                    <div className="popup">
                        <div className="popup-inner">
                            <span className="close-btn" onClick={this.togglePopupAdd}><i className="far fa-times-circle"></i></span>
                            <h3>Add New Task</h3>
                            <div className="form-group">
                                <label >Title</label>
                                <input type="text" className="form-control"
                                    value={this.state.title}
                                    onChange={this.changeHandler} />
                            </div>
                            {!this.props.isHidden ? <p>{this.props.errMess}</p> : null}
                            <button type="button" className="btn btn-outline-primary btn-save" onClick={this.addItemHandler}>Save Change</button>
                        </div>
                    </div>
                    : null} */}
                <div className=" search-group" >
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body card-style">
                        <form className="container" onSubmit={this.addItemHandler}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Input Here..." value={this.state.title} onChange={this.changeHandler}></input>
                                <div className="">
                                    <button className="btn btn-outline-success" type="submit" id="button-addon2">ADD</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
export default TaskInput;