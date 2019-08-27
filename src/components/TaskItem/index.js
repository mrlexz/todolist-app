import React from 'react';
import './style.css';

class TaskItem extends React.Component {
    state = {
        titleEdit: this.props.title,
        showPopup: false
    }
    togglePopup = (event) => {
        event.stopPropagation();
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    changeHandler = (event) => {

        this.setState({
            titleEdit: event.target.value
        })
    }
    saveHandler = (event) => {
        this.props.update(this.props.id, this.state.titleEdit)
        this.togglePopup(event);
    }
    checkDoneDMM = (event) => {
        event.stopPropagation();
        this.props.checkDone(this.props.id)
    }
    render() {
        return (
            <div>
                <div className="container view" onClick={this.checkDoneDMM}>
                    <p className={`${this.props.done ? "done" : ""}`}>
                        {this.props.stt}. {this.props.title}
                    </p>
                    <div className="btn-gr">
                        <button type="button" className="btn btn-outline-primary " onClick={this.togglePopup}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-danger " onClick={this.props.delete}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
                {this.state.showPopup ?
                    <div className="popup">
                        <div className="popup-inner">
                            <span className="close-btn" onClick={this.togglePopup}><i className="far fa-times-circle"></i></span>
                            <h3>Edit Task</h3>
                            <div className="form-group">
                                <label >Title</label>
                                <input type="text" className="form-control"
                                    value={this.state.titleEdit}
                                    onChange={this.changeHandler} />
                            </div>
                            <div className="form-group">
                                <label >Done ?</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                    <option>True</option>
                                    <option>False</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-outline-primary btn-save" onClick={this.saveHandler}>Save Change</button>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}
export default TaskItem;