import React from "react";
import style from "./Style.module.css";
import axios from "axios";

export default class Document extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      student_name: "",
      date: "",
      subject: "",
      faculty: "",
      incharge_name: "",
      link: "",
      isLink: false,
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
    let docTitle = window.localStorage.getItem("template_title");
    let id = JSON.parse(window.localStorage.getItem("template_id"));
    let org_domain = JSON.parse(window.localStorage.getItem("user")).subdomain;
    let token = JSON.parse(window.localStorage.getItem("token"));
    var data = JSON.stringify({ template_id: id, title: docTitle });

    console.log(id);

    axios
      .request({
        url: `https://${org_domain}.revvsales.com/api/docs`,
        method: "post",
        headers: {
          AccessToken: token,
          "Content-Type": "application/json",
        },
        data: data,
      })
      .then((res) => {
        axios
          .post(
            `http://localhost:5000/screenshot/${res.data.Document.doc_no}`,
            this.state
          )
          .then((resp) => {
            let object_id = res.data.Document.object_id;
            // let obj_type= "DOC"
            let data = { object_id: object_id, object_type: "DOC" };
            // console.log(resp);
            axios
              .request({
                url: `https://${org_domain}.revvsales.com/api/perma-link`,
                method: "post",
                headers: {
                  AccessToken: token,
                  "Content-Type": "application/json",
                },
                data: data,
              })
              .then((respo) => {
                this.setState({
                  link: respo.data.url,
                  isLink: true,
                });
              });

            // console.log(res);
          });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      student_name,
      date,
      subject,
      faculty,
      incharge_name,
      link,
      isLink,
    } = this.state;
    return (
      <>
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

        {isLink ? (
          <div>
            Here is your document link: <a>{link}</a>
          </div>
        ) : null}
      </>
    );
  }
}
