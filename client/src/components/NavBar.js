import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Электрон</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <button variant={"outline-light" } className="m-md-3">Админ панель</button>
                        <button variant={"outline-light"} className="m-md-3">Войти</button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;