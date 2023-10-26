import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

import { Link, useHistory } from "react-router-dom";

import axios from "axios"; // Make sure you've imported Axios

import weildy_logo from "../../assets/pictures/logo.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./SignIn.module.css";
import Topbar from "../Topbar";
import { setAuthenticated } from "./Auth";
import CONFIG from '../Config/config';

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const fetchData = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${CONFIG.API_ENDPOINT}/api/login`, { 
            username, 
            password 
        });

        console.log(response.data);

        if (response.data) {  // Optionally check for certain response values to determine success.
            setAuthenticated(true);  // Assuming a successful login will authenticate the user.
            history.push("/home");  // Redirecting to home after a successful login.
        } else {
            // You can handle specific failed login logic here if needed.
            setError('Login failed. Please check your credentials.');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        setError('Login failed. Please check your credentials.');
    }
};

const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const { username, password } = values;
    fetchData(username, password);
};


  return (
    <>
     <Topbar />
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">{/* <img alt="adani_airport" src={weildy_logo} /> */}</div>
            <div className={`gx-app-login-content ${styles["signIn-form"]}`}>
              <img alt="adani_logo" src={weildy_logo} className={`${styles["adani-logo"]}`} />
              <h6 className={styles["signIn-description"]}>Sign In</h6>
              <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                  <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <Link to="/registration">register now!</Link> {/* Updated link to registration */}
                </Form.Item>
              </Form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
