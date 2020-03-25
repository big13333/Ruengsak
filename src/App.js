import React, { Component } from 'react'
import './App.css';
import TAP1 from './bew';
import TAP2 from './goust';
import TAP3 from './simson';
import TAP4 from './Interpolation';
import TAP5 from './ward';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
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
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="appstore" />
                <span>Root of Equation</span>
                <Link to='/TAP1' />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="appstore" />
                <span>Linear Algebra</span>
                <Link to='/TAP2' />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="appstore" theme="outlined" />
                <span>Simson</span>
                <Link to='/TAP3' />
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="appstore" theme="outlined" />
                <span>Integration</span>
                <Link to='/TAP4' />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="appstore" theme="outlined" />
                <span>Differentiation</span>
                <Link to='/TAP5' />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Route>
                
            </Route>
            <Route path="/TAP1" component={TAP1} /><Route path="/TAP2" component={TAP2} />
            <Route path="/TAP3" component={TAP3} /><Route path="/TAP4" component={TAP4} />
            <Route path="/TAP5" component={TAP5} />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
