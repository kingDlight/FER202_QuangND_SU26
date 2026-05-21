//Tạo funncion cho component MyPizza.jsx
//hIỂN THỊ , ID, NAME, TÊN LOẠI PIZZA,DECRIPTIONN, GIÁ, HÌNH ẢNH CỦA PIZZA, GIÁ CŨ, GIÁ GIẢM, TAG TRONGCHUAWS TRONG CONTAINER, ROW, COL CỦA REACT-BOOTSTRAP, CHO VÀO GIỮA TRANG
import React from 'react';
import { Card } from 'react-bootstrap';
function MyPizza({pizza}) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={pizza.imageSrc} />
            <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <p><strong>ID:</strong> {pizza.id}</p>
                <p><strong>Description:</strong> {pizza.description}</p>
                <p><strong>Price:</strong> {pizza.newPrice}</p>
                <p><strong>Old Price:</strong> {pizza.oldPrice}</p>
                <p><strong>Tag:</strong> {pizza.tag}</p>
            </Card.Body>
        </Card>
    );
}
export default MyPizza;