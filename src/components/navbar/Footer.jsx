import React from "react";


const Footer = () => {
  const footerLinks =  [
    { label: "Who made this", link: "/whomadethis", type: "int" },
   
  ];
  
  // External links are rendered as <a> and internal as <Link>
  let linksMarkup = footerLinks.map((link, index) => {
    let linkMarkup =
     (
      <Link className="nav__link" to={link.link} >
      {link.label}
    </Link>
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
