import React from 'react';
import Col from "react-bootstrap/Col";
import {Card, Image} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom"
import {ARTICLE_ROUTE, DEVICE_EDIT_ROUTE} from "../utils/consts";

const ArticleItem = ({article}) => {
    const navigate = useNavigate()
    console.log(navigate)
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(ARTICLE_ROUTE + '/' + article.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + article.img}/>

                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    <div>{article.author}</div>
                </div>
                <div>
                    <div>{article.name}</div>
                </div>

            </Card>
        </Col>
    );
};

export default ArticleItem;