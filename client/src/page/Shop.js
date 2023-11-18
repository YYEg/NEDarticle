import React, {useContext, useEffect} from 'react';


import TypeBar from "../components/TypeBar";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevices, fetchType} from "../http/DeviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])
    return (
        <Container>
            <Row className="mt-3">
                <Col  md={3}>
                    <TypeBar/>
                </Col>
                <Col  md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;