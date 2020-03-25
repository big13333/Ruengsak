import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import Appc from './Backwardh';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Appc2 from './ForwardH2';
import Appc3 from './Centralh2';
import Appc4 from './Centralh';
import Appc5 from './Backwardh2';
import Appc6 from './Forwardh';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TAP1 extends Component {
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
            <Menu.Item key="bisection">
              <Icon type="appstore" />
              Backwardh
              <Link to='/Appc' />

            </Menu.Item>
            <Menu.Item key="app2">
              <Icon type="appstore" />
              ForwardH2
              <Link to='/Appc2' />

            </Menu.Item>
            <Menu.Item key="app3">
              <Icon type="appstore" />
              Centralh2
              <Link to='/Appc3' />

            </Menu.Item>
            <Menu.Item key="app4" >
              <Icon type="appstore" />
              Centralh
              <Link to='/Appc4' />

            </Menu.Item>
            <Menu.Item key="app5" >
              <Icon type="appstore" />
              Backwardh2
              <Link to='/Appc5' />
            </Menu.Item>
            <Menu.Item key="app6" >
              <Icon type="appstore" />
              Forwardh
              <Link to='/Appc6' />
            </Menu.Item>
          </Menu>
          <Content>
            <Layout>
              <Route path="/Appc" component={Appc} />
              <Route path="/Appc2" component={Appc2} />
              <Route path="/Appc3" component={Appc3} />
              <Route path="/Appc4" component={Appc4} />
              <Route path="/Appc5" component={Appc5} />
              <Route path="/Appc6" component={Appc6} />
            </Layout>
          </Content>
        </Layout>
      </Router>

    );
  }
}

export default TAP1;