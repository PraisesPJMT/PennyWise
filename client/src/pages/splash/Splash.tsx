import AppLink from '../../components/app-link/AppLink';
import Carousel from '../../components/carousel/Carousel';

import './Splash.scss';

const Splash: React.FC<{}> = () => {
  return (
    <div id="splash">
      <div className="screen">
        <h1>
          Budget Better
          <br />
          Live Better
        </h1>
        <h2>Your financial journey starts here.</h2>

        <p>
          Streamline your budgeting journey and secure your savings with our
          user-friendly financial planning tools and expert guidance.
        </p>
        <div>
          <AppLink link="/login" label="Sign in" varient="fill" />
          <AppLink link="/register" label="Create Account" varient="shell" />
        </div>
      </div>

      <div className="carousel">
        <Carousel />
      </div>
    </div>
  );
};

export default Splash;
