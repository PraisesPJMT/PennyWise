import Carousel from '../../components/carousel/Carousel';
import LoginForm from '../../components/login-form/LoginForm';

import './Login.scss';

const Login: React.FC<{}> = () => {
  return (
    <div id="login">
      <div className="carousel">
        <Carousel />
      </div>
      <div className="form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
