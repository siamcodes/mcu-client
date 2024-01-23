import React, { useState } from 'react'
import { Menu, Badge } from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));

    let history = useHistory();

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    const profile = () => {
        history.push("/user/profile");
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />} >
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />} >
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>

            {!user && (
                <Item key="register" icon={<UserAddOutlined />} style={{ float: 'right' }}>
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} style={{ float: 'right' }}>
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    style={{ float: 'right' }}
                >
                    {user && user.role === "subscriber" && (
                        <Item icon={<UnorderedListOutlined />}>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === "admin" && (
                        <Item icon={<UnorderedListOutlined />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}
                    <Item icon={<UserOutlined />} onClick={profile}>Profile</Item>
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
                </SubMenu>
            )}

            <Item key="shop" icon={<ContactsOutlined />} style={{ float: 'right' }}>
                <Link to="/user/contact">Contact</Link>
            </Item>

            <span className="p-1" style={{ float: 'right' }}>
                <Search />
            </span>
        </Menu>
    )
}

export default Header;
