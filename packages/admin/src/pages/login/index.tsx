import { getCaptchaApi, getRoutersApi, getUserInfoApi, loginApi } from '@/api/auth';
import { setRoutes, setUserInfo } from '@/store/appSlice';
import { setAccessToken } from '@/utils/storage';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
interface LoginForm {
  username: string;
  password: string;
  code: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { routes } = useSelector((state: RootState) => state.app);
  useEffect(() => {
    if (routes.length > 0) {
      if (location.search.includes('redirect=')) {
        navigate(decodeURIComponent(location.search).split('redirect=')[1] || '/', {
          replace: true,
        });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [routes, location.search, navigate]);
  // 生成验证码
  const generateCaptcha = async () => {
    try {
      const {
        data: { url },
      } = await getCaptchaApi();
      setCaptcha(url);
    } catch (error) {
      console.error('验证码获取失败:', error);
    }
  };

  // 页面加载时生成验证码
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const onFinish = async (values: LoginForm) => {
    const loginData = {
      username: values.username,
      password: values.password,
      code: values.code,
    };
    try {
      const res = await loginApi(loginData);
      setAccessToken(res.data.token);
      const { data: userInfo } = await getUserInfoApi();
      const { data: routers } = await getRoutersApi();
      dispatch(setUserInfo(userInfo));
      dispatch(setRoutes(routers));
      message.success('登录成功！');
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <h1 className={styles.title}>RuoYi-React后台管理系统</h1>
        <Form<LoginForm>
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input
              autoComplete="username"
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              autoComplete="current-password"
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <div className={styles.captchaContainer}>
              <Input placeholder="验证码" size="large" style={{ flex: 1 }} />
              <p
                onClick={() => generateCaptcha()}
                dangerouslySetInnerHTML={{ __html: captcha }}
              ></p>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
