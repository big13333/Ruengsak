import React, { Component } from 'react'
import './App.css';
import { Menu, Input, Row, Col, Button, Card, Table } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';
import { range, compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",


};
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";
class Appg2 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
    }

    graphical() {
        fx = this.state.fx;
        var data = []
        data['x'] = []
        data['y'] = []
        console.log(typeof (this.state.start))
        for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
            data['x'].push(i);
            data['y'].push(this.func(i));

        }

        this.createTable(data['x'], data['y']);
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
            xl:response['data'][number-1]['xl'],
            xr:response['data'][number-1]['xr']
        })
        this.bisection(this.state.xl,this.state.xr);
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < parseInt(this.state.finish - this.state.start); i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
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
                                <Input size="large" placeholder="Basic usage" name="start" />
                                <br></br>
                                <br></br>
                                <Input size="large" placeholder="Basic usage" name="finish" />
                                <br></br>
                                <br></br>
                                <Button id="print2" type="primary" shape="round" size="large"
                                    onClick={
                                        () => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))
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
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={"Output"}
                                    bordered={true}
                                    id="outputCard"
                                >
                                    <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
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
export default Appg2;