import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_email: "",
      password: "",
      org_domain: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { user_email, password, org_domain } = this.state;

    if (user_email !== "" && password !== "" && org_domain !== "") {
      axios
        .request({
          url: `https://${org_domain}.revvsales.com/api/v2/auth/initiate-auth`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            GrantType: "password",
          },
          data: this.state,
        })
        .then((res) => {
          let user = res.data.User;
          let token = res.data.User.access_token;
          console.log(res);
          window.localStorage.setItem("user", JSON.stringify(user));
          window.localStorage.setItem("token", JSON.stringify(token));
          this.props.history.push("/");
        })
        .catch((err) => console.log("Error"));
    } else {
      alert("Please fill all the fields");
    }
  };

  render() {
    const { user_email, password, org_domain } = this.state;
    return (
      <>
        <h1>Login</h1>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <div style={{ marginLeft: "-18%" }}> Email:</div>
            <input
              onChange={this.handleChange}
              name="user_email"
              value={user_email}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            <div style={{ marginLeft: "-17%" }}> Password:</div>
            <input
              onChange={this.handleChange}
              name="password"
              value={password}
            />
          </label>
          <br />
          <div style={{ marginBottom: "10px", marginTop: "10px" }}>
            <label>
              <div style={{ marginLeft: "-15%" }}> Org Domain:</div>
              <input
                onChange={this.handleChange}
                name="org_domain"
                value={org_domain}
              />
            </label>
          </div>
          <br />
          <div>
            <button style={{ padding: "2px 5px" }} onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }
}
