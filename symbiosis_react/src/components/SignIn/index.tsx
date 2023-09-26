import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import weildy_logo from "../../assets/pictures/logo.png";
import styles from "./SignIn.module.css";

const SignIn = () => {
  // CONSTANTS
  const history = useHistory();

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">{/* <img alt="adani_airport" src={weildy_logo} /> */}</div>
          <div className={`gx-app-login-content ${styles["signIn-form"]}`}>
            <img alt="adani_logo" src={weildy_logo} className={`${styles["adani-logo"]}`} />
            <h6 className={styles["signIn-description"]}>Welcome Message</h6>
            <Form autoComplete="off" initialValues={{ remember: true }} name="basic" className={`gx-signin-form gx-form-row0`}>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    message: "The input is not a valid e-mail address."
                  },
                  { required: true, message: "The user name is required" }
                ]}
              >
                <Input placeholder="Username/Email" />
              </Form.Item>
              <Form.Item name="password" className={styles["signIn-form__password"]} rules={[{ required: true, message: "The password is required" }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button className={`${styles["signIn-btn"]} button-gradiant`} htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
