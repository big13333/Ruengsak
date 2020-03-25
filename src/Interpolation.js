import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import Appc from './Spline';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TAP4 extends Component {
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
              Spline
              <Link to='/Appc' />
                        </Menu.Item>
                    </Menu>
                    <Content>
                        <Layout>
                            <Route path="/Appc" component={Appc} />
                        </Layout>
                    </Content>
                </Layout>
            </Router>

        );
    }
}

export default TAP4;