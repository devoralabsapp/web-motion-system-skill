# Từ quy trình đến sản phẩm — Redline Atelier

Website portfolio cá nhân tiếng Việt, art direction Redline Atelier. Phiên bản 1.3 gom hai kiểu vào một repo và một website, chuyển ngay bằng thanh chọn luôn hiện ở đầu trang. Chưa kết nối dịch vụ nhận brief; danh tính và dự án thật vẫn chờ bổ sung.

Bản gốc 1.1 được giữ trong `classic.html` và `classic/`, đồng thời còn snapshot tag `v1.1-current`. Bản “Một nét, thành hệ thống” ở `one-line.html`. Website chung: https://redline-personal.vercel.app. Đây là cập nhật theo yêu cầu gom và deploy chung sau khi đã bàn giao preview 1.2.

## Chuyển kiểu

`index.html`, `switcher.css`, `switcher.js` tạo thanh chọn và hai vùng xem. Mặc định lần đầu là Bản gốc. `?style=classic` và `?style=one-line` mở đúng kiểu; lựa chọn được nhớ trên thiết bị nếu localStorage khả dụng. Có thể dùng Tab, Enter, phím trái/phải, Home/End và browser Back/Forward.

Mỗi kiểu chỉ tải khi mở lần đầu, sau đó giữ nguyên trang trong phiên: vị trí cuộn, bộ lọc, dữ liệu demo, form và dialog không reset khi chuyển kiểu. Hai kiểu giữ dữ liệu độc lập để thử/so sánh; reload vẫn trả về dữ liệu demo mẫu như trước. Nội dung, dữ liệu mẫu, font, ảnh và CSS nền dùng chung. Chỉ app/motion của Bản gốc được giữ riêng để bảo toàn choreography.

## Xem website

**Cách nhanh:** mở `preview.html` bằng Chrome hoặc Edge. Giữ hai file `preview-classic.html`, `preview-one-line.html` và thư mục `assets/` bên cạnh. Các bản này gộp CSS/JavaScript để chạy trực tiếp; cũng có thể mở riêng từng preview. Sao chép có phương án chọn văn bản nếu trình duyệt hạn chế clipboard.

**Để chỉnh sửa:** tại thư mục này chạy `npm run dev`, rồi mở http://127.0.0.1:4173. Không cần cài dependency. Dùng Node.js 18 trở lên. Dừng máy chủ bằng Ctrl+C. Cổng đang dùng: 4173.

`index.html` là trang chọn; `classic.html` và `one-line.html` là hai trang portfolio. `content.js`, `demo-state.js` dùng chung. `app.js`, `effects.js`, `story.js`, `story-math.js`, `project-motion.js`, `story.css` phục vụ Một nét; `classic/app.js`, `classic/effects.js` giữ bản gốc. Sau khi sửa, chạy `npm run build` để kiểm tra cú pháp, sáu kiểm thử dữ liệu/hình học và tạo cả ba preview cùng thư mục tĩnh `dist/`.

## Chỉnh nội dung

- `content.js` → `profile`: điền `name`, `brand` (nếu có), `bio`, `email`, `zalo` (URL https://zalo.me/...), `siteUrl` (URL https đầy đủ). `null` nghĩa là chưa có thông tin. Tên tạm hiện tại là “Tên của bạn”.
- `projects`: hồ sơ minh họa có bối cảnh, vai trò ở concept, giải pháp, luồng và giới hạn. Chỉ đổi nhãn thành dự án thật khi có bằng chứng và được phép công khai. Thay ảnh bằng ảnh thật tương ứng.
- `services`: nội dung ba nhóm giải pháp và thông tin khách cần chuẩn bị.
- `index.html`: headline, mô tả, quy trình, form và nội dung trang. Sửa title/description/og:title/og:description cùng thương hiệu trước khi công bố. Khi có domain, bổ sung canonical và metadata ảnh chia sẻ tuyệt đối.
- `assets/theme-tokens.css`: selector token Redline Atelier trích nguyên từ nguồn chuẩn. `style.css` ánh xạ sang vai trò của website; `components.css` chứa các section và responsive; `motion.css` chứa phần chuyển tiếp tác vụ thành tab.

Thêm email/Zalo chỉ tạo kênh liên hệ trực tiếp. Form vẫn tạo brief cục bộ. Muốn gửi form thật cần xác định nơi nhận, triển khai endpoint, chống lạm dụng và xử lý đủ trạng thái gửi/thành công/thất bại. Không đổi dòng thông báo thành “đã gửi” nếu chưa chuyển dữ liệu.

## Chưa có và cần bổ sung

Tên cá nhân, thương hiệu, tiểu sử xác thực, email/Zalo, dự án thật được phép công khai, ảnh cá nhân (nếu muốn dùng), domain và cấu hình nhận brief. Không có số năm, khách hàng, đánh giá, giá, thời hạn hay thành tích tự tạo.

## Demo

- Đơn hàng: lọc, chuyển trạng thái, thống kê từ một nguồn dữ liệu, trạng thái rỗng.
- Bán hàng: thêm/xóa, tăng/giảm số lượng, tổng tiền theo sản phẩm, giới hạn 99 đơn vị mỗi sản phẩm.
- Nội bộ: duyệt yêu cầu, cập nhật số đang chờ/đã duyệt, trạng thái rỗng.
- Mỗi chế độ giữ state và bộ lọc riêng trong phiên đang mở; reload trả về dữ liệu mẫu. Nút đặt lại chỉ ảnh hưởng chế độ hiện tại.
- Các concept dùng ảnh chụp từ chính ứng dụng này, không dùng dashboard giả.
- Brief chỉ ở trong bộ nhớ trang và clipboard khi người xem chọn sao chép; không tự gửi dữ liệu hoặc lưu nội dung form vào storage.

## Nguồn và giấy phép

Theme: https://github.com/devoralabsapp/creative-theme-system-skill tại commit `57f1273dee11dc27197fac09cc3933478fde0b1a`. Đã đối chiếu bản cài 28 theme với repository 50 theme. Đọc `DESIGN.md` để xem lý do thiết kế và storyboard.

Font được đóng gói từ Google Fonts: Be Vietnam Pro Regular/SemiBold và IBM Plex Mono Regular. Giấy phép SIL OFL trong `assets/OFL-*.txt`. Đồ họa kiến trúc và hình sản phẩm SVG được vẽ riêng cho website; sản phẩm, giá và dữ liệu demo đều hư cấu.

Đọc `QA-SWITCHER.md` cho bản 1.3; `MOTION-ONE-LINE.md` và `QA-ONE-LINE.md` lưu bản 1.2. `QA.md`, `MOTION.md` và ảnh trong `screenshots/` lưu lịch sử bản 1.1. Video desktop/mobile bản 1.2 nằm trong thư mục bàn giao cục bộ `../redline-delivery/one-line/`.

## Vercel và mã nguồn private

`vercel.json` build bằng `npm run build`, phục vụ duy nhất `dist/`; tài liệu, kiểm thử, ảnh QA và máy chủ phát triển không được đưa vào website công khai. Git integration dùng nhánh `main`. Không cần biến môi trường hoặc token trong mã nguồn. Repo GitHub được yêu cầu để private; quyền truy cập website tuân theo cấu hình của project Vercel.

Trang hiện để `noindex, follow` vì còn thông tin danh tính chưa bổ sung. Khi hoàn thiện nội dung, bỏ meta robots này và cập nhật domain/metadata. URL triển khai được gắn ở phần About của repo GitHub sau khi xác minh; báo cáo `DEPLOYMENT.md` lưu trong bản bàn giao cục bộ.
