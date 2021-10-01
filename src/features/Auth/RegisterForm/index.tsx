import React from "react";
import { Form, Button, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { REGEX_CHECK_EMAIL } from "constants/regex";

type RegisterFormProps = {
  onFormFinish: (values: any) => void;
  onFormFinishFalse: (values: any) => void;
};

function RegisterForm({ onFormFinish, onFormFinishFalse }: RegisterFormProps) {
  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFormFinish}
      onFinishFailed={onFormFinishFalse}
    >
      <div className="form-title">
        <h3>Let's create your account!</h3>
    </div>
    <Form.Item name="role">
    
    </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: REGEX_CHECK_EMAIL,
            message: "Email Invalid",
          },
        ]}
      >
        <Input
    placeholder="Email address"
          size="large"
          autoComplete="false"
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be minimum 8 characters." },
        ]}
      >
        <Input.Password
          placeholder="Password"
          size="large"
          autoComplete="false"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="re_password"
        rules={[
          { required: true, message: "Please input your password!" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Repeat Password"
          size="large"
          autoComplete="false"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Button type="primary" size="large" htmlType="submit">
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;
