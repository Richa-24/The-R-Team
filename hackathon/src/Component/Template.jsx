import React from "react";
import axios from "axios";
import style from "./Style.module.css";
import Document from "./Document";

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Templates: [],
      isDoc: false,
    };
  }

  componentDidMount() {
    let org_domain = JSON.parse(window.localStorage.getItem("user")).subdomain;
    let token = JSON.parse(window.localStorage.getItem("token"));
    console.log(org_domain);
    console.log(token);
    axios
      .request({
        url: `https://${org_domain}.revvsales.com/api/docstemplate/?page_num=1&status=ACTIVE`,
        headers: {
          AccessToken: token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.setState({
          Templates: [...this.state.Templates, ...res.data.Templates],
        });

        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  handleNewDoc = (id, title) => {
    let template_id = window.localStorage.setItem("template_id", id);
    let template_title = window.localStorage.setItem("template_title", title);

    this.setState({
      isDoc: true,
    });
  };

  render() {
    const { isDoc } = this.state;
    console.log(this.state.Templates);
    return (
      <>
        <h3>Templates:</h3>
        <div className={style.templatesBox}>
          {this.state.Templates.map((item, index) => {
            // console.log(item.title);
            return (
              <div key={item.id}>
                <div>
                  <img src={item.thumbnail} width="100%" height="300" />
                </div>
                <div className={style.templateTitle}>{item.title}</div>
                <button
                  onClick={() => {
                    this.handleNewDoc(item.id, item.title);
                  }}
                >
                  Create New Doc
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ height: "100px" }}></div>
        {isDoc ? <Document /> : null}
      </>
    );
  }
}
