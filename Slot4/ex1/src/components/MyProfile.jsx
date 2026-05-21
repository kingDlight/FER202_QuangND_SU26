import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function MyProfile({profile}) {
  return (
    <div>
      {/* Hiển thị thông tin ID, name,email,link git, avatar của bạn trong 1 card react-bootstrap chua trong container react-bootstrap có row, col, cho vào giữa trang*/}
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={profile.avatar} />
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <p><strong>ID:</strong> {profile.ID}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Github:</strong> <a href={profile.github} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default MyProfile;