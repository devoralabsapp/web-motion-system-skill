# Từ quy trình đến sản phẩm

## Định hướng
Khách hàng: chủ cửa hàng, doanh nghiệp nhỏ và người phụ trách vận hành. Thông điệp: web app được thiết kế theo cách doanh nghiệp bạn vận hành. Một người xây sản phẩm, xưng “mình”, không giả lập công ty hoặc kinh nghiệm.

Nguồn hiện tại: https://github.com/devoralabsapp/creative-theme-system-skill — commit 57f1273dee11dc27197fac09cc3933478fde0b1a. Đã đọc SKILL.md, references/volume-five.md, theme-recipes.md và verification.md. Bản cài có 28 theme; repository có 50. Palette Redline Atelier được trích nguyên selector từ assets/starter/volume-five-tokens.css; CSS ứng dụng chỉ ánh xạ các vai trò semantic.

## Bố cục
Header → hero bất đối xứng + bản vẽ nguyên bản → tình huống vận hành → demo ba chế độ → hồ sơ concept có chi tiết → giải pháp → cách làm việc → về mình → brief.

Không dùng demo catalog làm portfolio. Hero gồm typography lớn, đồ họa trong vùng giới hạn và ghi chú bên lề. Phần vấn đề dùng hàng đối chiếu; demo là một khung ứng dụng; dự án dùng ảnh chụp thật từ ứng dụng; dịch vụ là danh mục; quy trình là danh sách đánh số; liên hệ là form.

## Storyboard trước triển khai
1. Đầu: ba tác vụ trong chính khung demo lệch hàng; nét đỏ SVG nối các nút. Nội dung hero và CTA luôn hiển thị.
2. Giữa (0–450ms): đường đỏ được vẽ, ba tác vụ căn hàng qua transform và trở thành các tab ứng dụng. Đường đỏ luôn nằm trong dải đồ họa, không cắt chữ.
3. Cuối (450–1000ms): nội dung ứng dụng xuất hiện bên dưới; các tab trở thành điều khiển thật. Sau thao tác đầu tiên không tự động đổi hay xóa trạng thái. Nút “Xem lại chuyển động” chỉ phát lại bố cục, không reset dữ liệu.
4. Điện thoại: bỏ độ xoay lớn, giảm dịch chuyển; không ghim cuộn. Reduced motion: trạng thái cuối tĩnh, đủ nội dung và chức năng. Không tự chạy lại khi cuộn.

## Nội dung còn thiếu
Tên, thương hiệu, tiểu sử xác thực, email/Zalo, dự án thật, ảnh cá nhân, địa chỉ website. Tất cả đặt trong content.js; bản nháp hiện tên “Tên của bạn”. Không có nơi nhận brief: chỉ tạo/sao chép/tải tệp, không báo đã gửi.

## Kỹ thuật
HTML đọc được ngay + CSS tokens + JavaScript module không phụ thuộc thư viện. Demo dùng state riêng cho từng tab; chỉ một nguồn dữ liệu cho mọi tổng số. Form không gửi dữ liệu ra mạng. Project detail dùng URL ?project=... và dialog có focus/Escape. Không đăng ký hosting hoặc công bố.
