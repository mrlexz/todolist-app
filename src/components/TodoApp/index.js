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
        checkAll: true
    }
    addItemHandler = (inputItem) => {
        const newTask = {
            id: Date.now(),
            title: inputItem,
            done: false
        }
        const newData = [...this.state.data, newTask];
        this.setState({
            data: newData
        })
        // console.log(inputItem);
    }
    deleteHandler = (event, id) => {
        event.stopPropagation();
        const dataNow = this.state.data;
        const newDT = dataNow.filter((todo) => {
            return todo.id != id
        })
        this.setState({
            data: newDT
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
            data: nowDT
        })
    }
    checkAllHandler = () => {
        const nowCheckAll = this.state.checkAll;
        for (let dt of this.state.data) {
            if (nowCheckAll === true) {
                dt.done = true;
            } else {
                dt.done = false;
            }
        }
        this.setState({
            checkAll: !nowCheckAll
        })
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

    render() {
        return (
            <div >
                <h1>Todo List make by Me</h1>
                <TaskInput addItem={this.addItemHandler} />
                {this.state.data.length > 0 ?
                    <div className="container btn-gr">
                        <div >
                            <button type="button" className="btn btn-outline-secondary " onClick={this.sortHandler}>Sort</button>
                            <button type="button" className="btn btn-outline-secondary " onClick={this.checkAllHandler}>Check All</button>
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
                                delete={(event) => this.deleteHandler(event, item.id)}
                                checkDone={this.checkDoneHandler}
                                update={this.updateHandler}
                            >
                            </TaskItem>
                        }) : <NoTask />}
                </TaskView>

            </div>
        )
    }
}
export default TodoApp;