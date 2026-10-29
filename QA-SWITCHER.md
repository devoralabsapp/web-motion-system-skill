# Hai kiểu, một website — 29/10/2026

## Cấu trúc và bảo toàn

Bản gốc được lấy từ tag `v1.1-current`, chỉ đổi đường dẫn module để chia sẻ nội dung/dữ liệu và assets. Bản Một nét giữ nguyên app và choreography. Thanh chuyển tạo mỗi trang một lần, giữ viewport kích thước đầy đủ khi ẩn, loại trang ẩn khỏi focus/accessibility bằng inert và visibility. Không nạp lại trang khi đổi kiểu, không reset dữ liệu demo.

## Kiểm tra trình duyệt cục bộ

- Bản gốc: xử lý đơn DH-1042 → số mới 01, nhập form “Bản đang xem”. Chuyển sang Một nét và quay lại: số 01, giá trị form và scrollTop 6254 giữ nguyên.
- Một nét: xử lý đơn → số mới 01, chuyển hai lần vẫn giữ 01 và vị trí cuộn. Bản gốc và Một nét có state độc lập.
- Thanh chọn bàn phím trái/phải đổi kiểu và focus; browser Back chọn đúng kiểu trước; reload URL Một nét chỉ tải một iframe đúng kiểu.
- 320/390/768/1440px × hai kiểu: shell và trang con không tràn ngang; nút chọn nằm trong viewport. Không có thanh cuộn bên ngoài shell; vùng website có một scrollbar riêng và thanh chọn luôn nhìn thấy.
- Kiểm tra tải ảnh/font, menu mobile, dialog, giảm chuyển động và chuyển nhanh trước khi trang tải xong ở lượt cuối. Form không tự gửi dữ liệu.

## Build

`npm run build` kiểm tra cú pháp cả hai app và switcher, chạy sáu tests dữ liệu/hình học rồi xuất `dist/` với cả ba trang. `build-preview.mjs` tạo shell offline và hai preview riêng. Các script inline được kiểm tra cú pháp bằng Node VM.

Ảnh và phép đo responsive lưu cục bộ trong `../redline-delivery/combined/`. Chưa thử thiết bị mobile thật; viewport responsive trên trình duyệt desktop.
