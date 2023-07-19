import { useRef, FC } from 'react';

interface AppLinkProps {
  link: string;
  type?: string;
  label: string;
}

const AppLink: FC<AppLinkProps> = ({ link, type, label }) => {
  const ref = useRef(null);

  return (
    <a ref={ref} href={link}>
      {label}
    </a>
  );
};

export default AppLink;
