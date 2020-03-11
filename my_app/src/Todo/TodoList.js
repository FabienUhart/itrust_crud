import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EventValid(props) {
  return <h6>Validation</h6>;
}

function EventNoValid(props) {
  return <h6>wainting vallidation</h6>;
}

function Greeting(props) {
  console.log(props);
  const isLoggedIn = props[3];
  if (isLoggedIn) {
    return <EventValid />;
  }
  return <EventNoValid />;
}

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      time: Date.now(),
      userInput: "",
      stateTodo: false,
      startDate: new Date(),
      endDate: new Date(),
      items: []
    };
  }

  onChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }

  addTodo(event) {
    event.preventDefault();
    let dateTimestamp = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    this.setState({
      userInput: "",
      dateEvent: "",
      items: [
        ...this.state.items,
        [
          this.state.userInput,
          this.state.startDate,
          this.state.endDate,
          this.state.stateTodo,
          dateTimestamp
        ]
      ]
    });
    this.setState({
      startDate : new Date(),
      endDate : this.state.startDate,
    });

  }

  deleteTodo(item) {
    const array = this.state.items;
    const index = array.indexOf(item);
    array.splice(index, 1);
    this.setState({
      items: array
    });
  }

  changeTodo(item) {
    const array = this.state.items;
    const index = array.indexOf(item);
    const newItem = item;
    newItem[3] = true;
    array.splice(index, 1, newItem);
    this.setState({
      items: array
    });
  }

  renderTodos() {
    return this.state.items.map(item => {
      let title = item[0];
      let startDate = item[1];
      let endDate = item[2];
      let stateTodo = item[3]
      let currentdate = item[4];
      return (
        <div className="list-group-item" key={item}>
          <Greeting isLoggedIn={item} />
          <div>
            <button onClick={this.deleteTodo.bind(this, item)}>X</button>
          </div>
          <div>
            <h2>{title} :</h2><Moment format="DD/MM/YYYY HH:mm:ss" withTitle>
              {currentdate}
            </Moment>
          </div>
          <div>
            Date de début:
            <Moment format="DD/MM/YYYY HH:mm" withTitle>
              {startDate}
            </Moment>
          </div>
          <div>
            Date de fin:
            <Moment format="DD/MM/YYYY HH:mm" withTitle>
              {endDate}
            </Moment>
          </div>
          <div>
            <button onClick={this.changeTodo.bind(this, item)}>Valider</button>
          </div>
        </div>
      );
    });
  }

  handleChange = date => {
    this.setState({
      startDate: date,
      endDate: date
    });
  };

  newHandleChange = date => {
    if (this.state.startDate.getTime() <= date.getTime()) {
      this.setState({
        endDate: date
      });
    } else {
      this.setState({
        endDate: this.state.startDate
      });
    }
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h1 align="center">Ma Todo list</h1>
        <div>
          <Moment format="  DD/MM/YYYY HH:mm:ss" withTitle>
            {this.state.time}
          </Moment>
        </div>
        <form className="form-row align-items-center">
          <input
            value={this.state.userInput}
            type="text"
            placeholder="Renseigner un item"
            onChange={this.onChange.bind(this)}
            className="form-control mb-2"
          />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={this.state.startDate}
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.newHandleChange}
            showTimeSelect
            timeFormat="HH:mm:ss"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={this.state.endDate}
          />
          <button onClick={this.addTodo.bind(this)} className="btn btn-primary">
            Ajouter
          </button>
        </form>
        <div className="list-group">{this.renderTodos()}</div>
      </div>
    );
  }
}

export default TodoList;
