//Tạo funncion cho component MyPizza.jsx
//hIỂN THỊ , ID, NAME, TÊN LOẠI PIZZA,DECRIPTIONN, GIÁ, HÌNH ẢNH CỦA PIZZA, GIÁ CŨ, GIÁ GIẢM, TAG TRONGCHUAWS TRONG CONTAINER, ROW, COL CỦA REACT-BOOTSTRAP, CHO VÀO GIỮA TRANG
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
function MyPizza({ pizza, onViewDetails }) {
    return (
        <Card className="h-100 shadow-sm pizza-card">
            <div className="position-relative">
                <Card.Img variant="top" src={pizza.imageSrc} className="pizza-image" />
                {/* Kiểm tra nếu có tag thì mới hiển thị Badge */}
                {pizza.tag && (
                    <Badge bg="danger" className="position-absolute top-0 end-0 m-3 text-uppercase">
                        {pizza.tag}
                    </Badge>
                )}
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}>Mã bánh: #{pizza.id}</Card.Subtitle>
                <Card.Text className="text-muted mb-3">{pizza.description}</Card.Text>
                <div className="mt-auto">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        {/* Hiển thị giá cũ (nếu có) bị gạch ngang, nằm trước giá mới */}
                        {pizza.oldPrice && <span className="price-old text-muted text-decoration-line-through mb-0">{pizza.oldPrice}</span>}
                        <span className="price-new text-danger fw-bold mb-0">Giá: {pizza.newPrice}</span>
                    </div>
                    <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" className="w-100" onClick={() => onViewDetails(pizza)}>
                            View Details
                        </Button>
                        <Button variant="danger" size="sm" className="w-100">
                            Đặt ngay
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
export default MyPizza;