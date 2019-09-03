import React from 'react';
import './style.css';
import PopupDelete from '../PopupDelete';
class TaskItem extends React.Component {
    state = {
        titleEdit: this.props.title,
        showPopup: false,
        showPopupDelete: false,
        errorMessagePop: "",
        isHiddenErrPop: true
    }
    togglePopup = (event) => {
        event.stopPropagation();
        this.setState({
            titleEdit: this.props.title,
            showPopup: !this.state.showPopup
        })
    }
    togglePopupDelete = (event) => {
        event.stopPropagation();
        this.setState({
            showPopupDelete: !this.state.showPopupDelete
        })
        console.log('xxxxxxxxxx')
    }

    changeHandler = (event) => {
        this.setState({
            titleEdit: event.target.value
        })
    }
    saveEditHandler = (event) => {
        if (this.props.inputValidate(this.state.titleEdit)) {
            this.props.update(this.props.id, this.state.titleEdit)
            this.togglePopup(event);
        } else {
            this.setState({

            })
        }
    }
    checkDoneDMM = (event) => {
        event.stopPropagation();
        this.props.checkDone(this.props.id)
        console.log(this.props.done)
    }
    deleteTask = (event) => {
        this.props.delete(event, this.props.id);
        this.togglePopupDelete(event);
        console.log('xxxx');
    }

    render() {
        return (
            <div>
                <div className="container view" >
                    <div className="checkbox-gr">
                        <input type="checkbox" className="" id={this.props.stt} checked={this.props.done} onChange={this.checkDoneDMM} />
                        <label className={`${this.props.done ? "done" : ""}`}
                            htmlFor={this.props.stt}

                        >
                            {this.props.stt}. {this.props.title}
                        </label>
                    </div>
                    <div className="btn-gr">
                        <button type="button" className="btn btn-outline-primary " onClick={this.togglePopup}><i className="fas fa-edit"></i></button>
                        <button type="button" className="btn btn-outline-danger " data-toggle="modal"
                            data-target={`#a${this.props.id}`}><i className="fas fa-trash"></i></button>
                        <PopupDelete id={this.props.id}
                            delete={this.deleteTask}
                        />
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
                            {!this.props.isHidden ? <p>{this.props.errMess}</p> : null}
                            <button type="button" className="btn btn-outline-primary btn-save" onClick={this.saveEditHandler}>Save Change</button>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}
export default TaskItem;