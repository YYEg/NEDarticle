import React, { useContext, useState, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateYear from "../components/modals/CreateYear";
import CreateArticle from "../components/modals/CreateArticle";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import {checkAdmin, reciveUserName} from "../http/userAPI";
import DeleteYearOrType from "../components/modals/DeleteYearOrType";
import {getAllArticlesInAdminPage} from "../http/ArticleAPI";

import {
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";
import {DEVICE_EDIT_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";


const Admin = () => {
    const [yearVisible, setYearVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [articleVisible, setArticleVisible] = useState(false);
    const { user } = useContext(Context);
    const [isAdmin, setIsAdmin] = useState(false);
    const [deleteYearOrType, setDeleteYearOrType] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [searchArticle, setSearchArticle] = useState('');
    const [searchedArticle, setSearchedArticle] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];


    useEffect(() => {
        console.log("Fetching admin status..."); // Add a log statement to indicate the start of the fetch
        const fetchAdminStatus = async () => {
            try {

                const isAdmin = await checkAdmin();

                setIsAdmin(isAdmin);

            } catch (error) {

                setIsAdmin(true); // Set admin status to false in case of error
            }
        };

        fetchAdminStatus();
    }, []);

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }
    const fetchDevice = () => {
        getAllArticlesInAdminPage(searchArticle, currentPage, filter).then(({count, rows}) => {
            setSearchedArticle(rows);
            setCount(count)
        })
    };

    return (
        <Container className="d-flex flex-column">
            {isAdmin ? (
                <Container className="d-flex flex-column">
                    <Button
                        variant={"primary"}
                        className="mt-5 p-3"
                        onClick={() => setTypeVisible(true)}
                    >
                        Добавить тип
                    </Button>
                    <Button
                        variant={"primary"}
                        className="mt-5 p-3"
                        onClick={() => setYearVisible(true)}
                    >
                        Добавить год
                    </Button>
                    <Button
                        onClick={() => setDeleteYearOrType(true)}
                        variant="primary"
                        className="mt-4 p-2"
                    >
                        Удалить год или тип
                    </Button>

                </Container>



            ) : (
                <h1 className="text-primary text-xxl-center bg-white mt-3 p-2">Добавьте свою аннотацию нажав на кнопку ниже!</h1>
            )}
            <Button
                variant={"primary"}
                className="mt-5 p-3"
                onClick={() => setArticleVisible(true)}
            >
                Добавить аннотацию
            </Button>

            <CreateYear show={yearVisible} onHide={() => setYearVisible(false)}/>
            <CreateArticle show={articleVisible} onHide={() => setArticleVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteYearOrType show={deleteYearOrType} onHide={() => setDeleteYearOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>
        </Container>
    );
};

export default Admin;