import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import elogo from "../assets/elogo.png"
import {useParams} from "react-router-dom";
import {fetchOneArticle} from "../http/ArticleAPI";

const ArticlePage = () => {
    const [article, setArticle] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneArticle(id).then(data => setArticle(data))
    }, [])
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + article.img}/>
                </Col>
                <Col md={4}>
                    <img src={elogo} alt=""/>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>Автор(ы):  {article.author}</h3>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 className="text-white">Об аннотации:</h1>
                {article.info.map(info =>
                    <Row key={info.id} style={{background: info.id % 2 !== 0  ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 className="text-white">Аннотация:</h1>
                <div className="bg-white">{article.text}</div>
            </Row>
        </Container>
    );
};

export default ArticlePage;