import React from 'react';

const TaskView = (props) => {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}
export default TaskView;