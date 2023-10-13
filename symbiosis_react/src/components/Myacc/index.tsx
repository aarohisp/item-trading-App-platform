import React, { useState, useEffect } from "react";
import { Card, List, Avatar } from "antd";
import "./Myacc.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";

const MyAccount: React.FC = () => {
  // Mock data
  const [details, setDetails] = useState({
    name: "John Doe",
    email: "john@example.com",
    age: 28,
    location: "New York, NY" // Add the location field here
  });

  const [donations, setDonations] = useState<string[]>(["Donation 1", "Donation 2", "Donation 3"]);
  const [requirements, setRequirements] = useState<string[]>(["Requirement 1", "Requirement 2"]);

  const [status, setStatus] = useState<Array<{ date: string; details: string }>>([
    { date: "2023-10-01", details: "Status Update 1" },
    { date: "2023-10-05", details: "Status Update 2" }
    // Add more as needed
  ]);

  const tabList = [
    {
      key: "donations",
      tab: "Past Donations"
    },
    {
      key: "requirements",
      tab: "Recent Requests"
    },
    {
      key: "status",
      tab: "Status Table"
    }
  ];
  const contentList = {
    donations: <List dataSource={donations} renderItem={(item) => <List.Item>{item}</List.Item>} />,
    requirements: <List dataSource={requirements} renderItem={(item) => <List.Item>{item}</List.Item>} />,
    status: (
      <List
        dataSource={status}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.date}</strong>: {item.details}
          </List.Item>
        )}
      />
    )
  };

  type TabKey = "donations" | "requirements"; // Added this line
  const [activeTabKey, setActiveTabKey] = useState<TabKey>("donations"); // Updated this line

  return (
    <div className="mainLayout">
      <Sidebar />
      <div className="contentContainer">
        <Topbar />
        <div className="my-account">
          <Card title="Details" className="details-card">
            <div className="avatar-container">
              <Avatar size={192} className="profile-picture" />
            </div>
            <div className="details-container">
              <p>
                <strong>Name:</strong> {details.name}
              </p>
              <p>
                <strong>Email:</strong> {details.email}
              </p>
              <p>
                <strong>Age:</strong> {details.age}
              </p>
              <p>
                <strong>Location:</strong> {details.location}
              </p>{" "}
              {/* Display the location here */}
            </div>
          </Card>
          <Card className="info-card" tabList={tabList} activeTabKey={activeTabKey} onTabChange={(key) => setActiveTabKey(key as TabKey)}>
            {contentList[activeTabKey]}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
