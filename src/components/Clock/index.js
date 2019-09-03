import React from 'react';

class Clock extends React.Component {
    state = {
        date: new Date()
    }
    tick = () => {
        this.setState({
            date: new Date()
        })
    }
    componentDidMount() {
        this.timeD = setInterval(() => {
            this.tick()
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeD);
        console.log('end');
    }
    render() {
        return (
            <div>
                <h1>Clock</h1>
                <h3>Time: {this.state.date.toLocaleTimeString()}</h3>
            </div>
        )
    }
}
export default Clock;