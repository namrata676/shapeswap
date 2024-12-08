import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to={{ pathname: "mailto:smartfinanceexchange@gmail.com" }} >Contact</Link>
        </li>
        <li>
          <Link to={{ pathname: "https://docs.smartfinance.exchange/" }}>About us</Link>
        </li>
        <li>
          <Link to={{ pathname: "https://docs.smartfinance.exchange/" }} target="_blank">FAQs</Link>
        </li>        
      </ul>
    </nav>
  );
}

export default FooterNav;