import React, { Component } from 'react'
import './App.css';
import { Menu, Input, Row, Col, Button, Card, Table } from 'antd';
import { Carousel } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { range, compile, lusolve, format, det, subtract, multiply, transpose, add, inv, fraction } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const InputStyle = {
    background: "#f58216",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var A = [], B = [], matrixA = [], matrixB = [], x, epsilon, output = [], dataInTable = [], count = 1
var columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    }
];

class Appc9 extends Component {

    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm: true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.seidel = this.seidel.bind(this);

    }


    seidel(n) {
        this.initMatrix();
        x = new Array(n);
        var xold = new Array(n);
        epsilon = new Array(n);
        x.fill(0)
        xold.fill(0);
        do {
            xold = JSON.parse(JSON.stringify(x));
            for (var i = 0; i < n; i++) {
                var sum = 0;
                for (var j = 0; j < n; j++) {
                    if (i !== j) { //else i == j That is a divide number
                        sum = sum + A[i][j] * x[j];
                    }
                }
                x[i] = (B[i] - sum) / A[i][i]; //update x[i]

            }
        } while (this.error(x, xold)); //if true , continue next iteration


        for (i = 0; i < x.length; i++) {
            output.push(x[i]);
            output.push(<br />);
        }
        this.setState({
            showOutputCard: true
        });


    }
    error(xnew, xold) {
        for (var i = 0; i < xnew.length; i++) {
            epsilon[i] = Math.abs((xnew[i] - xold[i]) / xnew[i])
        }
        this.appendTable(x, epsilon);
        for (i = 0; i < epsilon.length; i++) {
            if (epsilon[i] > 0.000001) {
                return true;
            }
        }
        return false;
    }
    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)


        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true
        })



    }
    initMatrix() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }
    initialSchema(n) {
        for (var i = 1; i <= n; i++) {
            columns.push({
                title: "X" + i,
                dataIndex: "x" + i,
                key: "x" + i
            })
        }
        for (i = 1; i <= n; i++) {
            columns.push({
                title: "Error" + i,
                dataIndex: "error" + i,
                key: "error" + i
            })
        }
    }
    appendTable(x, error) {
        var tag = ''
        tag += '{"iteration": ' + count++ + ',';
        for (var i = 0; i < x.length; i++) {
            tag += '"x' + (i + 1) + '": ' + x[i].toFixed(8) + ', "error' + (i + 1) + '": ' + error[i].toFixed(8);
            if (i !== x.length - 1) {
                tag += ','
            }
        }
        tag += '}';
        dataInTable.push(JSON.parse(tag));
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
                            bordered={true}
                            onChange={this.handleChange}
                        >
                            <Col span={10} offset={7}>

                                <div>
                                    <h2>Row</h2><Input size="large" name="row" ></Input>
                                    <h2>Column</h2><Input size="large" name="column" ></Input>
                                </div>
                                {this.state.showDimentionButton &&
                                    <Button id="dimention_button" onClick={
                                        () => {
                                            this.createMatrix(this.state.row, this.state.column);
                                            this.initialSchema(this.state.row)
                                        }
                                    }
                                    >
                                        Submit<br></br>
                                    </Button>
                                }

                                {this.state.showMatrixButton &&
                                    <Button
                                        id="matrix_button"
                                        onClick={() => this.seidel(parseInt(this.state.row))}>
                                        Submit
                                    </Button>
                                }
                            </Col>
                        </Row>
                        <Row gutter={[40, 40]}>
                            <Col span={8} offset={4}>
                                <Card
                                    title={<h3>Matrix</h3>}
                                >
                                    {this.state.showMatrixForm && <div>{matrixA}</div>}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    title={<h3>Vector</h3>}
                                >
                                    {this.state.showMatrixForm && <div>{matrixB}</div>}
                                </Card>
                            </Col>
                        </Row>
                        <br></br>

                        {/*---------------------------------------------------------------------------------------------*/}
                        <Row gutter={[2, 2]}>
                            <Col span={10} offset={7}>
                                <Card
                                    title={<h3>Output</h3>}
                                    bordered={true}
                                    onChange={this.handleChange} id="answerCard">
                                    <Table columns={columns} dataSource={dataInTable} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll" }}
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
export default Appc9;