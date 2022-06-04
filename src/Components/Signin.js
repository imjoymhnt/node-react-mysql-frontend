import React from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, password } = values;
    const { data } = await axios.post(`${process.env.REACT_APP_API}/signin`, {
      email,
      password,
    });
    if (data.success) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ token: data.token, user: data.user })
      );
      message.success("Logged In");
      navigate("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          title="Sign-In"
          hoverable
          style={{ textAlign: "center", backgroundColor: "#badbff" }}
        >
          <Form
            style={{ textAlign: "left" }}
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
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p>
            Don't have an account? <Link to="/signup">Sign-Up</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default Signin;
