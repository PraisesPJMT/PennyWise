import AppLink from '../../components/app-link/AppLink';
import './Splash.scss';

const Splash: React.FC<{}> = () => {
  return (
    <div id="splash">
      <div className="screen">
        <h2>Your financial journey starts here.</h2>
        <h1>
          Budget Better
          <br />
          Live Better
        </h1>
        <p>
          Streamline your budgeting journey and secure your savings with our
          user-friendly financial planning tools and expert guidance.
        </p>
        <div>
          <AppLink link="/" label="Sign in" type="shell" />
          <AppLink link="/" label="Create Account" type="shell" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
