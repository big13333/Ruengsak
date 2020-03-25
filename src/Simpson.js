import React, { Component } from 'react';
import { Card, Input, Button, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { compile } from 'mathjs';
import axios from 'axios';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
var Algebrite = require('algebrite')

const InputStyle = {
    background: "#1890ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var I, exact, error;
class Appc3 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_simpson(a, b) {
        var h = (b - a) / 2
        I = (h / 2) * (this.func(a) + this.func(b))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact - I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({ x: b }) - expr.eval({ x: a })

    }
    summationFunction(start, h) {
        var n = 2;
        var sum = 0
        if (start % 2 === 0) {
            n += 2
        }
        var xi = parseInt(this.state.a) + h
        for (var i = start; i < n;) {
            i += 2
            sum += this.func(xi)
            xi = parseInt(this.state.a) + i * h
            alert(i * h)

        }

        return sum
    }
    useEffectd = async(number)=>{
        var tempfx = "",xl,xr;
        var response = await axios.get('http://localhost:3002/api/users/showCompositeSimpson').then(res => {return res.data});
        this.setState({
            fx:response['data'][number-1]['fx'],
            a:response['data'][number-1]['a'],
            b:response['data'][number-1]['b'],
        })
        this.composite_simpson(this.state.a,this.state.b);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
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
                        <Row gutter={[40, 40]}
                        >
                            <Col span={10} offset={7}>
                                <h2>f(x)</h2><Input size="large" name="fx" ></Input>
                                <h2>Lower bound (A)</h2><Input size="large" name="a" ></Input>
                                <h2>Upper bound (B)</h2><Input size="large" name="b" ></Input>
                                <Button id="submit_button" onClick={
                                    () => this.composite_simpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                                }
                                    style={{ color: "black", fontSize: "20px" }}>Submit</Button>
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
                        {/*-----------------------------------------ปุ่มINPUTสมการ----------------------------------------------------*/}

                        <br></br>

                        {/*---------------------------------------------------------------------------------------------*/}
                        <Row>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    style={{ width: "100%", float: "left" }}
                                    id="outputCard"
                                >
                                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                        Approximate = {I}<br />
                                Exact = {exact}<br />
                                Error = {error}%
                            </p>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Router>
        );
    }
}
export default Appc3;