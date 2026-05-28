
import { useState } from 'react';
import {
    useNavigate,
    useSearchParams,
} from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Form,
    InputGroup,
    Button,
    Pagination,
} from 'react-bootstrap';

import { posts } from '../data/posts';

function PostList() {
    const navigate = useNavigate();

    // URL search params
    const [searchParams, setSearchParams] = useSearchParams();

    // Search từ URL
    const search = searchParams.get('q') || '';

    // Category state
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 2;

    // Categories unique
    const categories = [
        'Tất cả',
        ...new Set(posts.map((p) => p.category)),
    ];

    // Filter posts
    const filtered = posts.filter((post) => {
        const matchSearch = post.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            activeCategory === 'Tất cả' ||
            post.category === activeCategory;

        return matchSearch && matchCategory;
    });

    // Pagination logic
    const totalPages = Math.ceil(
        filtered.length / postsPerPage
    );

    const startIndex =
        (currentPage - 1) * postsPerPage;

    const currentPosts = filtered.slice(
        startIndex,
        startIndex + postsPerPage
    );

    return (
        <Container className="py-4">
            {/* Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Danh sách bài viết 📚</h2>

                <Badge bg="dark">
                    {filtered.length} bài viết
                </Badge>
            </div>

            {/* Search */}
            <InputGroup className="mb-4">
                <InputGroup.Text>🔍</InputGroup.Text>

                <Form.Control
                    placeholder="Tìm kiếm bài viết..."
                    value={search}
                    onChange={(e) => {
                        setSearchParams({
                            q: e.target.value,
                        });

                        setCurrentPage(1);
                    }}
                />

                {search && (
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            setSearchParams({});
                        }}
                    >
                        Xóa
                    </Button>
                )}
            </InputGroup>

            {/* Categories */}
            <div className="mb-4 d-flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        size="sm"
                        variant={
                            activeCategory === cat
                                ? 'primary'
                                : 'outline-primary'
                        }
                        onClick={() => {
                            setActiveCategory(cat);
                            setCurrentPage(1);
                        }}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Empty */}
            {filtered.length === 0 ? (
                <div className="text-center py-5">
                    <h5 className="text-muted">
                        Không tìm thấy bài viết 😢
                    </h5>
                </div>
            ) : (
                <>
                    {/* Posts */}
                    <Row>
                        {currentPosts.map((post) => (
                            <Col
                                md={6}
                                key={post.id}
                                className="mb-4"
                            >
                                <Card
                                    className="h-100 shadow-sm border-0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        navigate(`/posts/${post.id}`)
                                    }
                                >
                                    <Card.Body>
                                        {/* Header */}
                                        <div className="d-flex justify-content-between mb-2">
                                            <Badge bg="primary">
                                                {post.category}
                                            </Badge>

                                            <small className="text-muted">
                                                {post.date}
                                            </small>
                                        </div>

                                        {/* Title */}
                                        <Card.Title>
                                            {post.title}
                                        </Card.Title>

                                        {/* Body */}
                                        <Card.Text className="text-muted">
                                            {post.body.substring(0, 90)}...
                                        </Card.Text>

                                        {/* Tags */}
                                        <div className="d-flex flex-wrap gap-1 mt-3">
                                            {post.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    bg="secondary"
                                                    className="fw-normal"
                                                >
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card.Body>

                                    {/* Footer */}
                                    <Card.Footer className="bg-white border-0 text-muted small">
                                        ✍️ {post.author}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <Pagination>
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                />

                                {[...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={
                                            currentPage === index + 1
                                        }
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Next
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                />
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default PostList;

