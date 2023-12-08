import React, { useContext, useState, useEffect } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateYear";
import CreateArticle from "../components/modals/CreateArticle";
import { Context } from "../index";
import Col from "react-bootstrap/Col";
import {checkAdmin} from "../http/userAPI";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const { user } = useContext(Context);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        console.log("Fetching admin status..."); // Add a log statement to indicate the start of the fetch
        const fetchAdminStatus = async () => {
            try {
                console.log("Before calling checkAdmin");
                const isAdmin = await checkAdmin();
                console.log("After calling checkAdmin, isAdmin:", isAdmin);
                setIsAdmin(isAdmin);
                console.log("isAdmin state updated:", isAdmin);
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(true); // Set admin status to false in case of error
            }
        };

        fetchAdminStatus();
    }, []);

    return (
        <Container className="d-flex flex-column">
            {isAdmin ? (
                <div>
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
                        onClick={() => setBrandVisible(true)}
                    >
                        Добавить год
                    </Button>
                </div>
            ) : (
                <h1 className="text-primary text-xxl-center bg-white mt-3 p-2">Добавьте свою аннотацию нажав на кнопку ниже!</h1>
            )}
            <Button
                variant={"primary"}
                className="mt-5 p-3"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить аннотацию
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateArticle show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;