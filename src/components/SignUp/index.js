import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../../firebase/index";

const SignUpPage = ({ history }) => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm history={history} />
    </div>
  );
};

const initialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});
class SignUpForm extends Component {
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
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...initialState }));
            console.log("sent...");
            history.push("/signup");
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });
    e.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
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
        />  <br/>
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Enter Email"
        /> <br/>
        <input
          type="password"
          id="passwordOne"
          value={this.state.passwordOne}
          onChange={this.handleChange}
          placeholder="Enter Password"
        />  <br/>
        <input
          type="password"
          id="passwordTwo"
          value={this.state.passwordTwo}
          onChange={this.handleChange}
          placeholder="Confirm Password"
        /> <br/>
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>
        <br/>
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

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
