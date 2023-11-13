import React, {useContext} from 'react';
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Col from "react-bootstrap/Col";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Col key={brand.id} md={3} className="p-0"> { /* Add a Col here. Configure md's value with the number of columns you want for specific device size */ }
                    <Card
                        style={{cursor: 'pointer'}}
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                        className="p-2"
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;