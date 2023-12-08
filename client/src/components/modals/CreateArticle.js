import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useContext} from "react";
import {Context} from "../../index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {createArticle, fetchYear, fetchArticle, fetchType} from "../../http/ArticleAPI";
import {observer} from "mobx-react-lite";

const CreateArticle = observer(({show, onHide}) => {
    const {article} = useContext(Context)

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchType().then(data => article.setTypes(data))
        fetchYear().then(data => article.setYears(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('author', author)
        formData.append('img', file)
        formData.append('text', text)
        formData.append('yearId', article.selectedYear.id)
        formData.append('typeId', article.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createArticle(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый год выпуска статей
                </Modal.Title>
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
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        className="mt-2"
                        placeholder="Введите автора статьи"
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
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateArticle;