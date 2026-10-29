# DevoraLabs — website hợp nhất & Creative Lab

**Cập nhật theo phản hồi:** thanh đầu trang hiện có hai nhóm riêng: **Web 1 — dropdown 6 kiểu cũ** và **Web 2 — dropdown 3 kiểu mới**. Không còn trộn 7 mục trong một dropdown. Motion mới nằm trong `creative-motion.js`; xem `QA-WEB12-MOTION.md` để biết kiểm tra và video bản mới.

## Mở bản xem thử

Trong thư mục này chạy `npm start`, sau đó mở http://127.0.0.1:4173/.

Dropdown Web 1 giữ 6 giao diện cũ: Bản gốc, Một nét, Chữ động, Xếp lớp, Bản vẽ, Quỹ đạo. Dropdown Web 2 có 3 chế độ: Điện ảnh, Cobalt, Collage. Các trang được giữ khi chuyển web, nên quay lại không mất dữ liệu đã thao tác. Web 2 mặc định Điện ảnh ở lần truy cập đầu tiên.

Link trực tiếp:

- `/?style=creative-lab&theme=frame-shift`
- `/?style=creative-lab&theme=cobalt-court`
- `/?style=creative-lab&theme=cutout-dept`

Website mới dùng tiếng Việt. Chọn VI/EN vẫn hoạt động trong 6 phiên bản cũ.

## Chỉnh nội dung

- `content.js`: tên, thương hiệu, giới thiệu đã xác thực, email, Zalo; nội dung và ảnh dự án; dịch vụ.
- `creative.html`: thông điệp hero, cách làm việc, nội dung form.
- `creative.js`: logic chung cho ba demo, hồ sơ dự án, lựa chọn giao diện và brief.
- `creative.css`: ba composition riêng, responsive và choreography.
- `assets/creative-tokens.css`: bản token chuẩn từ repo theme. CSS mới dùng biến semantic, không sao chép layout catalog.

Nguồn: https://github.com/devoralabsapp/creative-theme-system-skill, commit `57f1273dee11dc27197fac09cc3933478fde0b1a` (đã fetch và xác nhận source local khớp origin/main). Đã đọc SKILL.md, integration.md, theme-recipes.md, volume-five.md và nguồn palette chuẩn. Tham khảo kỹ thuật motion từ bài SVGator được chỉ định trong master plan.

## Phạm vi dữ liệu & liên hệ

Ba dự án là minh họa, không phải công bố khách hàng hay sản phẩm đã bàn giao. Ảnh là screenshot các demo đã có trong project. Thông tin cá nhân chưa được cung cấp vẫn để trống. Không thêm thành tích, số liệu hiệu quả hay lời chứng thực.

Đơn hàng, bộ lọc, giỏ hàng, yêu cầu đã duyệt, tab demo, dự án đang xem và form được giữ nguyên khi đổi ba theme. Lựa chọn theme lưu trong localStorage; dữ liệu demo và form chỉ nằm trong bộ nhớ trang, sẽ đặt lại khi tải lại. Không gửi dữ liệu ra ngoài. Nút tạo brief tạo văn bản tại trình duyệt; nút sao chép dùng clipboard, có hướng dẫn sao chép thủ công nếu trình duyệt từ chối.

Khi bổ sung backend nhận liên hệ, chỉ thay trạng thái thành công sau khi server xác nhận. Đổi dữ liệu profile không tự biến form thành chức năng gửi.

## Kiểm tra & đóng gói

`npm run build` chạy kiểm tra cú pháp, 11 unit tests hiện có và xuất bản static vào `dist/`. Có thể phục vụ `dist/` bằng bất kỳ static server nào. Không cần cài dependency để chạy website.

`tests/browser-creative.mjs` kiểm tra ba theme ở 320, 390, 768, 1024, 1440px: tràn ngang từng section, demo, đồng bộ dữ liệu, hồ sơ, Escape, bàn phím, reduced motion và quay lại từ phiên bản cũ. Script cần Playwright và Chrome; đường dẫn runtime hiện tại được cấu hình cho máy này.

Ảnh desktop/mobile, kết quả JSON và video motion ở thư mục bàn giao `redline-delivery/creative-lab/`. Báo cáo chi tiết ở `QA-CREATIVE.md`.

Chưa đăng ký Site, deploy hay công bố website. Mã nguồn được push lên nhánh riêng khi có yêu cầu. Website hiện là bản xem thử cục bộ theo yêu cầu trong master plan.
