import React from 'react';
import {Button, Card, Container, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import bigStar from "../assets/bigStar.png"

const DevicePage = () => {
    const device = {
        "id": 5,
        "name": "rs20",
        "price": 29990,
        "rating": 5,
        "img": "23d2bc93-c48a-406a-8d54-fbb8c4848b23.jpg"
    }
    const description = [
        {id:1, title: 'Оперативная память', description: '5гб'},
        {id:2, title: 'Камера', description: '12мп'},
        {id:3, title: 'Процессор', description: 'А13'},
        {id:4, title: 'Кол-во ядер', description: '2'},
        {id:5, title: 'Аккумулятор', description: '4000'}
    ]
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="text-center">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                        5
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} рубл.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {description.map(info =>
                    <Row key={info.id} style={{background: info.id % 2 !== 0  ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;