import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react-lite";

const Cart = observer(() => {
    return (
        <Container>
            <Row className="mt-3">
                <Col  md={3}>
                    <TypeBar/>
                </Col>
                <Col  md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Cart;