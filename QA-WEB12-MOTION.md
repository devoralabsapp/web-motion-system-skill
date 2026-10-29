# Web 1 / Web 2 — dropdown và motion, 29-10-2026

## Bản sửa theo phản hồi

- Web 1 có dropdown đúng 6 kiểu: Bản gốc, Một nét, Chữ động, Xếp lớp, Bản vẽ, Quỹ đạo.
- Web 2 có dropdown đúng 3 kiểu: Điện ảnh / Frame Shift, Cobalt / Cobalt Court, Collage / Cutout Dept.
- Nhấn tên Web 1/Web 2 để chuyển về lựa chọn gần nhất trong phiên. Đổi mục trong dropdown cũng mở web tương ứng. Không trộn Creative Lab vào danh sách 6 kiểu cũ.
- Bộ chọn ba nút trong trang mới được thay bằng dropdown khi mở độc lập; khi nhúng trong trang chung, dùng dropdown Web 2 ở thanh đầu trang.

## Motion bổ sung

`creative-motion.js` phụ trách choreography riêng với Web Animations API và IntersectionObserver:

- Điện ảnh: crop và mở khung preview, hình ảnh đổi scale/vị trí theo cuộn, chương dự án mở dần trong khung.
- Cobalt: chữ chuyển qua mask theo từng dòng, preview chuyển ngang, dải dự án mở theo cùng hướng.
- Collage: artwork mở như lớp giấy, chi tiết giấy/tape đổi góc theo cuộn, hồ sơ dự án có độ nảy nhỏ.
- Tiêu đề các section, artwork dự án và các bước làm việc chạy animation khi xuất hiện. Khi đi ra khỏi viewport rồi quay lại, animation được khởi động lại.
- Intro có motion ngay lần mở đầu. Đổi kiểu chỉ chuyển cảnh ngắn, không bắt phát lại toàn bộ intro. Dữ liệu demo và form không được dựng lại khi đổi theme.
- Dừng animation khi rời Web 2; phục hồi khi quay lại. Reduced motion tắt cả animation lẫn transform theo cuộn. Các nút chọn dự án và điều khiển demo giữ vị trí ổn định.

Driver cuộn chỉ cập nhật một animation frame cho mỗi sự kiện và giới hạn thay đổi style trong artwork. Đã bỏ driver cũ cập nhật biến trên toàn trang và vòng lặp liên tục sau khi phát hiện lỗi renderer trong kiểm thử mobile.

## Bằng chứng kiểm tra

- `npm run build`: kiểm tra cú pháp và 11 unit tests đạt.
- `results.json`: 3 kiểu × 5 viewport (320, 390, 768, 1024, 1440px), cùng kiểm tra 6 kiểu cũ. Được chạy với motion bật trên Chrome cấu hình mặc định.
- `webs-motion-checks.json`: từng kiểu ở 1440px và 390px; kiểm tra số option 6/3, intro đang chạy thật, transform thay đổi khi cuộn thật và trở về khi cuộn ngược, dự án replay 3 lần, dữ liệu giữ khi đổi web, reduced motion không còn animation chạy.
- `final-checks.json`: lựa chọn mặc định, animation preview, giữ section, clipboard, URL chia sẻ/tải lại, Escape phục hồi focus và resize.
- `creative-motion-v2.webm`: video thao tác thật của bản mới.
- `redline-delivery/devoralabs/browser-regression.json`: hồi quy 6 kiểu cũ đạt, gồm cuộn thật 3 chu kỳ, animation section chạy lại, dữ liệu demo/form, chuyển ngôn ngữ, bản gốc mobile và reduced motion. Không có lỗi JavaScript.
- Ảnh desktop/mobile: `frame-shift-1440.png`, `frame-shift-390.png`, `cobalt-court-1440.png`, `cobalt-court-390.png`, `cutout-dept-1440.png`, `cutout-dept-390.png`.

Các bằng chứng nằm trong `redline-delivery/creative-lab/`. Bản kiểm tra tắt module motion chỉ được dùng để chẩn đoán lỗi; kết quả bàn giao được chạy lại với toàn bộ motion bật.

Chưa công bố website. Chưa kiểm tra trên thiết bị cảm ứng vật lý, Safari hay Firefox; mobile dùng viewport Chrome. Dữ liệu demo vẫn là hư cấu, form tạo/sao chép brief cục bộ.
