# Một nét — chuyển động toàn trang / 1.4

## Choreography

- **Hero:** chuyển động theo cuộn có bộ bám thời gian 58–72ms, giới hạn độ trễ 14% để cuộn nhanh vẫn theo kịp. Nhấn các nút cảnh đi qua morph thay vì chốt ngay hình học cuối. Thao tác demo đầu tiên vẫn khóa hình học, không reset dữ liệu.
- **Dự án:** ảnh mở qua khung với góc nhìn nhẹ, chữ xuất hiện theo nhịp nối tiếp, lớp ảnh trôi tối đa 10px trên desktop. Khung và vùng bấm đứng yên. Focus hoặc click có thể chốt ngay nội dung để thao tác ổn định. Chuyển từ preview sang dialog tiếp tục dùng shared element.
- **Bài toán và giải pháp:** đường kẻ vẽ từ trái qua, hai phía bài toán/kết quả nhập vào vị trí, các cột giải pháp xuất hiện lệch nhịp.
- **Quy trình:** đường nối và sơ đồ đỏ tiến theo vị trí cuộn, nội dung từng bước vào từ bên cạnh. Không chạy vòng lặp.
- **Giới thiệu:** tiêu đề chia mask giữ nguyên dấu/emphasis, các đoạn văn và đường xác nhận cuối nối nhịp.
- **Liên hệ, footer:** form vào theo nhóm, nhãn và lựa chọn phản hồi khi focus/chọn, đường cuối trang khép lại câu chuyện. Animation không tự gửi dữ liệu.
- **Toàn trang:** progress mảnh và mục lục chương trên desktop; mobile giữ thanh tiến trình gọn, bỏ parallax. Typography, menu, link và detail dùng chung easing và nhịp.

## Điều phối và hiệu năng

Không chặn wheel/touch hoặc thay thế cơ chế cuộn trình duyệt. Hero chỉ cập nhật khi tiến trình thay đổi; lấy kích thước khi resize/render thay vì mỗi frame. Tracer SVG tính vị trí từ cubic bằng JavaScript, bỏ getTotalLength/getPointAtLength trong vòng lặp vẽ. Các phép đọc hình học của page motion chạy trước các phép ghi. Progress toàn trang ghi lên chính các phần tử hiển thị, tránh thay custom property ở root liên tục.

Các animation vào cảnh chỉ chạy một lượt. rAF dừng khi đã theo kịp; animation tạm dừng khi tab trình duyệt hoặc kiểu Một nét bị ẩn. Thông điệp từ shell kiểm tra source và origin. Quay lại giữ dữ liệu và vị trí cuộn. Giảm chuyển động hiển thị toàn bộ nội dung và chức năng ngay.

## Kiểm chứng

Build/cú pháp và 8 tests đạt, bao gồm tính độc lập với tần số frame của bộ bám và endpoint đường cubic. Đã kiểm tra tiến/lùi cảnh, resize giữa morph, xử lý đơn ở khoảng 79% morph (02 → 01 ngay lần bấm đầu), đổi tab giữ dữ liệu, mở dự án ngay khi vào cảnh và Escape dọn clone. Form tạo brief cục bộ đúng trạng thái.

Đã ghi video cuộn từ hero tới cuối trang trên trình duyệt thực: `../redline-delivery/full-motion/desktop.mp4` và `mobile.mp4`, khoảng 19 giây desktop và 20,5 giây mobile. Dữ liệu thời gian frame được giữ khi xuất; không nội suy. Tần số chụp giới hạn bởi công cụ (khoảng 14 fps desktop, 31 fps mobile), không phải số đo FPS render của website.

320/390/768/1440px: cả chế độ thường và reduced motion không tràn ngang, các dòng mask giữ đủ chiều rộng; mọi nội dung tĩnh hiện đủ, rail ẩn. Desktop có 45 đơn vị choreography; mobile bỏ sơ đồ quy trình trang trí nên có 44 đơn vị trong vùng nhìn thấy. Đổi kiểu giữ nguyên scrollTop trong thử nghiệm (7510px). Chưa đo bằng profiler hoặc thử iPhone/Safari thật.
