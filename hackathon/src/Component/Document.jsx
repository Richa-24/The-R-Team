import React from "react";
import styles from "./Style.module.css";
import axios from "axios";
import swal from "sweetalert";

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

  handleAcceptance = () => {
    let org_domain = JSON.parse(window.localStorage.getItem("user")).subdomain;
    let doc_id = window.localStorage.getItem("doc_id");
    let token = JSON.parse(window.localStorage.getItem("token"));
    var data = {
      acceptors: [
        {
          user_email: "singhricha0724@gmail.com",
          first_name: "Richa",
          last_name: "Singh",
        },
        {
          user_email: "jogdandrutvik7@gmail.com",
          first_name: "Rutvik",
          last_name: "Jogdand",
        },
      ],
      email_message: "Please accept my application",
    };
    axios
      .request({
        url: `https://${org_domain}.revvsales.com/api/v2/doc-acceptors/${doc_id}`,
        method: "post",
        headers: {
          AccessToken: token,
        },
        data: data,
      })
      .then((res) =>
        swal("Your document has been sent successfully for acceptance!")
      )
      .catch((err) => console.log(err));
  };

  handleCreateDoc = () => {
    let docTitle = window.localStorage.getItem("template_title");
    let id = JSON.parse(window.localStorage.getItem("template_id"));
    let org_domain = JSON.parse(window.localStorage.getItem("user")).subdomain;
    let token = JSON.parse(window.localStorage.getItem("token"));
    var data = JSON.stringify({
      template_id: id,
      title: docTitle + "-" + this.state.student_name.toUpperCase(),
    });

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
            window.localStorage.setItem("doc_id", res.data.Document.id);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.newDocBox}>
          <div>
            <h2 className={styles.FillFields}>Fill the fields</h2>
            <label>
              <div>Name: </div>
              <input
                onChange={this.handleDocChange}
                name="student_name"
                value={student_name}
              />
            </label>
          </div>

          <div>
            <label>
              <div>Date:</div>
              <input onChange={this.handleDocChange} name="date" value={date} />
            </label>
          </div>

          <div>
            <label>
              <div>Subject:</div>
              <input
                onChange={this.handleDocChange}
                name="subject"
                value={subject}
              />
            </label>
          </div>

          <div>
            <label>
              <div>Faculty:</div>
              <input
                onChange={this.handleDocChange}
                name="faculty"
                value={faculty}
              />
            </label>
          </div>

          <div>
            <label>
              <div>Incharge Name: </div>
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
            <div style={{ margin: "20px" }}>
              <a href={link}> Here is your document link</a>
            </div>

            <div>
              <button onClick={this.handleAcceptance}>
                Send for acceptance
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
