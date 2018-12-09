import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../../firebase";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

const initialState = {
  email: "",
  password: "",
  error: null
};

// const updateByPropertyName = (propertyName, value) => () => ({
//   [propertyName]: value
// });

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...initialState }));
        console.log("signed in");
        this.props.history.push("/home");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          id="email"
          value={this.state.email}
          placeholder="Enter Email"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="password"
          id="password"
          value={this.state.password}
          placeholder="Enter Password"
          onChange={this.handleChange}
        />{" "}
        <br />
        <button disabled={isInvalid}> Sign In </button>
        <br />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInLink = () => {
  return (
    <p>
      Already a user?
      <Link to={"/signin"}>Sign In</Link>
    </p>
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
