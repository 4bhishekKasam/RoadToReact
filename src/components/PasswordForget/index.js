import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../firebase/";

const PasswordForgetPage = () => {
  return (
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
};

const initialState = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...initialState });
        console.log("password reset done");
      })
      .catch(error => {
        this.setState({ error });
        console.log("error on password reset");
      });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          type="email"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={"/pw-forget"}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
