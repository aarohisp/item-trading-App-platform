import React, { useState } from "react";
import type { CascaderProps } from "antd";
import weildy_logo from "../../assets/pictures/logo.png";
import styles from "./Regindex.module.css";
import { AutoComplete, Button, Cascader, Checkbox, Col, message, Form, Input, InputNumber, Row, Select } from "antd";
import Topbar from "../Topbar";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory from React Router

const { Option } = Select;

const Regindex: React.FC = () => {
  const [form] = Form.useForm();
  const apiUrl = "http://localhost:5000"; // API server URL
  const history = useHistory(); // Initializing history for navigation
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${apiUrl}/api/register`, values);

      if (response.status === 200) {
        // Registration successful
        console.log("Registration successful:", response.data);
        message.success("Registration successful!");
        form.resetFields(); // Clear the form
        history.push("/home");
      } else if (response.status === 200 && response.data.status === "danger") {
        message.error("User already exists in database. Please Login or contract admin");
        // Handle registration failure due to existing user
        setErrorMessage(response.data.message);
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult([".com", ".org", ".net"].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website
  }));

  return (
    <>
      <Topbar />
      <div className="gx-app-login-wrap" style={{ marginTop: "10px" }}>
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content" style={{ textAlign: "end" }}>
            <div className="regindex-form-container" style={{ paddingTop: "10px", marginTop: "40px" }}>
              <h6 className={styles["signIn-description"]} style={{ fontSize: 40 }}>
                Registration Form
              </h6>
              <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} initialValues={{ prefix: "" }} style={{ maxWidth: 700, marginLeft: 200 }} scrollToFirstError>
                <Form.Item
                  name="uname"
                  label="Your Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phoneno"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!"
                    }
                  ]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Additional fields can be added here according to your requirements */}

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regindex;
