import React from 'react';

class TaskInput extends React.Component {
    state = {
        title: ''
    }
    changeHandler = (event) => {
        this.setState({
            title: event.target.value
        })
        // console.log(this.state.title);
    }
    addItemHandler = (event) => {
        event.preventDefault();
        this.props.addItem(this.state.title);
        this.setState({
            title: ''
        })
    }

    render() {
        return (
            <form className="container" onSubmit={this.addItemHandler}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Input Here..." value={this.state.title} onChange={this.changeHandler}></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-success" type="submit" id="button-addon2">ADD</button>

                    </div>
                </div>
            </form>
        )
    }
}
export default TaskInput;