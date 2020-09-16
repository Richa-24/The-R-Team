import React from "react";
import axios from "axios";

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
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
          data: [...this.state.data, res.data.Templates],
        });
        // console.log(res);
        // let templates = res.data.Templates;
        // console.log(templates);

        // for (let i = 0; i < templates.length; i++) {
        //   console.log(templates[i].title);
        // }
      })
      .catch((err) => console.log(err));
  }

  render() {
    // const { data } = this.state;
    console.log(this.state.data);
    return (
      <>
        {this.state.data.map((item) => {
          console.log(item.id);
          return <div>{item.title}</div>;
        })}
      </>
    );
  }
}
