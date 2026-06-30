import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap'
import axios from 'axios'
import { formatPriceRange } from '../utils/format'

const BASE_URL = 'http://localhost:3001'

export default function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [catsRes, restsRes] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/restaurants`),
        ])
        const found = catsRes.data.find((c) => String(c.id) === String(id))
        if (!found) {
          setError('Category not found.')
        } else {
          setCategory(found)
          setRestaurants(
            restsRes.data.filter((r) => String(r.categoryId) === String(id))
          )
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!category) return null

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/categories')}>
        &larr; Back to Categories
      </Button>

      <Card className="mb-4">
        <Card.Header as="h5">
          Category: <Badge bg="primary">{category.name}</Badge>
        </Card.Header>
        <Card.Body>
          <p className="mb-0">Total Restaurants: {restaurants.length}</p>
        </Card.Body>
      </Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No restaurants found in this category.
              </td>
            </tr>
          ) : (
            restaurants.map((r, idx) => (
              <tr key={r.id}>
                <td>{idx + 1}</td>
                <td>{r.name}</td>
                <td>{r.owner}</td>
                <td>{r.address}</td>
                <td>{formatPriceRange(r.priceMin, r.priceMax)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
