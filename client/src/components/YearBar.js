import React, {useContext} from 'react';
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Col from "react-bootstrap/Col";

const YearBar = observer(() => {
    const {article} = useContext(Context)

    return (
        <Row className="d-flex">
            {article.years.map(year =>
                <Col key={year.id} md={2} className="p-0"> { /* Add a Col here. Configure md's value with the number of columns you want for specific device size */ }
                    <Card
                        style={{cursor: 'pointer'}}
                        onClick={() => article.setSelectedYear(year)}
                        border={year.id === article.selectedYear.id ? 'danger' : 'light'}
                        className="p-2"
                    >
                        {year.name}
                    </Card>
                </Col>

            )}

        </Row>

    );
});

export default YearBar;