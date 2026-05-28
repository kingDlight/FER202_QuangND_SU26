// hiển thị danh sách pizza tạo trong file pizzaData.js bằng cách sử dụng component MyPizza.jsx, hiển thị tất cả thông tin của pizza trong MyPizza.jsx, cho vào container, row, col của react-bootstrap, hiển thị ở giữa trang
import React, { useState } from 'react';
import MyPizza from './MyPizza';
import { pizzaData } from '../data/pizzaData';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import MyModal from './MyModal';

// HIỂN THỊ THEO DẠNG THẺ 
function MyPizzaList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedPizza, setSelectedPizza] = useState(null);

    const handleViewDetails = (pizza) => {
        setSelectedPizza(pizza);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPizza(null); // Clear dữ liệu khi đóng
    };

    return (
        <div className="mt-4">
            <Container>
                <Row className="g-4 justify-content-md-center">
                    {pizzaData.map((pizza) => (
                        <Col md={4} key={pizza.id}>
                            <MyPizza pizza={pizza} onViewDetails={handleViewDetails} />
                        </Col>
                    ))}
                </Row>

                {/* Sử dụng lại MyModal ở ngoài cùng List để tái sử dụng thay vì render trong từng item */}
                <MyModal
                    show={showModal}
                    onHide={handleCloseModal}
                    title={
                        selectedPizza ? (
                            <>{selectedPizza.name} {selectedPizza.tag && <Badge bg="danger" className="ms-2 fs-6">{selectedPizza.tag}</Badge>}</>
                        ) : "Chi tiết sản phẩm"
                    }
                    content={
                        selectedPizza ? (
                            <>
                                <img src={selectedPizza.imageSrc} alt={selectedPizza.name} className="img-fluid rounded mb-3 w-100" style={{ height: '250px', objectFit: 'cover' }} />
                                <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}><strong>Mã sản phẩm:</strong> #{selectedPizza.id}</p>
                                <p>{selectedPizza.description}</p>
                                <div className="d-flex gap-2 align-items-center mb-2">
                                    {selectedPizza.oldPrice && <span className="text-muted text-decoration-line-through">{selectedPizza.oldPrice}</span>}
                                    <span className="text-danger fw-bold fs-5">Giá: {selectedPizza.newPrice}</span>
                                </div>
                            </>
                        ) : <p>Đang tải dữ liệu...</p>
                    }
                />
            </Container>
        </div>
    );
}

export default MyPizzaList;