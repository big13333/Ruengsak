import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon } from 'antd';
import { Menu } from 'antd';
import APPG from './bisection';
import APPG2 from './Graphical';
import APPG3 from './Newton-raphson'
import APPG4 from './Onepoit';
import APPG5 from './False_position';
import APPG6 from './Secant';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TAP2 extends Component {
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
                            bisection
                        <Link to='/APPG' />
                        </Menu.Item>
                        <Menu.Item key="app2">
                            <Icon type="appstore" />
                            Graphical
                        <Link to='/APPG2' />
                        </Menu.Item>
                        <Menu.Item key="app3">
                            <Icon type="appstore" />
                            Newtong's
                            <Link to='/APPG3' />
                </Menu.Item>
                        <Menu.Item key="app4" >
                            <Icon type="appstore" />
                            Onepoint
                            <Link to='/APPG4' />
                </Menu.Item>
                        <Menu.Item key="app5" >
                            <Icon type="appstore" />
                            False position
                            <Link to='/APPG5' />
                </Menu.Item>
                <Menu.Item key="app6" >
                            <Icon type="appstore" />
                            Secant
                            <Link to='/APPG6' />
                </Menu.Item>
                    </Menu>
                    <Content>
                        <Layout>
                            <Route path="/APPG" component={APPG} />
                            <Route path="/APPG2" component={APPG2} />
                            <Route path="/APPG3" component={APPG3} />
                            <Route path="/APPG4" component={APPG4} />
                            <Route path="/APPG5" component={APPG5} />
                            <Route path="/APPG6" component={APPG6} />
                        </Layout>
                    </Content>
                </Layout>
            </Router>
        );
    }
}

export default TAP2;