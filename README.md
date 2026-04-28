# TiemTra - Frontend (tiemtra-client)

Frontend của ứng dụng TiemTra — một SPA React (TypeScript) cho cả cửa hàng (store) và dashboard quản trị (admin).

## Tổng quan
- Framework: React 18 (Create React App, TypeScript)
- State / Data:
  - Redux (một phần cho auth)
  - @tanstack/react-query cho fetch/caching
- UI: MUI (Material UI), @mantine, CKEditor
- HTTP client: axios (custom instance)
- Các tính năng chính: danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng, checkout, auth (OTP), dashboard admin (CRUD sản phẩm/danh mục/thuộc tính/đơn hàng/voucher), upload ảnh.

---

## Mục lục
1. Yêu cầu
2. Biến môi trường (REACT_APP_API_URL)
3. Cài đặt & chạy (dev)
4. Build production
5. Triển khai (hosting/static)
6. Lint / test / scripts
7. Cấu trúc thư mục (tóm tắt)
8. Lưu ý vận hành & gợi ý cải thiện
9. Troubleshooting nhanh

---

## 1. Yêu cầu
- Node.js LTS (16/18/20) — tương thích với Create React App
- Yarn (khuyến khích) hoặc npm
- Backend API sẵn sàng (hoặc mock)

---

## 2. Biến môi trường
Frontend sử dụng biến môi trường để biết URL backend API. Đặt biến trong file `.env` ở root dự án hoặc trên môi trường CI/CD.

Bắt buộc:
- REACT_APP_API_URL — URL base của backend API (ví dụ `https://api.tiemtra.example/api` hoặc `https://localhost:7021/api`)

Ví dụ `.env`:
REACT_APP_API_URL="https://localhost:7021/api"

Ghi chú:
- Create React App chỉ nạp biến bắt đầu bằng `REACT_APP_`.
- Sau khi thay đổi `.env`, bạn cần restart dev server.

---

## 3. Cài đặt & chạy phát triển (dev)

1. Clone repo và chuyển vào thư mục:
   - git clone <repo-url>
   - cd tiemtra-client

2. Cài dependencies:
   - Yarn:
     - yarn install
   - Hoặc npm:
     - npm install

3. Tạo file `.env` (hoặc dùng biến môi trường) với REACT_APP_API_URL:
   - REACT_APP_API_URL="https://localhost:7021/api"

4. Chạy dev server:
   - yarn start
   - hoặc npm start

5. Mở trình duyệt:
   - http://localhost:3000

---

## 4. Build production

1. Xây dựng bundle:
   - yarn build
   - hoặc npm run build

2. Thư mục đầu ra: `build/` — chứa file static sẵn để deploy.

---

## 5. Triển khai (hosting / static)

Một vài lựa chọn phổ biến:

- Netlify / Vercel:
  - Kéo từ repo, set biến môi trường `REACT_APP_API_URL`.
  - Netlify/Vercel sẽ tự động build (chỉ cần cấu hình build command `yarn build` và publish `build`).

- GitHub Pages:
  - Cần cấu hình thêm (không phải lựa chọn tối ưu cho SPA có nhiều route).

- Máy chủ tĩnh (nginx):
  - Copy nội dung `build/` lên server.
  - Nginx cấu hình phục vụ static và chuyển về `index.html` cho SPA (fallback) — cần cấu hình `try_files $uri /index.html;`.

- Serve (cho test nhanh trên server):
  - npm i -g serve
  - serve -s build -l 3000

Lưu ý CORS:
- Backend phải cho phép origin của frontend (hoặc sử dụng proxy) để gọi API.

---

## 6. Scripts hữu dụng

- yarn start — chạy dev server
- yarn build — build production
- yarn test — chạy test (CRA)
- yarn eject — (một chiều; dùng cẩn thận)

Bạn cũng có thể thêm script để chạy lint hoặc format nếu cần.

---

## 7. Cấu trúc thư mục (tóm tắt)
- src/
  - assets/ — style, theme, hình ảnh
  - components/ — các component dùng chung (Toast, ProtectedRoute, DataTable, ...)
  - views/
    - Store/ — pages cửa hàng (Home, ProductList, ProductDetail, Cart, Checkout, Account)
    - Admin/ — pages dashboard (Product, Category, Order, Customer, Voucher, Dashboard)
    - Auth/ — Login/Register/OTP
  - routes/ — AppRoutes.tsx (định nghĩa routes store và `/admin`)
  - services/
    - api/ — wrappers gọi API (productApi, categoryApi, authApi, ...)
    - extended/axiosInstance.ts — cấu hình axios (baseURL, interceptors, refresh token)
  - hooks/ — custom hooks (ví dụ useCartLocalInit)
  - Interfaces/ — kiểu TypeScript (IProduct, DTOs...)
  - layouts/ — StoreLayout, DashboardLayout
  - utils/ — helper functions

---

## 8. Lưu ý vận hành & gợi ý cải thiện

1. REACT_APP_API_URL
   - Hiện tại axiosInstance có `const API_URL = "https://localhost:7021/api"` (hard-coded).
   - Nên thay bằng:
     - const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7021/api";

2. Token & bảo mật
   - Token hiện lưu trong localStorage (`access_token`, `refresh_token`) — dễ implement nhưng có rủi ro XSS.
   - Xem xét lưu refresh token httpOnly cookie để an toàn hơn.

3. Handling 401 / refresh
   - Interceptor hiện xử lý refresh token; đảm bảo backend trả chuẩn response (refresh endpoint).

4. Thêm file `env.sample`
   - Liệt kê biến môi trường cần thiết (REACT_APP_API_URL).

5. Tài liệu hóa API
   - Tạo Postman collection hoặc OpenAPI reference để phối hợp với backend.

6. Cấu hình CI/CD
   - Thiết lập pipeline build trên GitHub Actions / Netlify / Vercel.

---

## 9. Troubleshooting nhanh

- Trang trắng / 404 khi refresh route trên production:
  - Đảm bảo server static (nginx) chuyển tất cả request về `index.html` (SPA fallback).

- Lỗi CORS khi gọi API:
  - Kiểm tra backend đã cấu hình CORS cho origin frontend chưa.

- Token không được gửi:
  - Kiểm tra `REACT_APP_API_URL` đúng không; kiểm tra axiosInstance interceptors (xem nếu path excluded).

- Refresh token không thành công:
  - Kiểm tra endpoint refresh token backend, format response, và localStorage keys.

---

## 10. Thực thi thay đổi mẫu cho mã hiện tại (gợi ý nhanh)
- Sửa baseURL trong `src/services/extended/axiosInstance.ts`:
```ts
const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7021/api";
