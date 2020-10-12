import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import { Layout } from "antd";

import SiteMenu from "./SiteMenu";

const { Sider } = Layout;

const ApplicationRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = (event) => {
    console.log("handletoggle");
    collapsed ? setCollapsed(false) : setCollapsed(true);
  };

  return (
    <Router>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={handleToggle}>
          <SiteMenu defaultOpenKeys={[]} collapsed={collapsed} />
        </Sider>
        <Layout className="site-layout">
          <Switch>
            <Route exact path="/">
              <Redirect to="/menuitem1" from="/" />
            </Route>
            <Route path="/subitem1">
              <div>route of submenuitem1</div>
            </Route>
            <Route path="/subitem2">
              <div>route of submenuitem2</div>
            </Route>
            <Route path="/menuitem1">
              <div>route of menuitem1</div>
              <div>
                <Link to="/subitem1">Go</Link>
              </div>
            </Route>
            <Route path="/menuitem2">
              <div>route of menuitem2</div>
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Router>
  );
};

export default ApplicationRoutes;
