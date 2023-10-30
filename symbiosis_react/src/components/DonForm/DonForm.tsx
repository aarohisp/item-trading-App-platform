import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./DonForm.module.css";
import { Card, Button, Form, Input, Radio, Select, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type LayoutType = Parameters<typeof Form>[0]["layout"];
const { TextArea } = Input;

const validateProductName = (rule: any, value: string, callback: (error?: string) => void) => {
  const regexPattern = /^[a-zA-Z\s]+$/; // Regular expression to match alphabets and spaces
  const regex = new RegExp(regexPattern);

  if (!regex.test(value)) {
    callback("Should be a combination of alphabets and spaces only");
  } else {
    callback(); // Validation succeeded
  }
};

const DonForm1: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("image", values.upload[0].originFileObj);

      const imageResponse = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      if (imageResponse.status === 200) {
        const imageData = await imageResponse.json();
        if (imageData.status === "success") {
          console.log("Image uploaded successfully:", imageData.message);
          // Create an array to store the image_ids
          const imageIds = [imageData.image_id];
          console.log(imageIds);

          // Proceed to send the form data
          const productData = {
            item_name: values.item_name,
            descriptions: values.descriptions,
            time_used: values.time_used,
            donor_id: 5,
            category: values.category,
            item_address: values.item_address,
            image_info: imageIds, // Use the image_ids received from the server
            specification: values.specification
            // Add other form fields here
          };

          console.log("Product Data:", productData);

          // Send a POST request to add the product
          const productResponse = await fetch("http://localhost:5000/api/add_product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
          });

          if (productResponse.status === 200) {
            const productResult = await productResponse.json();
            if (productResult.status === "success") {
              console.log("Product added successfully:", productResult.message);
              form.resetFields();
              history.push("/Afterpost");
            } else {
              console.error("Product add failed:", productResult.message);
            }
          } else {
            console.error("Error:", productResponse.statusText);
          }
        } else {
          console.error("Image upload failed:", imageData.message);
        }
      } else {
        console.error("Error:", imageResponse.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const buttonItemLayout = formLayout === "vertical" ? { wrapperCol: { span: 17, offset: 9 } } : formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "30px" }}>
        <h1>Donation Form</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
        <Card title="Donation Form" bordered={false} style={{ width: 1100 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Form autoComplete="off" name="myForm" onFinish={onFinish} labelCol={{ span: 15 }}>
              <div style={{ justifyContent: formLayout === "vertical" ? "none" : "center", paddingRight: formLayout === "horizontal" ? "110px" : "0" }}>
                <Form.Item
                  label="What is the product's name?"
                  name="item_name"
                  rules={[
                    {
                      type: "regexp",
                      pattern: /^[A-Za-z]+$/,
                      message: "The input is not a valid name. Only alphabetic characters are allowed."
                    },
                    { required: true, message: "The product name is required" }
                  ]}
                  style={{ paddingBottom: "20px" }}
                >
                  <Input placeholder="Product Name" />
                </Form.Item>
                {/* <Form.Item
                  name="email"
                  label="Please enter your E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid e-mail address."
                    },
                    { required: true, message: "The email is required" }
                  ]}
                >
                  <Input placeholder="Owner Email" />
                </Form.Item> */}
                {/* <Form.Item
                  name="name"
                  label="What's your preferred name?"
                  rules={[
                    {
                      type: "regexp",
                      pattern: /^[A-Za-z]+$/,
                      message: "The input is not a valid name. Only alphabetic characters are allowed."
                    },
                    { required: true, message: "Your name is required" }
                  ]}
                >
                  <Input placeholder="Owner's Full Name" />
                </Form.Item> */}
                <Form.Item name="category" label="What is the product's category?" rules={[{ required: true, message: "Product's category is required" }]}>
                  <Select>
                    <Select.Option value="clothes">Clothes</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="furniture">Furniture</Select.Option>
                    <Select.Option value="schooless">School Essentials</Select.Option>
                    <Select.Option value="stationery">Stationery</Select.Option>
                    <Select.Option value="medicines">Medicines</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="item_address"
                  label="Where is the product located?"
                  rules={[
                    {
                      type: "regexp",
                      pattern: /^[A-Za-z]?-\d+(?:, [A-Za-z\d]+)*$/,
                      message: "Invalid address format. Example: A-506, Marylane 202"
                    },
                    { required: true, message: "The item address is required" }
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item name="descriptions" label="Please describe the product">
                  <TextArea rows={2} />
                </Form.Item>

                <Form.Item name="time_used" label="How long has the product been used?" rules={[{ required: true, message: "The time used is required" }]}>
                  <InputNumber placeholder="Time (in years)" />
                </Form.Item>
                <Form.Item name="upload" label="Please upload the product image." valuePropName="fileList" getValueFromEvent={normFile} extra="Please upload max. 5 photos" rules={[{ required: true, message: "The image is required" }]}>
                  <Upload name="logo" action="http://localhost:5000/api/upload" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item name="specification" label="Any comments or info we should be aware of?" labelCol={{ span: 15 }}>
                  <TextArea rows={2} />
                </Form.Item>
              </div>
              <div style={{ alignContent: "center", justifyContent: "center" }}>
                <Form.Item {...buttonItemLayout}>
                  <Button type="primary" className={`${styles["signIn-btn"]} button-gradiant`} htmlType="submit">
                    Post
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DonForm1;
