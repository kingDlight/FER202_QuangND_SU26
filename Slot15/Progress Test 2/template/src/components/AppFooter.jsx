import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị footer với thông tin từ about.js:
  //   - Logo (about.logo) — thêm onError để ẩn ảnh nếu không load được
  //   - Copyright (about.copyright)
  //   - Phiên bản (about.version)
  //   - Môn học (about.course)
  // Dùng <footer> với class "border-top mt-4 py-3 text-center text-muted"
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      <div className="mb-2">
        <img src={about.logo} alt="Logo" width="40" onError={(e) => e.target.style.display = 'none'} />
      </div>
      <div>
        {about.copyright} | {about.year}
      </div>
      <div>
        {about.course} - {about.version}
      </div>
    </footer>
  )
}
