import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal({ show, onHide, title, content }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                {/* Gán thêm onClick={onHide} để nút nào cũng thực hiện chuyển hướng */}
                <Button variant="danger" onClick={onHide}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;