import Carousel from '../../components/carousel/Carousel';
import RegistrationForm from '../../components/registration-form/RegistrationForm';

import './Register.scss';

const Register: React.FC<{}> = () => {
  return (
    <div id="register">
      <div className="carousel">
        <Carousel />
      </div>
      <div className="form">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
