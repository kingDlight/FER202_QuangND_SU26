// hiển thị danh sách pizza tạo trong file pizzaData.js bằng cách sử dụng component MyPizza.jsx, hiển thị tất cả thông tin của pizza trong MyPizza.jsx, cho vào container, row, col của react-bootstrap, hiển thị ở giữa trang
import React from 'react';
import MyPizza from './MyPizza';
import { pizzaData } from '../data/pizzaData';
import { Container, Row, Col } from 'react-bootstrap';
// HIỂN THỊ THEO DẠNG THẺ 
function MyPizzaList() {
    return (
        <div className="mt-4">
            <Container>
                <Row className="g-4 justify-content-md-center">
                    {pizzaData.map((pizza) => (
                        <Col md={4} key={pizza.id}>
                            <MyPizza pizza={pizza} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default MyPizzaList;