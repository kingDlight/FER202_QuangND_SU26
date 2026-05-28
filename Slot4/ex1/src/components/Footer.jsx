//Tạo footer componet chứa MyProfile.jsx componnent gọi footer
import React from 'react';
import MyProfile from './MyProfile';

function Footer({ profile }) {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <MyProfile profile={profile} />
      </div>
    </footer>
  );
}

export default Footer;