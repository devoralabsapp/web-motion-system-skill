# Kiểm tra bàn giao — 29/10/2026

## Cập nhật 1.1 — hiệu ứng và triển khai

Đã bổ sung SVG morphing thật (ba trạng thái), line/logo drawing, tiến trình theo cuộn, chú thích hover/focus, phản hồi số liệu và dialog. Đã lặp lại 15 tổ hợp kích thước/chế độ; không có phần tử tràn khung. Kiểm tra đổi scene liên tiếp và bật reduced motion chốt đúng path hợp lệ, không NaN; headline computed animation = none. Có 5 unit tests đạt, gồm 2 kiểm thử hình học mới. Xem `MOTION.md` và `screenshots/motion-responsive-check.json`. Các mục phía dưới ghi lại kiểm tra nền của phiên bản 1.0.

## Đã kiểm tra trên trình duyệt

- Kích thước 320, 390, 768, 1024, 1440px × cả ba chế độ = 15 tổ hợp. Không tràn chiều ngang, không phát hiện heading/nút/đoạn văn tràn khung, giá trị thống kê nằm trong ô. Kết quả đọc từ DOM thật: `screenshots/responsive-check.json`.
- Phát hiện giá trị tiền quá rộng ở ô mobile 320px. Đã sửa ô thứ ba thành hàng riêng và kiểm tra lại.
- Đơn hàng: số chờ 02 → 01 sau thao tác; lọc đơn mới, xử lý hết → trạng thái rỗng; tổng giá trị 2.290.000đ nhất quán.
- Bán hàng: sổ 120.000đ + khay 280.000đ = 400.000đ. Tăng sổ lên 2 → 520.000đ. Thêm đủ ba loại → 1.050.000đ. Đặt lại giỏ → 0đ.
- Nội bộ: duyệt từng yêu cầu, cập nhật số chờ và đã duyệt; duyệt hết → trạng thái rỗng.
- Chuyển qua các chế độ giữ giỏ 520.000đ; reset chỉ ảnh hưởng chế độ đang chọn. Unit test còn kiểm tra giảm/xóa số lượng, giới hạn 99 và tính idempotent của phê duyệt.
- Bàn phím: ArrowRight/Home trên tab, Enter tăng số lượng, focus vào vùng demo khi phần tử thao tác bị loại khỏi danh sách. Dialog focus đầu ở nút đóng; Shift+Tab vẫn ở trong dialog; Escape đóng và bỏ query dự án. Mobile menu đóng bằng Escape và sau khi chọn liên kết; đã sửa lại nhãn nút khi đóng.
- Brief trống: 3 lỗi, focus trường tên đầu tiên. Brief đủ thông tin hư cấu: tạo đúng nội dung, thông báo “chưa gửi đi”, sao chép đúng vào clipboard. Không có backend, thanh toán hoặc tiếp nhận đơn thật.
- Nút giảm chuyển động: animation computed = none, task label ẩn, tab opacity = 1, đầy đủ nội dung sau replay. CSS `prefers-reduced-motion` cùng trạng thái tĩnh đã được kiểm tra có mặt trong trình duyệt.
- Font Be Vietnam Pro / IBM Plex Mono báo đã tải. Ảnh project thực tế báo complete và naturalWidth > 0. Console không có lỗi trong lần kiểm tra cuối.
- Đã xem và lưu ảnh hero desktop/mobile, demo mobile, dự án và liên hệ. Ảnh dự án được cắt từ khung nhìn thật bằng vùng DOM đo được; không dựng dashboard giả.

## Kiểm tra nguồn

`npm run check` pass: cú pháp app/content/server và 3 unit tests cho dữ liệu nghiệp vụ. Không có dependency ứng dụng hoặc dịch vụ ngoài. `node build-preview.mjs` tạo bản gộp mở trực tiếp; cú pháp script bên trong được kiểm tra riêng.

## Giới hạn xác thực

Kiểm tra bằng kích thước trình duyệt trên máy tính; chưa thử trên thiết bị cảm ứng thật, Safari iOS hoặc screen reader. Không đo hiệu năng chuyên sâu. Không giả lập preference hệ điều hành trong công cụ; đã kiểm tra nút giảm chuyển động thực tế và CSS media tương ứng. Bản `preview.html` chỉ kiểm tra cú pháp/tài nguyên; trình duyệt công cụ chặn giao thức file nên chưa mở trực tiếp qua file. Luồng HTTP của nguồn chính đã được kiểm tra đầy đủ. Chưa kiểm thử dịch vụ nhận form vì chưa được cấu hình.

## Trạng thái trước triển khai (phiên bản 1.0)

Không tạo hosting, không gửi brief ra mạng, không tạo khách hàng hoặc thành tích. Cần bổ sung thông tin liệt kê trong README trước khi công bố.
