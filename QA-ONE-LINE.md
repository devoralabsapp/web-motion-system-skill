# Kiểm chứng “Một nét, thành hệ thống” — 29/10/2026

## Build và dữ liệu

`npm run build` đạt: kiểm tra cú pháp, sáu kiểm thử về dữ liệu, tiến trình cuộn đảo chiều, module về slot và topology đường cubic; xuất `preview.html` và `dist/`. Website không thêm dependency runtime.

Kiểm tra trực tiếp trên trình duyệt: đơn mới 02 → 01, hàng và nhãn cùng đổi trạng thái; giỏ hàng tính tổng 520.000đ sau khi thêm sổ, khay và tăng số sổ; phê duyệt giảm chờ 02 → 01; bộ lọc thông báo đúng số kết quả. Đổi tab và chạy lại choreography giữ dữ liệu. Reload trả về dữ liệu mẫu theo thiết kế.

## Motion

- Đã xem các cảnh rời rạc, căn hàng, nhập vào UI và demo hoàn chỉnh trên desktop/mobile. Module là cùng element HTML xuyên cảnh. Cuộn không render lại demo (theo `data-render-revision`).
- Chạy tiến, lùi và chuyển nhanh bằng scene controls; thử thao tác ở khoảng 78% morph. Thao tác đầu tiên cập nhật dữ liệu và chốt hình học; không yêu cầu bấm lần hai.
- Resize ở cảnh giữa: transform hữu hạn, không reset dữ liệu; kiểm tra mask tiếng Việt tại 320/390/768/1024/1440px.
- Reduced motion: 5 kích thước × 3 chế độ không tràn ngang/nội dung nhìn thấy; demo đầy đủ. Bản mobile dùng dòng cuộn thường, không ghim dài.
- Chuyển preview dự án sang ảnh chi tiết bằng shared element. Đóng Escape giữa chuyển cảnh: dialog đóng, clone còn 0; trả focus về trigger. Resize và giảm chuyển động hủy animation đang chạy.
- Console không có lỗi trong các lượt kiểm tra.

## Video bàn giao

`../redline-delivery/one-line/desktop-motion.mp4` (11 giây) và `mobile-motion.mp4` (12,3 giây) được xuất từ ảnh liên tục của chính trình duyệt, giữ khoảng thời gian giữa các frame. Tốc độ chụp trung bình khoảng 16 fps desktop và 33 fps mobile; video là bằng chứng trải nghiệm, không dùng để kết luận FPS render. Các nút cảnh cuộn trang thật đến vị trí tương ứng, bao gồm một lượt đi ngược.

Dữ liệu: `responsive-static.json`, `geometry-check.json`; manifest thời gian trong `desktop-frames/recording.json` và `mobile-frames/recording.json`. Media chỉ bàn giao cục bộ, không đưa vào runtime hoặc repo.

Giới hạn: trình duyệt desktop với viewport responsive, chưa thử thiết bị iPhone/Safari thật; chưa đo hiệu năng bằng profiler. Nội dung cá nhân vẫn là placeholder, concept và dữ liệu đều minh họa; form chưa gửi đến dịch vụ nhận brief.

## Bảo toàn bản hiện tại

Production/main giữ commit `ccb257e0f04afb133c3966c5b91d30ec05e5d5cc`. Tag `v1.1-current` và ZIP `../redline-personal-v1.1-preserved.zip` giữ bản nguồn cũ. Bản này chỉ commit/push nhánh `motion-one-line`, triển khai Preview trên Vercel.
