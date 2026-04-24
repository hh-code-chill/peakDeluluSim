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

Dưới đây là bảng tỉ lệ (Payout Ratio) chuẩn của các sòng bài/web lậu dùng để làm hệ số nhân tiền:

| Tổng Điểm          | Số Tổ Hợp Thực Tế (Đã trừ Bão) | Xác Suất Ra       | Tỉ lệ ăn đề xuất (Hệ số của Sir)     |
| :----------------- | :----------------------------- | :---------------- | :----------------------------------- |
| **4** hoặc **17**  | 3 / 216                        | $\approx 1.38\%$  | **1 ăn 50** (Vốn 1k, trúng được 50k) |
| **5** hoặc **16**  | 6 / 216                        | $\approx 2.77\%$  | **1 ăn 18**                          |
| **6** hoặc **15**  | 9 / 216                        | $\approx 4.16\%$  | **1 ăn 14**                          |
| **7** hoặc **14**  | 15 / 216                       | $\approx 6.94\%$  | **1 ăn 12**                          |
| **8** hoặc **13**  | 21 / 216                       | $\approx 9.72\%$  | **1 ăn 8**                           |
| **9** hoặc **12**  | 25 / 216                       | $\approx 11.57\%$ | **1 ăn 6**                           |
| **10** hoặc **11** | 27 / 216                       | $\approx 12.50\%$ | **1 ăn 6**                           |

**Đối với cửa Bão (Triple):**
Để dễ làm giao diện, tôi sẽ gộp thành **"Bão Bất Kỳ"** (Ra 1-1-1 hay 6-6-6 đều trúng).

- **Xác suất:** Có 6 tổ hợp Bão trên tổng 216 $\rightarrow 6/216 \approx 2.77\%$.
- **Hệ số cược (Payout):** để **1 ăn 30**. (Nhìn thì có vẻ cao, nhưng xác suất ra thực tế rất thấp, nhà cái luôn có lời).
