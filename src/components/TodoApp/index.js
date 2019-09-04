import React from 'react';
import TaskInput from '../TaskInput'
import TaskView from '../TaskView'
import TaskItem from '../TaskItem'
import NoTask from '../NoTask'
import './style.css'

class TodoApp extends React.Component {
    state = {
        data: [

        ],
        dataSearch: [],
        checkAll: true,
        isHidden: true,
        errorMessage: '',
        searchValue: ''
    }
    addItemHandler = (inputItem) => {
        if (this.inputValidationHandler(inputItem)) {
            const newTask = {
                id: Date.now(),
                title: inputItem,
                done: false
            }
            const newData = [...this.state.data, newTask];
            this.setState({
                data: newData
            });
        } else {

        }


    }
    deleteHandler = (event, id) => {
        event.stopPropagation();
        const dataNow = this.state.data;
        const newDT = dataNow.filter((todo) => {
            return todo.id !== id
        })
        this.setState({
            data: newDT,
            isHidden: true,
            errorMessage: '',
            dataSearch: [],
            searchValue: ''
        })
    }
    checkDoneHandler = (id) => {
        const nowData = this.state.data;
        const indexOfTask = nowData.findIndex((todo) => {
            return todo.id === id;
        })
        const nowStatus = nowData[indexOfTask].done;
        nowData[indexOfTask].done = !nowStatus;
        this.setState({
            data: nowData
        })
    }
    countDone = () => {
        let count = 0;
        for (let dt of this.state.data) {
            if (dt.done === true) count++;
        }
        return count;
    }
    sortHandler = () => {
        const nowDT = this.state.data;
        nowDT.sort((todoA, todoB) => {
            return todoA.done - todoB.done
        })
        this.setState({
            data: nowDT,
            isHidden: true,
            errorMessage: ''
        })
    }
    checkAllHandler = () => {
        const nowCheckAll = this.state.checkAll;
        for (let dt of this.state.data) {
            if (nowCheckAll) {
                dt.done = true;
            } else {
                dt.done = false;
            }
        }
        this.setState({
            checkAll: !nowCheckAll,
            isHidden: true,
            errorMessage: ''
        })
        console.log(this.state.checkAll)
    }

    updateHandler = (id, titleEdit) => {
        const newTodo = this.state.data;
        const indexOfTask = newTodo.findIndex((data) => {
            return data.id === id
        });
        newTodo[indexOfTask].title = titleEdit;
        this.setState({
            data: newTodo
        })

    }
    labelCheckHandler = () => {
        let count = 0;
        let label = ''
        for (let dt of this.state.data) {
            if (dt.done === true) { count++ };
        }
        if (count === this.state.data.length) {
            label += 'Uncheck All'
            this.state.checkAll = false;
        } else {
            label += 'Check All'
            this.state.checkAll = true;
        }
        return label;
    }
    deleteCheckedHandler = (event) => {
        const newDT = this.state.data;
        const td = newDT.filter(todo => {
            return todo.done === false;
        })
        this.setState({
            data: td,
            checkAll: !this.state.checkAll
        })
        // this.togglePopupDeleteAll(event);
    }
    togglePopupDeleteAll = (event) => {
        event.stopPropagation();
        this.setState({
            showPopupDelAll: !this.state.showPopupDelAll
        })
        // console.log('xxxxxxxxxx')
    }
    inputValidationHandler = (input) => {
        if (input.trim() === "") {
            alert('Please enter your content!');
            return false;
        }
        for (let dt of this.state.data) {
            if (input.trim() === dt.title) {
                alert('This task already exist!');
                return false;
            }
        }
        this.setState({
            isHidden: true,
            errorMessage: ''
        })
        return true;
    }
    inputValidationInPopupHandler = (input) => {
        if (input.trim() === "") {
            this.setState({
                isHidden: false,
                errorMessage: '*Input not null'
            })
            console.log(this.state.isHidden);
            return false;
        }
        for (let dt of this.state.data) {
            if (input.trim() === dt.title) {
                // alert('This task already exist!');
                this.setState({
                    isHidden: false,
                    errorMessage: '*This task already exist'
                })
                console.log(this.state.isHidden);
                return false;
            }
        }
        this.setState({
            isHidden: true,
            errorMessage: ''
        })
        return true;
    }
    searchItemHander = (inputValue) => {
        let currentData = [];
        let newList = [];
        newList = this.state.data.filter((dt) => {
            return dt.title === inputValue
        })
        this.setState({
            dataSearch: newList
        })
    }
    changeSearchValue = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }
    searchHandler = (event) => {
        event.preventDefault();
        this.searchItemHander(this.state.searchValue);
    }
    render() {
        return (
            <div className="container-fluid main-full">
                <div className="col-sm-9" >
                    <h1>Todo List make by Me</h1>
                    <TaskInput addItem={this.addItemHandler} inputValidate={this.inputValidationHandler}
                        search={this.searchItemHander}
                    />
                    {/* {!this.state.isHidden ? <p className="error-message">{this.state.errorMessage}</p> : null} */}
                    {this.state.data.length > 0 ?
                        <div className="container btn-gr">
                            <div >
                                <button type="button" className="btn btn-outline-secondary " onClick={this.sortHandler}>Sort</button>
                                <button type="button" className="btn btn-outline-secondary " onClick={this.checkAllHandler}>{this.labelCheckHandler()}</button>
                                <button type="button" className="btn btn-outline-secondary " data-toggle="modal" data-target="#adeleteAll">Delete Checked</button>
                            </div>
                            <h4>Checked: {this.countDone()}/{this.state.data.length}</h4>
                        </div>
                        : null}
                    <TaskView>
                        {this.state.data.length > 0 ?
                            this.state.data.map((item, index) => {
                                return <TaskItem
                                    stt={index + 1}
                                    title={item.title}
                                    id={item.id}
                                    done={item.done}
                                    key={item.id}
                                    delete={this.deleteHandler}
                                    checkDone={this.checkDoneHandler}
                                    update={this.updateHandler}
                                    inputValidate={this.inputValidationInPopupHandler}
                                    isHidden={this.state.isHidden}
                                    errMess={this.state.errorMessage}
                                >
                                </TaskItem>
                            }) : <NoTask />}
                    </TaskView>
                    {this.countDone() !== 0 ?
                        <div className="modal fade" id="adeleteAll" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Delete Task</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to delete checked task ? </p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteCheckedHandler}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                </div>
                <div className="col-sm-3 srch-group">
                    <form className="form-inline my-2 my-lg-0 search-form" onSubmit={this.searchHandler}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.searchValue} onChange={this.changeSearchValue} />
                    </form>
                    <TaskView >
                        {
                            this.state.dataSearch.map((item, index) => {
                                return <TaskItem
                                    stt={index + 1}
                                    title={item.title}
                                    id={item.id}
                                    done={item.done}
                                    key={item.id}
                                    delete={this.deleteHandler}
                                    checkDone={this.checkDoneHandler}
                                    update={this.updateHandler}
                                    inputValidate={this.inputValidationInPopupHandler}
                                    isHidden={this.state.isHidden}
                                    errMess={this.state.errorMessage}
                                >
                                </TaskItem>
                            })}
                    </TaskView>
                </div>
            </div>
        )
    }
}
export default TodoApp;