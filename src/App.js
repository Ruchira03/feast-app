import React from "react";
import welcomepage from "./core/welcome";
import login from "./user/userlogin";
import signup from "./user/usersignup";
import ownerlogin from "./owner/ownerlogin";
import ownersignup from "./owner/ownersignup";
import addrest from "./owner/addrestaurent";
import userhomepage from "./user/userhomepage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./core/userprivateroutes";
import Ownerrestriction from "./core/owner_back_rist";
import Userrestriction from "./core/user_back_rist";
import ownerhomepage from "./owner/ownerhomepage";
import hoteldisplay from "./user/hoteldisplay";
import Hoteldisplaybyname from "./user/Hoteldisplaybyname";
import { ImageUpload } from "./owner/Addimage";
import app from "./owner/Table";
import Menudisplay from "./user/Menudisplay";
import Order from "./owner/orders";
import Cart from "./user/Cart";
import Orderhistory from "./user/Orderhistory";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={welcomepage} />
        <Userrestriction
          restricted="true"
          path="/user/signin"
          exact
          component={login}
        />
        <Userrestriction
          restricted="true"
          path="/user/signup"
          exact
          component={signup}
        />
        <Ownerrestriction
          restricted="false"
          path="/owner/signin"
          exact
          component={ownerlogin}
        />
        <Ownerrestriction
          restricted="false"
          path="/owner/signup"
          exact
          component={ownersignup}
        />
        <PrivateRoute path="/userhomepage" component={userhomepage} />
        <PrivateRoute component={addrest} path="/addrestaurent" exact />
        <PrivateRoute component={app} path="/ownerhomepage" exact />
        <PrivateRoute path="/orderhistory" exact component={Orderhistory} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <PrivateRoute path="/order" exact component={Order} />
        <PrivateRoute path="/menudisplay" exact component={Menudisplay} />
        <PrivateRoute path="/card" exact component={hoteldisplay} />
        <PrivateRoute path="/addrestimg" exact component={ImageUpload} />
        <PrivateRoute path="/cardbyname" exact component={Hoteldisplaybyname} />
      </Switch>
    </BrowserRouter>
  );
}
