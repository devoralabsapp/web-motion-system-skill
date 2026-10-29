# Một nét, thành hệ thống — storyboard trước triển khai

## Giữ lại bản hiện tại

Production https://redline-personal.vercel.app giữ nguyên commit `ccb257e0f04afb133c3966c5b91d30ec05e5d5cc` trên main. Snapshot nguồn: tag `v1.1-current` và bản ZIP riêng `../redline-personal-v1.1-preserved.zip`. Phiên bản này được phát triển trên `motion-one-line`, chỉ đẩy preview; không merge hoặc promote vào production.

## Phần cốt lõi

Một canvas chứa đúng một demo HTML. Hàng đơn đầu tiên, khối thống kê và bộ lọc thật được biến đổi bằng FLIP từ ba mẩu thông tin sang vị trí cuối. Không đặt một ảnh dashboard chồng lên app, không tạo hai bộ dữ liệu, không remount demo chỉ vì cuộn. Nét nối SVG nằm sau các module đục màu và biến thành đường khung/cấu trúc giao diện.

1. **Rời rạc (0–20%)**: headline 3 dòng qua mask, lệch nhịp trong 1.5 giây, giữ đủ dấu tiếng Việt. CTA luôn hiện. Ba module HTML ở ba vị trí lệch nhau bên phải, có phối cảnh nhẹ. Đường đỏ có điểm xuất phát.
2. **Kết nối (20–62%)**: module căn hàng trước, sau đó mở rộng sang vị trí của bảng, thống kê và bộ lọc. Nét đỏ đi qua các khoảng trống rồi chuyển thành khung app. Headline rời khung đọc theo tiến trình cuộn; không bị đường vẽ cắt qua.
3. **Vận hành (62–96%)**: module trở về mặt phẳng; câu hỏi đổi thành nội dung UI trên chính các element đó. Tab, dữ liệu và điều khiển xuất hiện theo thứ tự. Thao tác đầu tiên chốt hình học ở trạng thái cuối, giữ nguyên dữ liệu.
4. **Khám phá (96–100%)**: demo thật hoạt động, chuyển chế độ không reset state. Cuộn tiếp dẫn tới dự án. Preview được chọn mở rộng từ chính hình của nó sang ảnh trong dialog; Escape đóng an toàn.

## Kiểm soát

Progress là hàm thuần của vị trí cuộn, đo lại khi resize. Cuộn nhanh/ngược không phụ thuộc chuỗi timeout. Sau khi người xem thao tác, demo giữ mặt phẳng ổn định; cuộn ngược không giấu dữ liệu đã đọc. Replay là thao tác rõ ràng, chỉ chạy hình học, không reset state. Khi mất focus trang hoặc giảm chuyển động, kết thúc các animation đang chạy.

Mobile dùng các cảnh ngắn trong dòng cuộn bình thường, ba module xếp dọc; không dùng khoảng ghim dài. Reduced motion hiển thị trực tiếp bản tĩnh và đầy đủ demo.

## Kiểm chứng

Dựng hero + morph trước, kiểm tra desktop/mobile rồi mới hoàn thiện chuyển dự án và microinteraction. Cần kiểm tra frame trung gian, thứ tự cuộn thuận/ngược, thay đổi kích thước ở giữa cảnh, chuyển tab và cập nhật đơn khi morph đang chạy. Nếu có khả năng chụp chuỗi frame của trình duyệt, xuất video trải nghiệm thật từ các frame đó, không dựng video thay cho website.

Nguồn tham khảo đã đọc và xem trực tiếp: https://www.svgator.com/blog/website-animation-examples-and-effects/ — các nhóm typography, morphing, self-drawing, scrollytelling. Artwork và hình học của website được thiết kế riêng.
