import { FC, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu, BiX, BiChevronDown, BiSolidUserDetail } from 'react-icons/bi';

import Logo from '../../assets/pennywize.png';

import './Header.scss';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const navs = [
    { name: 'Overview', link: '/' },
    { name: 'Groups', link: '/Groups' },
    { name: 'Create Group', link: '/groups/new' },
    { name: 'Settings', link: '/settings' },
    { name: 'Profile', link: '/profile' },
  ];

  const closeMenu = () => setOpen(false);
  const closeNav = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    closeNav();
  };

  const navLinkAction = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <header>
      <Link to="/" className="hd-logo">
        <img src={Logo} alt="app-logo" />
        <span className="logo">
          Penny<span className="orange">Wize</span>
        </span>
      </Link>

      <nav className={isOpen ? 'opened' : ''}>
        {navs.map((nav) => (
          <NavLink
            key={nav.name}
            to={nav.link}
            className={`${nav.name.toLowerCase().replace(' ', '-')}`}
            onClick={navLinkAction}
            end
          >
            {nav.name}
          </NavLink>
        ))}

        <button type="button" className="logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <button
        type="button"
        className="menu"
        onClick={() => setIsOpen((prev) => (prev ? false : true))}
      >
        {isOpen ? <BiX /> : <BiMenu />}
      </button>

      <div
        className="profile-block"
        ref={menuRef}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <div className="prof">
          <Link to="/profile">
            <BiSolidUserDetail />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={open ? 'open' : ''}
          >
            <BiChevronDown />
          </button>
        </div>

        <div className={`options ${open ? 'open' : ''}`}>
          <Link to="/profile" onClick={closeMenu}>
            Profile
          </Link>
          <Link to="/settings" onClick={closeMenu}>
            Settings
          </Link>
          <button type="button" className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
