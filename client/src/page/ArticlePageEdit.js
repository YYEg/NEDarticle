import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useNavigate} from 'react-router-dom';
import {fetchDeleteArticle, fetchOneArticle, updateArticles} from "../http/ArticleAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


const DevicePageEdit = observer(() => {
    const {article} = useContext(Context);
    const {id} = useParams();
    const [articleCurr, setArticleCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectYear, setSelectYear] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [author, setAuthor] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);
    const navigate = useNavigate()

    const deleteDevice = () => {
        fetchDeleteArticle(id).then(() => {
            navigate(ADMIN_ROUTE); // Use navigate directly inside the function
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result.toString());
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('author', author);
        formData.append('img', imgFile);
        formData.append('yearId', selectYear.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateArticles(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(articleCurr.info && articleCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if (
            articleCurr &&
            articleCurr.year &&
            articleCurr.type &&
            selectYear &&
            selectType
        ) {
            if (
                articleCurr.year.name !== selectYear.name ||
                articleCurr.type.name !== selectType.name ||
                articleCurr.name !== name ||
                articleCurr.author !== author ||
                checkInfoVal ||
                img

            ) {
                setDisabledPutBtn(false);
                console.log("ura!")
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectYear, selectType, author, img, info]);

    useEffect(() => {
        fetchOneArticle(id).then(data => {
            setArticleCurr(data);
            setSelectYear(data.year);
            setSelectType(data.type);
            setName(data.name);
            setAuthor(data.author);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            id:
                        </Col>
                        <Col xs={11}>
                            {articleCurr.id}
                        </Col>
                    </Row>
                    {/*Year*/}

                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Name:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Введите название аннотации пожалуйста</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Price:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {author === 0 && <b style={{color: "red"}}>Пожалуйста введите автора аннотации</b>}
                        </Col>
                    </Row>

                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <h4 className="text-white">Дополнительные характеристики</h4>
                        <Button
                            variant="success"
                            onClick={() => addInfo()}
                        >
                            Добавить новую
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Название характиристики"
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title &&  <b style={{color: "red"}}>Please input name</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Описание характеристики"
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description &&  <b style={{color: "red"}}>Please input description</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteInfo(item.number)}
                                    >
                                        Удалить новую характеристику
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить аннотацию</Button> : <Button onClick={putDevice}>Обновить аннотацию</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить аннотацию</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить эту аннотацию {articleCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteDevice}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default DevicePageEdit;

