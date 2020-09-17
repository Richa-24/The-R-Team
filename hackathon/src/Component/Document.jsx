import React from "react";

export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let template_id = JSON.parse(window.localStorage.getItem("template_id"));
  }
  render() {
    return (
      <>
        <div>
          <label>
            Student Name:
            <input onChange={this.handleDocChange} />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input onChange={this.handleDocChange} />
          </label>
        </div>

        <div>
          <label>
            Subject:
            <input onChange={this.handleDocChange} />
          </label>
        </div>

        <div>
          <label>
            Faculty:
            <input onChange={this.handleDocChange} />
          </label>
        </div>

        <div>
          <label>
            Incharge Name:
            <input onChange={this.handleDocChange} />
          </label>
        </div>
      </>
    );
  }
}
