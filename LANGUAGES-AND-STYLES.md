# Việt / Anh, sáu tab, animation phát lại — 1.5

| ID | Tab VI / EN | Motion riêng |
|---|---|---|
| classic | Bản gốc / Original | Sơ đồ ban đầu; hero và reveal phát lại |
| one-line | Một nét / One line | Module HTML morph thành demo thật |
| kinetic | Chữ động / Kinetic | Typography cắt ngang, outline, khối editorial |
| layers | Xếp lớp / Layers | Faux 3D, mặt giấy lệch lớp, dự án ba cột |
| blueprint | Bản vẽ / Blueprint | Grid kỹ thuật, mono, nét tự vẽ và scan |
| orbit | Quỹ đạo / Orbit | Motion path theo cung, radial reveal, poster |

Nguồn tham khảo: https://www.svgator.com/blog/website-animation-examples-and-effects/ — expressive typography, faux 3D/isometric, line/self-drawing, morphing và motion paths. Artwork, layout và choreography được thiết kế riêng bằng code; không tải artwork của ví dụ hoặc thêm dependency runtime.

## Sửa lỗi cuộn

Nguyên nhân 1.4 là observer bị unobserve sau lần đầu, lớp settled giữ nguyên và hero khóa ở cuối sau tương tác. Bản 1.5 giữ observer, rearm qua observer khác khi phần tử cách viewport hơn 100px để không nhấp nháy ở mép. Focus trong input/textarea/select không bị gián đoạn. Bản gốc cũng rearm reveal và sơ đồ.

Hero nhận biết cuộn lên bằng wheel, touch hoặc PageUp/Home/ArrowUp; cuộn do focus/resize không tự đổi tab demo. Quay lại hero không xóa đơn hàng, giỏ hoặc yêu cầu đã thao tác. Reduced motion luôn hiện đầy đủ nội dung.

## Song ngữ và state

VI/EN đồng bộ cả sáu frame, lưu vào URL và redline-language. Dịch nội dung, metadata, aria-label, placeholder, demo, filter, validation, thông báo, dialog và brief. Tiền vẫn là VND; ID/số lượng, tên riêng và nội dung khách nhập được giữ nguyên. Brief đang chỉnh sửa không tự dịch; tạo lại sẽ dùng ngôn ngữ hiện tại. Project link giữ locale/profile khi mở riêng.

Ảnh *-en.jpg chụp từ ba demo tiếng Anh. Trang capture cục bộ đã gỡ trước khi build/deploy.

## Kiểm chứng

- Build/cú pháp và 11 tests đạt: dữ liệu, morph, bộ bám theo thời gian, cubic, bản dịch nội dung dự án/giải pháp, nhãn động giữ ID/count và input không thuộc catalog.
- 6 tab × VI/EN × 320/768/1440px = 36 tổ hợp: không tràn ngang hoặc cắt mask, transform hữu hạn.
- Dự án: data-motion-runs tăng 1 → 3. Hero về 0% và xuống lại 45%, số đơn mới vẫn 01 sau khi xử lý từ 02.
- EN → VI → EN giữ input, textarea, state và số đơn. Brief tiếng Anh dùng nhãn tiếng Anh nhưng giữ nguyên phần khách nhập tiếng Việt.
- Video và JSON QA: ../redline-delivery/six-styles/. Ghi từ trình duyệt thật; tần số chụp không phải FPS render.

Giới hạn: viewport responsive trên trình duyệt desktop, chưa thử Safari/iPhone thật hoặc profiler. Danh tính chờ bổ sung, dữ liệu minh họa, form chưa gửi tới nơi nhận thực tế.
