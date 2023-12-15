import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteYear, deleteType, fetchYear, fetchType} from "../../http/ArticleAPI";

const DeleteBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [yearOrType, setYearOrType] = useState("Year");
    const [year, setYear] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectYear, setSelectYear] = useState({name: "год не выбран"});
    const [selectType, setSelectType] = useState({name: "тип не выбран"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchType().then(data => setTypes(data));
        fetchYear().then(data => setYear(data));
    }, []);

    const Delete = async () => {
        if(yearOrType === "год") {
            if(selectYear.name !== "год не выбран") {
                await deleteYear(selectYear.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectYear({name: "год не выбран"});
                });
            } else {
                setMsgErr("Пожалуйста выберите год");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "тип не выбран") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "тип не выбран"});
                });
            } else {
                setMsgErr("Пожалуста укажите тип аннотации");
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
                        {yearOrType === "Year" ? <Dropdown.Item disabled>Year</Dropdown.Item> : <Dropdown.Item onClick={() => setYearOrType("Year")}>Год</Dropdown.Item>}
                        {yearOrType === "Type" ? <Dropdown.Item disabled>Type</Dropdown.Item> : <Dropdown.Item onClick={() => setYearOrType("Type")}>Тип</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Choose item of {yearOrType === "Год" ? "Год" : "Год"}
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
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrandOrType;
