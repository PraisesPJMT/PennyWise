import { FC } from 'react';
import {
  BiScatterChart,
  BiCategory,
  BiCog,
  BiSolidUserDetail,
} from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../../assets/pennywize.png';

import './Footer.scss';

const Footer: FC<{}> = () => {
  const footerMenu = [
    { name: 'Overview', icon: BiScatterChart, link: '/' },
    { name: 'Groups', icon: BiCategory, link: '/groups' },
    { name: 'Settings', icon: BiCog, link: '/settings' },
    { name: 'Profile', icon: BiSolidUserDetail, link: '/profile' },
  ];

  return (
    <footer>
      <div className="desktop">
        <div className="ft-logo">
          <img src={Logo} alt="app-logo" />
          <span className="logo">
            Penny<span className="orange">Wize</span>
          </span>
        </div>

        <p className="copy-write">© 2023 Praises Tula</p>
      </div>
      <div className="mobile">
        {footerMenu.map((menu) => (
          <Link key={menu.name} to={menu.link}>
            <menu.icon />
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
