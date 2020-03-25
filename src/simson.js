import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import Appc from './CompositeSimpson';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Appc2 from './CompositeTrapzoidal';
import Appc3 from './Simpson';
import Appc4 from './Cholesky';
import Appc5 from './Gradient';
import Appc6 from './Inverse';
import Appc7 from './Jacobi';
import Appc8 from './Jordan';
import Appc9 from './Seidel';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TAP3 extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Router>
        <Layout>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="app3">
              <Icon type="appstore" />
              Simpson
              <Link to='/Appc3' />

            </Menu.Item>
            <Menu.Item key="bisection">
              <Icon type="appstore" />
              CompositeSimpson
              <Link to='/Appc' />

            </Menu.Item>
            <Menu.Item key="app2">
              <Icon type="appstore" />
              CompositeTrapzoidal
              <Link to='/Appc2' />

            </Menu.Item>
          </Menu>
          <Content>
            <Layout>
              <Route path="/Appc" component={Appc} />
              <Route path="/Appc2" component={Appc2} />
              <Route path="/Appc3" component={Appc3} />
            </Layout>
          </Content>
        </Layout>
      </Router>

    );
  }
}

export default TAP3;