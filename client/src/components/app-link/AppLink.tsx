import { useRef, FC } from 'react';
import { Link } from 'react-router-dom';

import './AppLink.scss';

interface AppLinkProps {
  link: string;
  varient?: 'shell' | 'fill';
  label: string;
}

const AppLink: FC<AppLinkProps> = ({ link, varient, label }) => {
  const ref = useRef(null);

  return (
    <Link className={`link ${varient ? varient : ''}`} ref={ref} to={link}>
      {label}
    </Link>
  );
};

export default AppLink;
