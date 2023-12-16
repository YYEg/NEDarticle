import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../index";
import { createArticle, fetchYear, fetchArticle, fetchType } from "../../http/ArticleAPI";
import { observer } from "mobx-react-lite";
import {reciveUserName} from "../../http/userAPI";

const CreateArticle = observer(({ show, onHide }) => {
    const { article } = useContext(Context);

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchType().then(data => article.setTypes(data));
        fetchYear().then(data => article.setYears(data));
    }, []);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const aName = await reciveUserName();
                setAuthor(aName);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        }
        fetchUserName();
    }, []);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }]);
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const validateFields = () => {
        return name && author && text && file && article.selectedYear && article.selectedType;
    }

    const addArticle = () => {
        if (validateFields()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('author', author);
            formData.append('img', file);
            formData.append('text', text);
            formData.append('yearId', article.selectedYear.id);
            formData.append('typeId', article.selectedType.id);
            if (info.length > 0) {
                formData.append('info', JSON.stringify(info));
            }
            createArticle(formData).then(() => onHide());
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый год выпуска статей</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{article.selectedType.name || "Выберите тип статьи"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {article.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => article.setSelectedType(type)}
                                    key={type.id}
                                >{type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{article.selectedYear.name || "Выберите год статьи"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {article.years.map(year =>
                                <Dropdown.Item
                                    onClick={() => article.setSelectedYear(year)}
                                    key={year.id}
                                >{year.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Введите название статьи"
                    />
                    <Form.Control
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="mt-2"
                        placeholder="Введите текст аннотации"
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Выберите файл"
                        type="file"
                        accept=".jpg"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Выберите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Выберите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addArticle} disabled={!validateFields()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateArticle;