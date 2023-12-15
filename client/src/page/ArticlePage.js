import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import elogo from '../assets/elogo.png';
import { NavLink, useParams } from 'react-router-dom';
import { fetchOneArticle } from '../http/ArticleAPI';
import { DEVICE_EDIT_ROUTE } from '../utils/consts';
import { checkAdmin, reciveUserName } from '../http/userAPI';

const ArticlePage = () => {
    const [article, setArticle] = useState({ info: [] });
    const [isAdmin, setIsAdmin] = useState(false);
    const [author, setAuthor] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchOneArticle(id).then((data) => setArticle(data));
    }, []);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const aName = await reciveUserName();  // Await the promise to get the username
                if (aName === article.author) {
                    setIsAuthor(true);
                } else {
                    setIsAuthor(false);
                }
                console.log(aName);
                console.log(isAuthor);
            } catch (error) {
                console.error('Error fetching username:', error);
                // Handle the error if the username retrieval fails
            }
        };
        fetchUserName();  // Call the async function to fetch and set the author
    }, [article.author]);

    useEffect(() => {
        console.log('Fetching admin status...'); // Add a log statement to indicate the start of the fetch
        const fetchAdminStatus = async () => {
            try {
                const isAdmin = await checkAdmin();
                setIsAdmin(isAdmin);
            } catch (error) {
                setIsAdmin(false); // Set admin status to false in case of error
            }
        };

        fetchAdminStatus();
    }, []);

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + article.img}
                    />
                </Col>
                {isAdmin || isAuthor ? (
                    <Col md={4}>
                        <Image src={elogo} alt="" />
                        <NavLink style={{color:"white", fontSize:"32px", textAlign:"center"}} to={DEVICE_EDIT_ROUTE + `/${article.id}`}>Редактировать</NavLink>
                    </Col>
                ) : (
                    <Col md={4}>
                        <Image src={elogo} alt="" />
                    </Col>
                )}
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>Автор(ы): {article.author}</h3>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 className="text-white">Аннотация:</h1>
                <div className="bg-white">{article.text}</div>
            </Row>
        </Container>
    );
};

export default ArticlePage;