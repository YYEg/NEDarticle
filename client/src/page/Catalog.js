import React, { useContext, useEffect } from 'react';
import TypeBar from "../components/TypeBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import YearBar from "../components/YearBar";
import ArticleList from "../components/ArticleList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchYear, fetchArticle, fetchType } from "../http/ArticleAPI";
import Pages from "../components/Pages";
import { Image } from "react-bootstrap";
import bgMain from "../assets/bgMain.jpg";
import "../styles/catalog.css";

const Catalog = observer(() => {
    const { article } = useContext(Context)

    useEffect(() => {
        fetchType().then(data => article.setTypes(data))
        fetchYear().then(data => article.setYears(data))
        fetchArticle(null, null, 1, 4).then(data => {
            article.setArticles(data.rows)
            article.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchArticle(article.selectedType.id, article.selectedYear.id, article.page, 4).then(data => {
            article.setArticles(data.rows)
            article.setTotalCount(data.count)
        })
    }, [article.page, article.selectedType, article.selectedYear])

    return (
        <div className="shop-container">
            <div className="background"></div>
            <Container className="mt-2">
                <Row className="mt-3">
                    <Col md={12} className="mt-2">
                        <YearBar />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={3} className="mt-2">
                        <TypeBar />
                    </Col>
                    <Col md={9} className="mt-2">
                        <ArticleList />
                        <Pages />
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Catalog;