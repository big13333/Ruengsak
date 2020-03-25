import React, { Component } from 'react';
import { Menu, Input, Row, Col, Button, Card, Table } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { compile, derivative } from 'mathjs';
import axios from 'axios';
import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const InputStyle = {
    background: "#1890ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var y, error, exact;
class Appc4 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (this.func(x+(1*h)) - this.func(x-(1*h))) / (2*h)
                break;
            case 2:
                y = (this.func(x+(1*h)) - 2*this.func(x) + this.func(x-(1*h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + 2*this.func(x-(1*h)) - this.func(x-(2*h))) / (2*Math.pow(h, 3))
                break;
            default:
                y = (this.func(x+(2*h)) - 4*this.func(x+(1*h)) + 6*this.func(x) - 4*this.func(x-(1*h)) + this.func(x-(2*h))) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y) * 100
        this.setState({
            showOutputCard: true
        })
    }
    useEffectd = async(number)=>{
        var tempfx = "",xl,xr;
        var response = await axios.get('http://localhost:3002/api/users/showBackwardh').then(res => {return res.data});
        this.setState({
            fx:response['data'][number-1]['fx'],
            x:response['data'][number-1]['n'],
            h:response['data'][number-1]['b'],
            degree:response['data'][number-1]['a']
        })
        this.backwardh(this.state.x,this.state.h,this.state.degree);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr
        for (var i = 1; i <= degree; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }

        let scope = { x: parseFloat(X) }
        return expr.eval(scope)
    }
    render() {
        return (
            <Router>
                <Layout>
                    <Content
                        style={{
                            background: '#FFCC66',
                            padding: 24,
                            margin: 30,
                            minHeight: 280,
                            fontSize: 24
                        }}
                        onChange={this.handleChange}
                    >
                        {/*-----------------------------------------ปุ่มINPUTสมการ----------------------------------------------------*/}
                        <Row gutter={[40, 40]}
                            title={"Input Bisection"}
                            bordered={true}
                            style={{ float: "center" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <Col span={10} offset={7}>
                                <h2>f(x)</h2><Input size="large" name="fx" ></Input>
                                <br></br>
                                <br></br>
                                <h2>Order derivative</h2><Input size="large" name="degree" ></Input>
                                <br></br>
                                <br></br>
                                <h2>X</h2><Input size="large" name="x" ></Input>
                                <br></br>
                                <br></br>
                                <h2>H</h2><Input size="large" name="h" ></Input><br /><br />
                                <Button id="submit_button" onClick={
                                    () => this.backwardh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                                }
                                    style={{ fontSize: "20px" }}>Submit</Button>
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="number" />
                                <br></br>
                                <br></br>
                                <Button id="print2" type="primary" shape="round" size="large"
                                    onClick={
                                        () => this.useEffectd(parseFloat(this.state.number))
                                    }
                                >
                                    DATABASE
                                </Button>
                            </Col>
                        </Row>
                        <br></br>
                        {/*---------------------------------------------------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                            {this.state.showOutputCard && 
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    style={{ float: "left" }}
                                    id="outputCard"
                                >
                                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                        Approximate = {y}<br />
                                        Exact = {exact.toFixed(8)}<br />
                                        Error(ε) = {error.toFixed(4)}%<br />
                                    </p>
                                </Card>
                                } 
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Router>
        );
    }
}
export default Appc4;