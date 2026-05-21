//Tạo footer componet chứa MyProfile.jsx componnent gọi footer
import React from 'react';
import MyProfile from './MyProfile';
const profile = {
    ID: "DE190049",
    name: "Nguyễn Duy Quang",
    email: "kingdn522005@gmail.com",
    github: "https://github.com/kingDlight",
    avatar: "/images/avatars/av1.jpg"
  };
function Footer({ profile }) {
  // Viết code CSS cho footer cạnh cuối trangg, nội dung đặt giữa trang
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1', marginTop: '20px' }}>
      <MyProfile profile={profile} />
    </footer>
  );
}

export default Footer;