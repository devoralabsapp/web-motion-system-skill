# Báo cáo kiểm tra — Creative Lab / 29-10-2026

## Kết quả

- Build static thành công; 11 unit tests hiện có đều đạt. Kiểm tra cú pháp `creative.js` đạt.
- Chrome desktop thực thi 15 tổ hợp: Frame Shift, Cobalt Court, Cutout Dept. × 320, 390, 768, 1024, 1440px. Tất cả đạt.
- Không có lỗi JavaScript trong ma trận kiểm tra. Không có tràn ngang tại hero, dự án, demo, dịch vụ, quy trình, giới thiệu và liên hệ.
- Cả 6 giao diện cũ mở được qua dropdown; quay về Creative Lab giữ brief và giỏ hàng.
- Chọn dự án đổi ảnh và nội dung preview; mở chi tiết có dữ liệu đúng; Escape đóng và trả focus về điểm mở.
- Dữ liệu đơn hàng, bộ lọc, số lượng giỏ, tổng tiền, yêu cầu đã duyệt, tab demo, form và brief giữ nguyên qua 3 chế độ.
- Đặt lại giỏ đưa tổng tiền về 0; demo tabs hỗ trợ phím mũi tên. Reduced motion không còn animation chạy sau khi chọn dự án.
- Đã đo animation đang chạy và vị trí kết thúc: `framing`, `push-panel`, `paper-open` đều thực thi thật và trở về transform identity.
- Chuyển theme giữ offset section ở giữa trang; link theme đồng bộ ra URL chính và tải lại đúng theme. Ở cuối trang, vị trí có thể được trình duyệt điều chỉnh để không vượt giới hạn cuộn khi chiều cao trang thay đổi.
- Nút sao chép ghi đúng brief vào clipboard, giữ dấu tiếng Việt. Đã chuẩn hóa CRLF Windows trong so sánh tự động.
- Cuộn xuôi/ngược nhanh, thay đổi kích thước 1440 → 390 → 1024px vẫn sử dụng được.

## Bằng chứng

- `redline-delivery/creative-lab/results.json`: 15 tổ hợp responsive + 6 giao diện cũ.
- `redline-delivery/creative-lab/final-checks.json`: 9 kiểm tra motion, context, clipboard, URL, focus và resize.
- `frame-shift-1440.png`, `frame-shift-390.png`.
- `cobalt-court-1440.png`, `cobalt-court-390.png`.
- `cutout-dept-1440.png`, `cutout-dept-390.png`.
- `creative-motion.webm`: quay từ trình duyệt đang chạy, không phải mô phỏng bằng ảnh tĩnh.

Đã xem ảnh desktop/mobile và tinh chỉnh hero để preview xuất hiện sớm hơn trên desktop. Đã kiểm tra chuyển động qua animation đang chạy trong trình duyệt và video thao tác.

## Giới hạn

Đây là bản thử local, chưa public/deploy. Dữ liệu demo chỉ lưu trong bộ nhớ phiên trang. Lựa chọn theme lưu localStorage. Chưa có kênh nhận brief hoặc backend. Bản mới dùng tiếng Việt; 6 giao diện cũ giữ khả năng VI/EN. Chưa kiểm tra trên Safari, Firefox hoặc thiết bị cảm ứng vật lý; kiểm tra mobile dùng viewport Chrome và điều khiển có kích thước chạm.

Thông tin cá nhân, email và dự án khách hàng thật chưa được cung cấp; chưa thể xác nhận chúng. Không có tuyên bố hiệu quả kinh doanh hoặc thông báo gửi form thành công giả.
