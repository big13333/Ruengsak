import React, { Component } from 'react'
import './App.css';
import { Menu, Input, Row, Col, Button, Card, Table } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { range, compile, derivative } from 'mathjs';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Appg6 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x0, x1) {
        fx = this.state.fx;
        var x = [], y = 0, epsilon = parseFloat(0.000000);
        var n = 1, i = 1;
        var data = []
        data['y'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";

        do {
            y = x[i] - (this.func(x[i]) * ((x[i] - x[i - 1]))) / (this.func(x[i]) - this.func(x[i - 1]));
            x.push(y);
            epsilon = this.error(y, x[i]);
            data['y'][n] = y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);

            n++;
            i++;

        } while (Math.abs(epsilon) > 0.000001);
        this.createTable(data['y'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    useEffectd = async(number)=>{
        var tempfx = "",xl,xr;
        var response = await axios.get('http://localhost:3002/api/users/showbisectionmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][number-1]['fx'],
            x0:response['data'][number-1]['xl'],
            x1:response['data'][number-1]['xr']
        })
        this.secant(this.state.x0,this.state.x1);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(y, error) {
        dataInTable = []
        for (var i = 0; i < y.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                y: y[i],
                error: error[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                                <Input size="large" placeholder="Basic usage" name="fx" />
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="x0" />
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="x1" />
                                <br></br>
                                <br></br>
                                <Button id="print2" type="primary" shape="round" size="large"
                                    onClick={
                                        () => this.secant(parseFloat(this.state.x0), parseFloat(this.state.x1))
                                    }
                                >
                                    INPUT
                                </Button>
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
                        {/*-----------------------------------------------Graph-------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                >
                                    <LineChart width={730} height={250} data={dataInTable}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="error" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line name="pv of pages" type="monotone" dataKey="error" stroke="#8884d8" />
                                    </LineChart>
                                </Card>
                            </Col>
                        </Row>
                        {/*---------------------------------------------------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    id="outputCard"
                                >
                                    <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                                    ></Table>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Router>
        );
    }
}
export default Appg6;