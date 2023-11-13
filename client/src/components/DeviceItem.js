import React from 'react';
import Col from "react-bootstrap/Col";
import {Card, Image} from "react-bootstrap";
import ratingStar from'../assets/ratingStar.png'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    console.log(navigate)
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={device.img}/>
                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    <div>Samsung</div>
                    <div className="d-flex align-items-center">
                        <div className="m-lg-1">{device.rating}</div>
                        <Image width={18} height={18} src={ratingStar}/>
                    </div>
                </div>
                <div>
                    <div>{device.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;