import { useRef, FC } from 'react';

import './AppLink.scss';

interface AppLinkProps {
  link: string;
  varient?: 'shell' | 'fill';
  label: string;
}

const AppLink: FC<AppLinkProps> = ({ link, varient, label }) => {
  const ref = useRef(null);

  return (
    <a className={`link ${varient}`} ref={ref} href={link}>
      {label}
    </a>
  );
};

export default AppLink;
