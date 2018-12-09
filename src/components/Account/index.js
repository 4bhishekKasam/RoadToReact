import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { withFirebase } from "../../firebase";

const signInMethods = [
  {
    id: "password",
    provider: null
  }
];

const AccountPage = () => {
  return (
    <div>
      <h3>Account : </h3>
      <PasswordForgetForm />
      <br />
      <PasswordChangeForm />
    </div>
  );
};

const LoginManagement = withFirebase(LoginManagement);

const mapStateToProps = state => {
  return {
    authUser: state.sessionState.authUser
  };
};

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(AccountPage);
