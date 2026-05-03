# ChatbotAI360 - Kế Hoạch Sửa Lỗi và Cấu Hình

## Context (Bối Cảnh)

Dự án ChatbotAI360 là một ứng dụng chatbot tiếng Việt cho lĩnh vực nội thất, bao gồm backend Rasa và frontend PHP. Dự án được lấy từ kho lưu trữ có sẵn nhưng sử dụng các module Rasa lỗi thời và có nhiều cấu hình không phù hợp cho thiết bị Windows hiện tại. Cần sửa các lỗi này để ứng dụng có thể chạy được trên web và kết nối với API chatbot.

## Các Lỗi Chính Được Xác Định

### **LỖI 1: Module Rasa Lỗi Thời (CRITICAL)**

- **Vị trí:** `Chatbot AI/AI_chatbotbot/startsvr.sh` (dòng 2-3)
- **Vấn đề:** Script sử dụng `rasa_core.run` nhưng dự án cài Rasa 3.6.15 không có module này
- **Cách sửa:** Thay thế bằng lệnh `rasa run` và `rasa run actions`

### **LỖI 2: Xung Đột Cổng (Port Conflict)**

- **Vị trí:** `startsvr.sh` và `noithat360/includes/footer.php`
- **Vấn đề:** Script chạy Rasa trên port 80, nhưng frontend chờ port 5005
- **Cách sửa:** Sửa script để chạy trên port 5005 hoặc cập nhật frontend

### **LỖI 3: Shell Script Không Tương Thích Windows**

- **Vị trí:** Tất cả file `.sh` (startsvr.sh, stop.sh)
- **Vấn đề:** File bash shell không chạy trên Windows
- **Cách sửa:** Tạo file `start.bat` và `stop.bat` cho Windows

### **LỖI 4: Cấu Hình Cứng (Hardcoded URLs)**

- **Vị trí:** `endpoints.yml`, `footer.php`, `db.php`
- **Vấn đề:** URLs, ports, DB credentials cứng, không linh hoạt
- **Cách sửa:** Tạo file `.env` để quản lý cấu hình

### **LỖI 5: Thiếu Cơ Sở Dữ Liệu MySQL**

- **Vị trí:** `noithat360/config/db.php`
- **Vấn đề:** Cơ sở dữ liệu `noithat` chưa được tạo
- **Cách sửa:** Cung cấp hướng dẫn tạo database

### **LỖI 6: Port 80 Yêu Cầu Quyền Admin**

- **Vị trí:** `startsvr.sh`
- **Vấn đề:** Port 80 trên Windows/Linux cần quyền admin
- **Cách sửa:** Sử dụng port 5005 hoặc port cao hơn 1024

### **LỖI 7: CORS Bảo Mật (Open to All)**

- **Vị trí:** `startsvr.sh` với `--cors '*'`
- **Vấn đề:** Cho phép tất cả origin truy cập, bất an toàn cho production
- **Cách sửa:** Cấu hình CORS chỉ cho phép origin cụ thể

### **LỖI 8: Trang Admin Trống (Incomplete)**

- **Vị trí:** `noithat360/admin/dashboard.php`, `products.php`
- **Vấn đề:** File trống, không thực hiện tính năng nào
- **Cách sửa:** Tạo file cấu hình để tắt admin hoặc hoàn thành chức năng

## Kế Hoạch Sửa Chi Tiết

### **Bước 1: Tạo File Cấu Hình .env**

- Tạo `Chatbot AI/AI_chatbotbot/.env`
- Định nghĩa: `RASA_PORT=5005`, `ACTION_PORT=5055`, `ACTION_URL=http://localhost:5055`
- Cấu hình PHP: `DB_HOST=localhost`, `DB_USER=root`, `DB_PASS=`, `DB_NAME=noithat`

### **Bước 2: Cập Nhật `endpoints.yml`**

- Sửa URL action endpoint để sử dụng biến môi trường
- File: `Chatbot AI/AI_chatbotbot/endpoints.yml`

### **Bước 3: Sửa `startsvr.sh` (Dành cho Linux/Mac)**

- Thay `rasa_core_sdk.endpoint` → `rasa run actions`
- Thay `rasa_core.run` → `rasa run`
- Đổi port từ 80 → 5005
- Cấu hình CORS với giới hạn

### **Bước 4: Tạo File Batch cho Windows**

- Tạo `start.bat` cho khởi động trên Windows
- Tạo `stop.bat` để dừng dịch vụ
- Cấu hình tương tự file shell

### **Bước 5: Cập Nhật Frontend**

- Sửa `noithat360/includes/footer.php`
- Đọc port từ `.env` thay vì hardcode
- Thêm error handling khi kết nối chatbot

### **Bước 6: Tạo Script Tạo Database**

- Tạo `setup-db.sql`
- Định nghĩa cấu trúc bảng cho `noithat` database
- Cung cấp hướng dẫn import

### **Bước 7: Tạo Documentation**

- Tạo `SETUP.md` hướng dẫn:
  - Cài Python 3.10+
  - Cài MySQL
  - Khởi chạy ứng dụng
  - Cấu hình cơ sở dữ liệu
  - Truy cập ứng dụng

### **Bước 8: Tạo requirements.txt**

- Đảm bảo `rasa==3.6.15` được cài chính xác
- Xuất danh sách tất cả dependencies

## File Sẽ Được Sửa/Tạo

| File                             | Hành Động | Lý Do                        |
| -------------------------------- | --------- | ---------------------------- |
| `.env` (mới)                     | Tạo       | Quản lý cấu hình             |
| `.env.example` (mới)             | Tạo       | Template cho người khác      |
| `startsvr.sh`                    | Sửa       | Cập nhật Rasa command + port |
| `stop.sh`                        | Sửa       | Cập nhật stop process        |
| `start.bat` (mới)                | Tạo       | Support Windows              |
| `stop.bat` (mới)                 | Tạo       | Support Windows              |
| `endpoints.yml`                  | Sửa       | Dùng biến môi trường         |
| `noithat360/includes/footer.php` | Sửa       | Đọc port từ .env             |
| `noithat360/config/db.php`       | Sửa       | Đọc DB config từ .env        |
| `setup-db.sql` (mới)             | Tạo       | Tạo database                 |
| `requirements.txt` (mới)         | Tạo       | Dependencies                 |
| `SETUP.md` (mới)                 | Tạo       | Hướng dẫn setup              |
| `noithat360/admin/dashboard.php` | Sửa       | Thêm thông báo hoặc tắt      |

## Xác Minh & Test

1. **Kiểm tra Python Environment:** Python 3.10+ cài sẵn
2. **Cài Dependencies:** Chạy `pip install -r requirements.txt`
3. **Khởi động Backend:** Chạy `start.bat` (Windows) hoặc `bash startsvr.sh` (Linux)
4. **Kiểm tra Port:** Xác nhận Rasa chạy trên port 5005
5. **Test Frontend:** Truy cập `http://localhost:8000/noithat360/index.php`
6. **Test Chatbot Widget:** Kiểm tra widget chat có hiển thị và kết nối
7. **Test Database:** Kiểm tra PHP có kết nối MySQL thành công
8. **Test Message:** Gửi tin nhắn qua chatbot widget

## Ghi Chú Bổ Sung

- **Yêu cầu:** MySQL Server chạy trên localhost:3306
- **Yêu cầu:** Python 3.10+ với pip
- **Port Mặc Định:** 5005 (Rasa), 5055 (Actions), 8000 (PHP dev server tùy chọn)
- **CORS Sản Xuất:** Nên cấu hình cụ thể domain thay vì `*`
