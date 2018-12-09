import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";
import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Session";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      {/* <Switch>
        <Route exact path={"/admin"} component={UserList} />
        <Route exact path={"/admin/:id"} component={UserItem} />
      </Switch> */}
    </div>
  );
};

const condition = authUser =>
 authUser && authUser.roles.includes(ROLES.ADMIN);

export default withAuthorization(condition)(AdminPage);
