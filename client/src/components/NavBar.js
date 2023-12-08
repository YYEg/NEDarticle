import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom"
import {ADMIN_ROUTE, LIB_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import ratingStar from "../assets/ratingStar.png";
import elogo from "../assets/elogo.png"

const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Nav.Link style={{color:'white'}} href={'/'}>
                    <Image width={108} height={40} src={elogo}/>
                </Nav.Link>
                {user.isAuth ?
                    <Nav className="me-auto">
                        <Button
                            variant={"outline-primary"}
                            className="m-lg-1"
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-primary"}
                            className="m-lg-1"
                            onClick={() => logOut()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="me-auto">
                        <Button variant={"outline-primary"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;