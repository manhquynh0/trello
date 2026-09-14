# Trello Clone Project

## Giới thiệu
Dự án này là một bản sao lưu (clone) của ứng dụng quản lý dự án Trello, được xây dựng với mục đích học tập và phát triển kỹ năng lập trình Fullstack. Ứng dụng cung cấp các tính năng cốt lõi của Trello như tạo bảng (board), danh sách (list), thẻ (card), kéo thả linh hoạt và quản lý người dùng.

## Kiến trúc Hệ thống
Dự án sử dụng **MERN Stack**:
- **Front-end:** React.js, Vite, Material-UI (MUI), Redux Toolkit, React Router DOM.
- **Back-end:** Node.js, Express.js, MongoDB (Mongoose), JWT, Brevo (Gửi email).

## Tính năng nổi bật
- **Quản lý Bảng (Board):** Tạo, xem, cập nhật và xóa bảng.
- **Quản lý Danh sách và Thẻ (List & Card):** Kéo thả (Drag & Drop) mượt mà các danh sách và thẻ giữa các cột.
- **Xác thực và Phân quyền:** Đăng ký, đăng nhập, quên mật khẩu (gửi email xác nhận).
- **Giao diện đáp ứng (Responsive):** Thiết kế tối ưu cho nhiều kích thước màn hình.
- **Theme:** Hỗ trợ chế độ Sáng (Light) và Tối (Dark).

## Cấu trúc thư mục

Dự án được chia thành hai phần chính:

### 1. Front-End (`/Front-End`)
Giao diện người dùng được xây dựng bằng React và Vite.
- `src/apis`: Các hàm gọi API tới Back-end.
- `src/components`: Các component tái sử dụng (AppBar, BoardTab, Modal...).
- `src/pages`: Các trang chính của ứng dụng (Auth, Boards...).
- `src/redux`: Quản lý state với Redux Toolkit.
- `src/utils`: Các hàm tiện ích, validator và định dạng dữ liệu.

### 2. Back-End (`/backend-trello/trello-api`)
API Server được xây dựng bằng Node.js và Express.
- `src/controllers`: Xử lý logic request từ client.
- `src/models`: Định nghĩa các schema MongoDB (User, Board, Column, Card...).
- `src/routes`: Định tuyến các API endpoints.
- `src/services`: Chứa logic nghiệp vụ lõi (Business Logic).
- `src/validations`: Kiểm tra tính hợp lệ của dữ liệu đầu vào.

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản >= 16)
- Yarn hoặc npm
- MongoDB URI

### Cài đặt Back-end
1. Di chuyển vào thư mục backend:
   ```bash
   cd d:\backend-trello\trello-api
   ```
2. Cài đặt các thư viện:
   ```bash
   yarn install
   ```
3. Thiết lập biến môi trường:
   Tạo file `.env` và thêm các thông tin sau:
   ```env
   PORT=8017
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   BREVO_API_KEY=your_brevo_api_key
   ```
4. Khởi chạy server:
   ```bash
   yarn dev
   ```

### Cài đặt Front-end
1. Di chuyển vào thư mục frontend:
   ```bash
   cd d:\trello\Front-End
   ```
2. Cài đặt các thư viện:
   ```bash
   yarn install
   ```
3. Thiết lập biến môi trường:
   Tạo file `.env` và cấu hình URL của API:
   ```env
   VITE_API_ROOT=http://localhost:8017
   ```
4. Khởi chạy ứng dụng:
   ```bash
   yarn dev
   ```

## Người đóng góp
- **ManhQuynhDev** 

## Giấy phép (License)
Dự án được phân phối dưới giấy phép MIT.
