import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import styles from "./DonForm.module.css";
import { Card, Button, Form, Input, Radio, Select, InputNumber, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const { TextArea } = Input;

const validateProductName = (rule: any, value: string, callback: (error?: string) => void) => {
  const regexPattern = /^[a-zA-Z\s]+$/; // Regular expression to match alphabets and spaces
  const regex = new RegExp(regexPattern);

  if (!regex.test(value)) {
    callback('Should be a combination of alphabets and spaces only');
  } else {
    callback(); // Validation succeeded
  }
};


const DonForm1: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const history = useHistory();

  const handleSubmit = () => {
    // Use history.push to navigate to the desired page
    history.push('/Afterpost'); // Replace '/another-page' with the desired URL
  };
  

  const formItemLayout =
  formLayout === 'vertical'
    ? { labelCol: { span: 21}, wrapperCol: { span: 21, offset: 9 } }
    : formLayout === 'horizontal'
    ? { labelCol: { span: 14 }, wrapperCol: { span: 8 } }
    : null;

  const buttonItemLayout =
  formLayout === 'vertical' 
    ? { wrapperCol: { span: 17, offset: 9 } } 
    : formLayout === 'horizontal' 
    ? { wrapperCol: { span: 14, offset: 4 } } 
    : null;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const onFinish = (values: { name: string }) => {
    console.log('Form values:', values);
    history.push('/Afterpost');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:'30px'  }}>
        <h1>Donation Form</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center',  paddingTop:'10px' }}>
        <Card title="Donation Form" bordered={false} style={{ width: 1100 }}>
        <div style={{ display: "flex", flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Form 
            autoComplete="off"
            name="myForm"
            onFinish={onFinish}
            labelCol={{ span: 15 }}
          >
          <div style={{ justifyContent:formLayout === 'vertical' ? 'none': 'center' , paddingRight: formLayout === 'horizontal' ? '110px' : '0' }}>
            <Form.Item label="Form Layout" name="layout">
              <Radio.Group value={formLayout}>
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
              </Radio.Group>
            </Form.Item>
            
              <Form.Item 
                label="What is the product's name?"
                //validateStatus={val_check}
                help="Should be combination of alphabets"
                
                name="productname" 
                rules={[
                  //{ validator: validateProductName },
                  {
                    type: "regexp",
                    pattern: /^[A-Za-z]+$/,
                    message: "The input is not a valid name. Only alphabetic characters are allowed."
                  },
                  { required: true, message: "The product name is required" }
                ]}
                style={{ paddingBottom: '20px'}}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
              <Form.Item name="e-mail" label="Please enter your E-mail" 
                rules={[
                {
                  type: "email",
                  message: "The input is not a valid e-mail address."
                },
                { required: true, message: "The email is required" }
                ]}
              >
                <Input placeholder="Owner Email" />
              </Form.Item>
              <Form.Item name="name" label="What's your preferred name?" 
                rules={[
                  //{ validator: validateProductName },
                  {
                    type: "regexp",
                    pattern: /^[A-Za-z]+$/,
                    message: "The input is not a valid name. Only alphabetic characters are allowed."
                  },
                  { required: true, message: "Your name is required" }
                ]}
                >
                <Input placeholder="Owner's Full Name" />
              </Form.Item>
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
              <Form.Item name="location" label="Where does our precious donor live?" 
                rules={[
                  //{ validator: validateProductName },
                  {
                    type: "regexp",
                    pattern: /^[A-Za-z]?-\d+(?:, [A-Za-z\d]+)*$/,
                    message: 'Invalid address format. Example: A-506, Marylane 202'
                  },
                  { required: true, message: "Your address is required" }
                ]}
                >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Please decribe the product" >
                <TextArea rows={2} />
              </Form.Item>
              
              <Form.Item 
                name="timeproduct"
                label="How long has the product been used?" 
                rules={[{ required: true, message: "The time used is required" }]}
              >
                <InputNumber placeholder="Time(in years)" />
              </Form.Item>
              <Form.Item
                name="upload"
                label="Please upload the product image."
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Please upload max. photos"
                rules={[{ required: true, message: "The image is required" }]}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Any comments or info we should be aware of?" labelCol={{ span: 15 }} >
                <TextArea rows={2} />
              </Form.Item>
              </div>
              <div style={{alignContent: "center", justifyContent: "center" }}>
              <Form.Item {...buttonItemLayout}>
             
                <Button type="primary" className={`${styles["signIn-btn"]} button-gradiant`} onClick={handleSubmit}>
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

