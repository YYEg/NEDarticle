import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useNavigate} from 'react-router-dom';
import {fetchDeleteArticle, fetchOneArticle, updateArticles} from "../http/ArticleAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


const ArticlePageEdit = observer(() => {
    const {article} = useContext(Context);
    const {id} = useParams();
    const [articleCurr, setArticleCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");


    const [name, setName] = useState("");
    const [author, setAuthor] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [text, setText] = useState("");

    // Устанавливаем стандартное значение для selectYear
    const defaultYear = articleCurr?.year?.name || "Не указано";
    const [selectYear, setSelectYear] = useState({});

// Устанавливаем стандартное значение для selectType
    const defaultType = articleCurr?.type?.name || "Не указано";
    const [selectType, setSelectType] = useState({});


    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);
    const navigate = useNavigate()

    const deleteArticle = () => {
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

    const putArticle = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('author', author);
        formData.append('img', articleCurr.img);
        formData.append('text', text)

        if (selectYear) {
            formData.append('yearId', selectYear.id);
        }

        if (selectType) {
            formData.append('typeId', selectType.id);
        }

        formData.append('info', JSON.stringify(info));

        updateArticles(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000);
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
            articleCurr.type

        ) {
            if (
                articleCurr.year.name !== selectYear?.name ||
                articleCurr.type.name !== selectType?.name ||
                articleCurr.name !== name ||
                articleCurr.author !== author

            ) {
                setDisabledPutBtn(false);
                console.log("ura!")
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, author, text, info, selectType, selectYear]);

    useEffect(() => {
        fetchOneArticle(id).then(data => {
            setArticleCurr(data);
            setSelectYear(data.year);
            setSelectType(data.type);
            setName(data.name);
            setText(data.text);
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
                    <Row>
                        <Col xs={1} className="d-flex align-items-center text-white">
                            Год:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectYear?.name || defaultYear}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {article.years.map(year => {
                                        return year.name === selectYear?.name ?
                                            <Dropdown.Item
                                                key={year.id}
                                                disabled
                                            >
                                                {year.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={year.id}
                                                onClick={() => setSelectYear(year)}
                                            >
                                                {year.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center text-white">
                            Тип:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType?.name || defaultType}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {article.types.map(type => {
                                        return type.name === selectType?.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center text-white">
                            Название:
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
                    {/*Text*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center text-white">
                            Текст:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {text.length === 0 && <b style={{color: "red"}}>Введите название аннотации пожалуйста</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center text-white">
                            Автор:
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

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ?
                                <Button onClick={putArticle}>Обновить аннотацию</Button>
                                :
                                <Button onClick={putArticle}>Обновить аннотацию</Button>
                            }
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить аннотацию</Button>
                        </Col>
                        {showMsg && <Col xs={12} className="mt-3" style={{color: "white", fontSize: "32px"}}>{msg}</Col>}
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
                    <Button variant="primary" onClick={deleteArticle}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default ArticlePageEdit;

