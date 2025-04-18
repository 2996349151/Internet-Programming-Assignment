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
      alert('Please enter username or password');
    } else {
      const isAuthenticated = await login(username, password);
      console.log('isAuthenticated', isAuthenticated);
      if (isAuthenticated === true) {
        alert('Login successful');
        setTimeout(() => {
          navigate('/products');
        }, 1000);
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div>
      <Input placeholder="username" prefix={<UserOutlined />} onChange={handleusernameChange} />
      <br />
      <Input.Password
        placeholder="password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={handlepasswordChange}
      />
      <br />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default Login;
