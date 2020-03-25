import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import Appc from './LU';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Appc2 from './Cramer';
import Appc3 from './Gauss';
import Appc4 from './Cholesky';
import Appc5 from './Gradient';
import Appc6 from './Inverse';
import Appc7 from './Jacobi';
import Appc8 from './Jordan';
import Appc9 from './Seidel';
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
              LU
              <Link to='/Appc' />

            </Menu.Item>
            <Menu.Item key="app2">
              <Icon type="appstore" />
              Cramer
              <Link to='/Appc2' />

            </Menu.Item>
            <Menu.Item key="app3">
              <Icon type="appstore" />
              Gauss
              <Link to='/Appc3' />

            </Menu.Item>
            <Menu.Item key="app4" >
              <Icon type="appstore" />
              Cholesky
              <Link to='/Appc4' />

            </Menu.Item>
            <Menu.Item key="app5" >
              <Icon type="appstore" />
              Gradient
              <Link to='/Appc5' />
            </Menu.Item>
            <Menu.Item key="app6" >
              <Icon type="appstore" />
              Inverse
              <Link to='/Appc6' />
            </Menu.Item>
            <Menu.Item key="app7" >
              <Icon type="appstore" />
              Jacobi
              <Link to='/Appc7' />
            </Menu.Item>
            <Menu.Item key="app8" >
              <Icon type="appstore" />
              Jordan
              <Link to='/Appc8' />
            </Menu.Item>
            <Menu.Item key="app9" >
              <Icon type="appstore" />
              Secant
              <Link to='/Appc9' />
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
              <Route path="/Appc7" component={Appc7} />
              <Route path="/Appc8" component={Appc8} />
              <Route path="/Appc9" component={Appc9} />
            </Layout>
          </Content>
        </Layout>
      </Router>

    );
  }
}

export default TAP1;