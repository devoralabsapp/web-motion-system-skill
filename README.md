# Từ quy trình đến sản phẩm — Redline Atelier

Website portfolio cá nhân tiếng Việt, art direction Redline Atelier. Phiên bản 1.2 “Một nét, thành hệ thống” bổ sung chuỗi morph từ ba module HTML đến demo thao tác thật, typography qua mask và chuyển dự án từ preview. Chưa kết nối dịch vụ nhận brief; danh tính và dự án thật vẫn chờ bổ sung.

Bản 1.1 được giữ nguyên trên `main`, tag `v1.1-current` và production https://redline-personal.vercel.app. Bản 1.2 phát triển trên `motion-one-line` để xem riêng bằng Vercel preview. Không merge hoặc promote bản này khi chưa có yêu cầu thay thế.

## Xem website

**Cách nhanh:** mở `preview.html` bằng Chrome hoặc Edge. Giữ thư mục `assets/` bên cạnh. Bản này gộp CSS và JavaScript, chạy trực tiếp trên máy; sao chép có phương án chọn văn bản nếu trình duyệt hạn chế clipboard.

**Để chỉnh sửa:** tại thư mục này chạy `npm run dev`, rồi mở http://127.0.0.1:4173. Không cần cài dependency. Dùng Node.js 18 trở lên. Dừng máy chủ bằng Ctrl+C. Cổng đang dùng: 4173.

Các file nguồn gốc là `index.html`, `content.js`, `demo-state.js`, `app.js`, `effects.js`, `story.js`, `story-math.js`, `project-motion.js` và các file CSS. `story.css` chứa typography và bố cục chuyển cảnh. Sau khi sửa, chạy `node build-preview.mjs` để cập nhật `preview.html`. `npm run check` kiểm tra cú pháp và sáu kiểm thử dữ liệu/hình học. `npm run build` chạy kiểm thử rồi tạo bản xem trực tiếp và thư mục tĩnh `dist/`.

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

Đọc `MOTION-ONE-LINE.md` và `QA-ONE-LINE.md` cho bản 1.2. `QA.md`, `MOTION.md` và ảnh trong `screenshots/` lưu lịch sử kiểm tra bản 1.1. Video desktop/mobile, dữ liệu kiểm thử bản 1.2 nằm trong thư mục bàn giao cục bộ `../redline-delivery/one-line/`.

## Vercel và mã nguồn private

`vercel.json` build bằng `npm run build`, phục vụ duy nhất `dist/`; tài liệu, kiểm thử, ảnh QA và máy chủ phát triển không được đưa vào website công khai. Git integration dùng nhánh `main`. Không cần biến môi trường hoặc token trong mã nguồn. Repo GitHub được yêu cầu để private; quyền truy cập website tuân theo cấu hình của project Vercel.

Trang hiện để `noindex, follow` vì còn thông tin danh tính chưa bổ sung. Khi hoàn thiện nội dung, bỏ meta robots này và cập nhật domain/metadata. URL triển khai được gắn ở phần About của repo GitHub sau khi xác minh; báo cáo `DEPLOYMENT.md` lưu trong bản bàn giao cục bộ.
