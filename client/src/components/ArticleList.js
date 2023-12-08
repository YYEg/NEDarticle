import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ArticleItem from "./ArticleItem";

const ArticleList = observer(() => {
    const {article} = useContext(Context)

    return (
        <Row className="d-flex">
            {article.articles.map(article =>
                <ArticleItem key={article.id} article={article}/>
            )}
        </Row>
    );
});

export default ArticleList;