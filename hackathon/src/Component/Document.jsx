import React from "react";
import style from "./Style.module.css";

export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      student_name: "",
      date: "",
      subject: "",
      faculty: "",
      incharge_name: "",
    };
  }

  componentDidMount() {
    let template_id = JSON.parse(window.localStorage.getItem("template_id"));
  }

  handleDocChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleCreateDoc = () => {
    let template_id = JSON.parse(window.localStorage.getItem("template_id"));
    console.log(template_id);
  };

  render() {
    const { student_name, date, subject, faculty, incharge_name } = this.state;
    return (
      <div className={style.newDocBox}>
        <div>
          <h2>Fill the fields</h2>
          <label>
            Name:
            <input
              onChange={this.handleDocChange}
              name="student_name"
              value={student_name}
            />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input onChange={this.handleDocChange} name="date" value={date} />
          </label>
        </div>

        <div>
          <label>
            Subject:
            <input
              onChange={this.handleDocChange}
              name="subject"
              value={subject}
            />
          </label>
        </div>

        <div>
          <label>
            Faculty:
            <input
              onChange={this.handleDocChange}
              name="faculty"
              value={faculty}
            />
          </label>
        </div>

        <div>
          <label>
            Incharge Name:
            <input
              onChange={this.handleDocChange}
              name="incharge_name"
              value={incharge_name}
            />
          </label>
        </div>

        <div>
          <button onClick={this.handleCreateDoc}>Create</button>
        </div>
      </div>
    );
  }
}
