# Motion study — Redline Atelier 1.1

Tham khảo nhóm kỹ thuật từ bài https://www.svgator.com/blog/website-animation-examples-and-effects/ (đọc 29/10/2026): expressive typography, line animation, self-drawing, morphing, animated logos, microinteractions, scrollytelling, hover và page transitions. Không sao chép artwork, video, code hoặc hiệu ứng nhận diện của ví dụ bên thứ ba.

## Chuyển thành trải nghiệm của website

1. **Hero có nhịp mở đầu:** typography dịch nhẹ 7px trong 850ms, không ẩn headline hay chặn CTA. Biểu tượng mũi tên tự vẽ trong 700ms.
2. **SVG morphing thực:** sáu đoạn cubic Bézier chung cấu trúc chuyển từ nét rời rạc → tuyến nối → khung app; nội suy các điểm bằng requestAnimationFrame. Chuỗi đầu 1050ms, chọn trạng thái riêng 650ms. Dấu đỏ chạy trên chính đường hiện tại. Nút chọn từng bước và replay hoạt động bằng chuột hoặc bàn phím.
3. **Signature task-to-app:** giữ ba tác vụ chuyển thành tab ứng dụng và ba demo state độc lập. Replay không đặt lại dữ liệu.
4. **Scrollytelling:** đường tiến trình đi theo cuộn tự nhiên trong vùng quy trình, từng bước đổi dấu mốc khi tới vùng đọc. Không khóa hoặc ghim cuộn, không dùng vòng lặp animation liên tục. Scroll listener thụ động, gộp cập nhật trong một frame, chỉ hoạt động khi vùng quy trình đang gần khung nhìn.
5. **Hover/focus dự án:** đường biên đỏ vẽ ra cùng chú thích ngắn về luồng sử dụng. Trên mobile chú thích hiển thị sẵn. Ảnh vẫn là ảnh chụp sản phẩm thật đã dựng.
6. **UI feedback:** mũi tên CTA phản hồi 180ms, sản phẩm nhích nhẹ 320ms, tổng giỏ/thống kê nhấn sáng 450ms sau thao tác, dialog mở 300ms, nền dialog 220ms. Các số vẫn do cùng nguồn state cũ tính toán.

## Dừng và tiếp cận

- Bật reduced motion trong hệ điều hành hoặc nút cuối trang sẽ dùng trạng thái tĩnh. Đang morph thì hủy frame và chốt vào trạng thái được chọn, không để hình dở dang. Vẫn dùng được mọi nút và demo.
- Chuyển sang tab trình duyệt khác sẽ kết thúc hình đang chuyển, không để callback chạy nền kéo dài.
- Không thay con trỏ, âm thanh, loader giả, parallax nặng hoặc hiệu ứng lặp cạnh văn bản.
- Nội dung mặc định vẫn nhìn thấy trước khi JavaScript enhancement chạy. Reveal chỉ là chuyển nhẹ khi phần nội dung đi vào khung nhìn, không phải điều kiện để đọc.

## Kiểm tra

Năm unit tests gồm tính toán demo, phê duyệt lặp, cấu trúc chung của path, điểm đầu/cuối chính xác và giới hạn nội suy. Đã thử chuyển SVG liên tiếp, bàn phím và giảm chuyển động trên trình duyệt; tất cả 15 tổ hợp 5 chiều rộng × 3 demo không tràn khung. Kết quả lưu trong `screenshots/motion-responsive-check.json`. Đây là kiểm tra bằng trình duyệt desktop; chưa đo FPS hoặc thử Safari iOS trên thiết bị thật.
