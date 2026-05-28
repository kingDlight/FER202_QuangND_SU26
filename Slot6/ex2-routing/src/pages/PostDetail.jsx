
import {
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Alert,
  Breadcrumb,
} from 'react-bootstrap';

import { posts } from '../data/posts';

function PostDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  // Find current post
  const post = posts.find(
    (p) => p.id === Number(id)
  );

  // Previous & next post
  const prevPost = posts.find(
    (p) => p.id === Number(id) - 1
  );

  const nextPost = posts.find(
    (p) => p.id === Number(id) + 1
  );

  // Not found
  if (!post) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          <Alert.Heading>
            Không tìm thấy bài viết!
          </Alert.Heading>

          <p>
            Bài viết với id={id} không tồn tại.
          </p>

          <Button
            variant="warning"
            onClick={() => navigate('/posts')}
          >
            ← Về danh sách
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      className="py-5"
      style={{ maxWidth: 850 }}
    >
      {/* Breadcrumb */}
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: '/' }}
        >
          🏠 Home
        </Breadcrumb.Item>

        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: '/posts' }}
        >
          📚 Posts
        </Breadcrumb.Item>

        <Breadcrumb.Item active>
          {post.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Back button */}
      <Button
        variant="outline-secondary"
        size="sm"
        className="mb-3"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </Button>

      {/* Main content */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          {/* Category + tags */}
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Badge bg="primary">
              {post.category}
            </Badge>

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

          {/* Title */}
          <h2 className="mb-3">
            {post.title}
          </h2>

          {/* Author + date */}
          <p className="text-muted small mb-4">
            ✍️ {post.author}
            &nbsp; | &nbsp;
            📅 {post.date}
          </p>

          {/* Body */}
          <p
            style={{
              lineHeight: 1.9,
              fontSize: '1.05rem',
            }}
          >
            {post.body}
          </p>
        </Card.Body>
      </Card>

      {/* Navigation */}
      <Row className="mt-4">
        <Col className="text-start">
          {prevPost && (
            <Button
              as={Link}
              to={`/posts/${prevPost.id}`}
              variant="outline-primary"
              size="sm"
            >
              ← {prevPost.title}
            </Button>
          )}
        </Col>

        <Col className="text-end">
          {nextPost && (
            <Button
              as={Link}
              to={`/posts/${nextPost.id}`}
              variant="outline-primary"
              size="sm"
            >
              {nextPost.title} →
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;

