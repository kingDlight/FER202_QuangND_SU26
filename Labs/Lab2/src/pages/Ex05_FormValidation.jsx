/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 * Mục tiêu: Quản lý form state phức tạp (values, errors, touched, submitted)
 *           bằng useReducer.
 *
 * Chạy test: npm test -- Ex05
 */
import { useReducer } from 'react'
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap'

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   {
//     values:    { name: '', email: '', password: '', confirm: '' },
//     errors:    {},      // { fieldName: 'thông báo lỗi' }
//     touched:   {},      // { fieldName: true/false }
//     submitted: false,
//   }
// ─────────────────────────────────────────────
const initialState = {
  values:    { name: '', email: '', password: '', confirm: '' },
  errors:    {},      
  touched:   {},      
  submitted: false,
} // TODO 1

// ─────────────────────────────────────────────
// TODO 2: Viết hàm validate(values)
//   Trả về object errors (rỗng = hợp lệ).
//   Quy tắc:
//   - name:     không được rỗng
//   - email:    phải chứa '@'
//   - password: ít nhất 6 ký tự
//   - confirm:  phải bằng values.password
// ─────────────────────────────────────────────
function validate(values) {
  const errors = {};
  
  // Kiểm tra Name
  if (!values.name) {
    errors.name = 'Tên không được để trống';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Tên phải có ít nhất 3 ký tự';
  } else if (/[0-9]/.test(values.name) || /[^a-zA-ZÀ-ỹ\s]/.test(values.name)) {
    errors.name = 'Tên không được chứa số hoặc ký tự đặc biệt';
  }

  // Kiểm tra Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = 'Email không hợp lệ';
  }

  // Kiểm tra Password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  if (!values.password || values.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  } else if (!passwordRegex.test(values.password)) {
    errors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt';
  }

  // Kiểm tra Confirm
  if (values.confirm !== values.password) {
    errors.confirm = 'Mật khẩu không khớp';
  }
  
  return errors;
}

// ─────────────────────────────────────────────
// TODO 3: Viết reducer(state, action)
//
//   Case 'SET_FIELD':
//     - action.payload = { field, value }  (field là tên trường, vd 'name')
//     - Cập nhật values[field] = value
//     - Đánh dấu touched[field] = true
//     - Tính lại errors bằng validate() với values MỚI
//     (Dùng computed property name: { ...state.values, [action.payload.field]: action.payload.value })
//
//   Case 'SUBMIT':
//     - Tính lại errors
//     - Đánh dấu tất cả touched = { name: true, email: true, password: true, confirm: true }
//     - submitted = true nếu Object.keys(errors).length === 0
//
//   Case 'RESET':
//     - Trả về initialState
// ─────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const newValues = { ...state.values, [action.payload.field]: action.payload.value };
      return {
        ...state,
        values: newValues,
        touched: { ...state.touched, [action.payload.field]: true },
        errors: validate(newValues)
      };
    }
    case 'SUBMIT': {
      const newErrors = validate(state.values);
      return {
        ...state,
        errors: newErrors,
        touched: { name: true, email: true, password: true, confirm: true },
        submitted: Object.keys(newErrors).length === 0
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function Ex05_FormValidation() {
  // TODO 4: Gọi useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialState) // TODO 4: thay dòng trên bằng useReducer

  // Helper: trả về thông báo lỗi nếu field đã được touch
  // TODO 5: Hoàn thiện hàm getError
  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  // ─────────────────────────────────────────────
  // TODO 6: Viết hàm handleChange(e)
  //   - Lấy { name, value } từ e.target
  //   - dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  // ─────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } });
  }

  // ─────────────────────────────────────────────
  // TODO 7: Viết hàm handleSubmit(e)
  //   - e.preventDefault()
  //   - dispatch({ type: 'SUBMIT' })
  // ─────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header><strong>Bài 5 – Form Validation</strong></Card.Header>
      <Card.Body>

        {/* Modal thông báo thành công */}
        <Modal show={state.submitted} onHide={() => { window.location.href = '/home'; }} centered data-testid="form-success">
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-success text-center">
            <h4 className="my-3">Login thành công!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => { window.location.href = '/home'; }}>
              Về trang chủ
            </Button>
          </Modal.Footer>
        </Modal>

        {/* TODO 8: Gắn handleSubmit vào onSubmit */}
        <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>

          {/* Trường name */}
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            {/* TODO 9: value, name="name", onChange=handleChange */}
            <Form.Control
              data-testid="input-name"
              name="name"
              placeholder="Họ và tên"
              value={state.values.name}
              onChange={handleChange}
              isInvalid={!!getError('name')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-name">
              {getError('name')}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Trường email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            {/* TODO 10: value, name="email", onChange=handleChange */}
            <Form.Control
              type="email"
              data-testid="input-email"
              name="email"
              placeholder="email@example.com"
              value={state.values.email}
              onChange={handleChange}
              isInvalid={!!getError('email')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-email">
              {getError('email')}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Trường password */}
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            {/* TODO 11: value, name="password", onChange=handleChange */}
            <Form.Control
              type="password"
              data-testid="input-password"
              name="password"
              placeholder="Tối thiểu 6 ký tự"
              value={state.values.password}
              onChange={handleChange}
              isInvalid={!!getError('password')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-password">
              {getError('password')}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Trường confirm */}
          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            {/* TODO 12: value, name="confirm", onChange=handleChange */}
            <Form.Control
              type="password"
              data-testid="input-confirm"
              name="confirm"
              placeholder="Nhập lại mật khẩu"
              value={state.values.confirm}
              onChange={handleChange}
              isInvalid={!!getError('confirm')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-confirm">
              {getError('confirm')}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            {/* TODO 13: Nút submit */}
            <Button type="submit" data-testid="btn-submit">Đăng ký</Button>
            {/* TODO 14: onClick dispatch RESET */}
            <Button type="button" variant="secondary" data-testid="btn-reset" onClick={() => dispatch({ type: 'RESET' })}>
              Reset
            </Button>
          </div>

        </Form>
      </Card.Body>
    </Card>
  )
}
