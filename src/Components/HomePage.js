import React, { useState } from "react";
import { Select, message, Form, Button, Card, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [plan, setPlan] = useState("");
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const obj = {
    Silver: 0,
    Gold: 1,
    Diamond: 2,
    Platinum: 3,
  };
  let isLoggedInJsonObject = {};
  try {
    isLoggedInJsonObject = JSON.parse(localStorage.getItem("userInfo"));
  } catch (e) {
    isLoggedInJsonObject = localStorage.getItem("userInfo");
  }
  const user = isLoggedInJsonObject ? isLoggedInJsonObject.user : {};
  const currentPlan = Object.keys(user).length > 0 ? user.plan : "";
  const currentPlanVal = obj[currentPlan];
  console.log(currentPlanVal);
  console.log(currentPlan);
  console.log(isLoggedInJsonObject);
  const { Option } = Select;

  const handleChange = (value) => {
    if (value !== "") {
      setPlan(value);
      setDisable(false);
    }
  };

  const onFinish = async (values) => {
    const selectedPlanVal = obj[values.plan];
    if (
      currentPlanVal > selectedPlanVal ||
      currentPlanVal + 1 !== selectedPlanVal
    ) {
      message.error("You can't downgrade or skip any plan!");
    } else {
      const { userId } = user;
      const { data } = await axios.put(`${process.env.REACT_APP_API}/update`, {
        id: userId,
        plan: values.plan,
      });

      if (data.success) {
        isLoggedInJsonObject.user.plan = values.plan;
        localStorage.setItem("userInfo", JSON.stringify(isLoggedInJsonObject));
        message.success("Plan Upgraded Successfully");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    // window.location.reload();
    navigate("/signin");
  };

  return (
    <Row>
      <Col
        className="form"
        xs={{ span: 20, offset: 2 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 12, offset: 6 }}
        xl={{ span: 12, offset: 6 }}
        xxl={{ span: 12, offset: 6 }}
      >
        <Card
          title="Dashboard"
          hoverable
          style={{ textAlign: "left", backgroundColor: "#badbff" }}
          extra={<Button onClick={handleLogout}>Logout</Button>}
        >
          <h2 style={{ textAlign: "center", marginRight: "8rem" }}>
            Hello, {user.name}
          </h2>
          <h3 style={{ textAlign: "center", marginRight: "8rem" }}>
            Upgrade Your Plan
          </h3>
          <hr />

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Plans"
              name="plan"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Select
                defaultValue={user.plan}
                style={{
                  width: 120,
                }}
                onChange={handleChange}
              >
                <Option value="Silver">Silver</Option>
                <Option value="Gold">Gold</Option>
                <Option value="Diamond">Diamond</Option>
                <Option value="Platinum">Platinum</Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={disable}>
                Upgrade Now!
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default HomePage;
