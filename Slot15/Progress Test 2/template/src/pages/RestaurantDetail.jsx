import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap'
import { fetchRestaurantById } from '../api/restaurantApi'
import { useRestaurant } from '../context/RestaurantContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRestaurant()

  // TODO-05: Khai báo state: restaurant, loading (true), error (null)
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRestaurantById(id)
      .then(setRestaurant)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!restaurant) return null

  // Tìm tên category từ context
  const categoryName =
    state.categories.find((c) => String(c.id) === String(restaurant.categoryId))?.name || 'Unknown'

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card>
        <Card.Header as="h5">{restaurant.name}</Card.Header>
        <Card.Body>
          <p><strong>Category:</strong> <Badge bg="info">{categoryName}</Badge></p>
          <p><strong>Owner:</strong> {restaurant.owner}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Price Min:</strong> {formatVND(restaurant.priceMin)}</p>
          <p><strong>Price Max:</strong> {formatVND(restaurant.priceMax)}</p>
          {restaurant.openDate && (
            <p><strong>Open Date:</strong> {formatDateDisplay(restaurant.openDate)}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
