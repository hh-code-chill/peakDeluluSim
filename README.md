# peakDeluluSim

Sử dụng HTML CSS JS giả lập game tài sửu không thể win

🎲 Peak Delulu Sim
"Chỉ người không chơi mới là người thắng."

📌 Giới thiệu dự án
Peak Delulu Sim là một trình giả lập trò chơi cá cược (Tài Xỉu/Sic Bo) được tạo ra không phải để giải trí, mà để vạch trần bộ mặt thật của các trang web cá cược lậu. Dự án sử dụng toán học và các thuật toán "can thiệp" để chứng minh rằng: Dù bạn có chiến thuật gì, nhà cái luôn là người thắng cuối cùng.

Cảnh báo: Game mang tính chất giáo dục cao, có khả năng gây "cay cú" cực độ cho bạn bè của bạn.

🛠 Công nghệ sử dụng
Dự án được xây dựng thuần túy với bộ ba "huyền thoại" của Web Beginner, không sử dụng Framework để tối ưu việc học tập:

HTML5: Cấu trúc giao diện bảng cược.

CSS3: Thiết kế hiệu ứng giao diện (Animation xúc sắc, Dark mode, Neon themes).

JavaScript (Vanilla): Xử lý logic xác suất, quản lý trạng thái trò chơi và can thiệp kết quả.

📜 Quy tắc chơi (The Sic Bo Logic)
Game sử dụng 3 viên xúc sắc (mỗi viên 6 mặt). Kết quả dựa trên tổng điểm:

Xỉu (Small): Tổng điểm từ 4 đến 10.

Tài (Big): Tổng điểm từ 11 đến 17.

Cược Tổng (Specific Total): Cược một con số cụ thể từ 4 đến 17 (tỉ lệ ăn cao hơn nhưng cực khó trúng).

Luật Nhà Cái (The Trap): Nếu 3 viên xúc sắc ra cùng một số (ví dụ: 1-1-1, 2-2-2...), tất cả các cửa Tài và Xỉu đều THUA. Tiền về túi nhà cái.

🚀 Tính năng nổi bật

1. Hệ thống Game Mode (GM) độc bản
   GM1 - Bạn chắc chứ? (Default): Thuật toán tự động soi cửa bạn đặt và ép kết quả ra ngược lại. Tỉ lệ thắng của bạn xấp xỉ 0%.

GM2 - Thường thôi.: Chế độ dành cho những người tin vào vận may (sử dụng Math.random() thuần túy).

GM3 - Tôi quá gà!: Chế độ buff tỉ lệ thắng lên cực cao để trải nghiệm cảm giác "vua trò chơi" trước khi bị GM1 vùi dập.

2. Tùy chỉnh giao diện linh hoạt
   Addictive Mode: Giao diện Đỏ - Vàng rực rỡ, kích thích lòng tham giống hệt các web lậu.

Boring/Modern Mode: Giao diện tối giản, nhàm chán để bạn nhận ra bản chất của cờ bạc chỉ là những con số vô hồn.

3. Thông điệp "sát thương" cao
   Thua: "Bạn đã tan cửa nát nhà vì cờ bạc", "Lêu lêu đồ thua cuộc".

Thắng: "Đến đây thôi, quay đầu là bờ", "Không có gì vui cả, rồi bạn sẽ mất lại thôi".

4. Bảo mật & Dữ liệu
   Local Storage Only: Toàn bộ điểm số, lịch sử chỉ lưu tại trình duyệt của bạn. Không ai theo dõi, không có server.

Panic Button: Nút "Xóa toàn bộ dữ liệu" để khôi phục nhân phẩm về số điểm 0 tròn trĩnh ban đầu.

📂 Cấu trúc thư mục tham khảo
Plaintext
peak-delulu-sim/
├── index.html # Giao diện chính
├── style.css # Định dạng & Theme
├── script.js # Logic "gian lận" & Xử lý game
└── README.md # Tài liệu hướng dẫn
💡 Thông điệp từ tác giả
Dự án này được thực hiện bởi Đặng Đình Hoàng - sinh viên CNTT với mục tiêu chống trì hoãn và rèn luyện kỹ năng lập trình thực tế. Thông qua Peak Delulu Sim, tôi muốn gửi gắm châm ngôn: "Tự kỷ luật sẽ đem đến tự do". Đừng để những con số ảo trên màn hình điều khiển cuộc đời bạn.
