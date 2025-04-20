import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Input, Button, message, Space } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { login, logout, authentification } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleusernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      messageApi.open({
        type: 'error',
        content: 'Please enter username or password',
      });
    } else {
      const isAuthenticated = await login(username, password);

      if (isAuthenticated === true) {
        setTimeout(() => {
          navigate('/products');
        }, 1000);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Login failed',
        });
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <Input placeholder="username" prefix={<UserOutlined />} onChange={handleusernameChange} />
      <br />
      <br />
      <Input.Password
        placeholder="password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlepasswordChange}
      />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleLogin} type="primary">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
