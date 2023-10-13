import React, { useState } from "react";
import { Button, Input, Typography, Form, Alert } from "antd";
import "./UpdatePassword.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

interface UpdatePasswordProps {}

const UpdatePassword: React.FC<UpdatePasswordProps> = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [strengthMessage, setStrengthMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) return "Password should be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Should contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Should contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Should contain a number";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) return "Should contain a symbol";
    return "Strong password";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the new password meets the constraints
    const strength = checkPasswordStrength(newPassword);
    if (strength !== "Strong password") {
      setError(strength);
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password cannot be the same as the current password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match");
      return;
    }
    // Handle the password update logic here
    console.log("Updating password...");
  };

  return (
    <div className="mainLayout">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="updatePasswordContainer">
          <Typography.Title level={2} className="updatePasswordTitle">
            Update Password
          </Typography.Title>
          {error && <Alert message={error} type="error" />}
          <Form onFinish={handleSubmit}>
            <Form.Item label="Current Password">
              <Input.Password
                value={currentPassword}
                onChange={(e) => {
                  setError(""); // Clear the error
                  setCurrentPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="New Password">
              <Input.Password
                value={newPassword}
                onChange={(e) => {
                  const strength = checkPasswordStrength(e.target.value);
                  setStrengthMessage(strength);
                  setNewPassword(e.target.value);
                }}
              />
              <div className="passwordStrengthMessage">{strengthMessage}</div>
            </Form.Item>
            <Form.Item label="Confirm New Password">
              <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="updatePasswordButton">
              Update Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
