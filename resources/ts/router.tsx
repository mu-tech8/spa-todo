import React, { useEffect } from "react";
import { Routes, Route, Link, RouteProps, Navigate } from "react-router-dom";
import { HelpPage } from "./pages/help";
import { LoginPage } from "./pages/login";
import { TaskPage } from "./pages/tasks";
import axios from "axios";
import { useLogout, useUser } from "./queries/AuthQuery";
import { useAuth } from "./hooks/AuthContext";

export const Router = () => {
    const logout = useLogout();
    const { isAuth, setIsAuth } = useAuth();
    const { isLoading, data: authUser } = useUser();

    useEffect(() => {
        if (authUser) {
            setIsAuth(true);
        }
    }, [authUser]);

    const GuardRoute = (props: RouteProps) => {
        if (!isAuth) return <Navigate to="/login" />;
        return <Route {...props} />;
    };
    const LoginRoute = (props: RouteProps) => {
        if (isAuth) return <Navigate to="/" />;
        return <Route {...props} />;
    };

    const navigation = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/">ホーム</Link>
                </li>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li
                    onClick={() => {
                        logout.mutate();
                    }}
                >
                    <span>ログアウト</span>
                </li>
            </ul>
        </header>
    );

    const loginNavigation = (
        <header className="global-head">
            <ul>
                <li>
                    <Link to="/help">ヘルプ</Link>
                </li>
                <li>
                    <Link to="/login">ログイン</Link>
                </li>
            </ul>
        </header>
    );

    return (
        <React.Fragment>
            {isAuth ? navigation : loginNavigation}
            <Routes>
                <Route path="/" element={<TaskPage />}></Route>
                <Route path="/help" element={<HelpPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </React.Fragment>
    );
};
