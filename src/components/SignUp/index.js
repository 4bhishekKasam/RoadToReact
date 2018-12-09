import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../../firebase";
import { SignInLink } from "../SignIn/index";
import * as ROLES from "../../constants/roles";

const SignUpPage = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
      <SignInLink />
    </div>
  );
};

const initialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

// const updateByPropertyName = (propertyName, value) => () => ({
//   [propertyName]: value
// });

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];
    //  const { history } = this.props;

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      // .then(() => {
      //   return this.props.firebase.doSendEmailVerification();
      // })
      .then(() => {
        this.setState({ ...initialState });
        this.props.history.push("/home");
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
  };

  onChangeCheckbox = e => {
    this.setState({ [e.target.id]: e.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      isAdmin
    } = this.state;

    const isInvalid =
      email === "" ||
      username === "" ||
      passwordOne === "" ||
      passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="Enter Username"
        />{" "}
        <br />
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Enter Email"
        />{" "}
        <br />
        <input
          type="password"
          id="passwordOne"
          value={this.state.passwordOne}
          onChange={this.handleChange}
          placeholder="Enter Password"
        />{" "}
        <br />
        <input
          type="password"
          id="passwordTwo"
          value={this.state.passwordTwo}
          onChange={this.handleChange}
          placeholder="Confirm Password"
        />{" "}
        <br />
        <label>
          {" "}
          Admin :
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <br />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>
        <br />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account?
      <Link to={"/signup"}>Sign Up</Link>
    </p>
  );
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
