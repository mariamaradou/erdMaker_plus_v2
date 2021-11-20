import React from "react";
//import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks =  [
    { label: "Who made this", link: "/whomadethis", type: "int" },
   
  ];
  
  // External links are rendered as <a> and internal as <Link>
  let linksMarkup = footerLinks.map((link, index) => {
    let linkMarkup =
     (
      <a className="nav__link" href={link.link} >
      {link.label}
    </a>
      );
    return <li key={index}>{linkMarkup}</li>;
  });

  return (
    <nav className="footer-nav">
      <ul className="footer-nav__list">{linksMarkup}</ul>
    </nav>
  );
};

export default Footer;
