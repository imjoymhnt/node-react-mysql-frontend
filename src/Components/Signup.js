import React from "react";
import { Form, Input, Button, Row, Col, Card, Select, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const onFinish = async (values) => {
    const { name, email, phone, password } = values;
    const { data } = await axios.post(`${process.env.REACT_APP_API}/register`, {
      name,
      email,
      phone,
      password,
    });
    if (data.success) {
      message.success("user added");
      navigate("/login");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

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
          title="Sign-Up"
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                  max: 10,
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
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
            Already have an account? <Link to="/signin">Sign-In</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
