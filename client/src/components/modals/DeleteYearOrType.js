import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteYear, deleteType, fetchYear, fetchType} from "../../http/ArticleAPI";

const DeleteBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [yearOrType, setYearOrType] = useState("Year");
    const [year, setYear] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectYear, setSelectYear] = useState({name: "A Brand not selected"});
    const [selectType, setSelectType] = useState({name: "A type not selected"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchType().then(data => setTypes(data));
        fetchYear().then(data => setYear(data));
    }, []);

    const Delete = async () => {
        if(yearOrType === "Year") {
            if(selectYear.name !== "A Year not selected") {
                await deleteYear(selectYear.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectYear({name: "A Year not selected"});
                });
            } else {
                setMsgErr("Please choose Year");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "A Type not selected") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "A type not selected"});
                });
            } else {
                setMsgErr("Please choose Type");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectYear, yearOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Type or Year
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Choose Category:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {yearOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {yearOrType === "Year" ? <Dropdown.Item disabled>Year</Dropdown.Item> : <Dropdown.Item onClick={() => setYearOrType("Year")}>Year</Dropdown.Item>}
                        {yearOrType === "Type" ? <Dropdown.Item disabled>Type</Dropdown.Item> : <Dropdown.Item onClick={() => setYearOrType("Type")}>Type</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Choose item of {yearOrType === "Year" ? "Year" : "Type"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {yearOrType === "Year" ? selectYear.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {yearOrType === "Year" ?
                            year.map(({id, name}) =>
                                selectYear.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectYear({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({id, name}) =>
                                selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={Delete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrandOrType;
