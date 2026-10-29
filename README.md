# DevoraLabs Web Motion

Skill để AI agent học và triển khai chuyển động của **cả Web 1 và Web 2**: 6 kiểu portfolio, 3 kiểu Creative Lab, cùng cách giữ dữ liệu, phát lại khi cuộn và tránh nháy lặp.

Skill chính: [SKILL.md](skills/devoralabs-web-motion/SKILL.md). Tài liệu kỹ thuật viết bằng tiếng Anh để nhiều agent sử dụng; ví dụ và nội dung tiếng Việt được giữ nguyên.

## Có những kiểu nào?

| Web | ID | Kiểu chuyển động |
| --- | --- | --- |
| Web 1 | `classic` | Sơ đồ SVG: tác vụ rời rạc → quy trình → khung ứng dụng. |
| Web 1 | `one-line` | Một nét nối các module HTML thật thành demo có thể thao tác. |
| Web 1 | `kinetic` | Chữ động qua mask, chuyển cảnh ngang và typography mạnh. |
| Web 1 | `layers` | Các lớp giấy, chiều sâu và phối cảnh nhẹ, kết thúc ở mặt phẳng. |
| Web 1 | `blueprint` | Nét tự vẽ, lưới kỹ thuật và scan từ trái sang phải. |
| Web 1 | `orbit` | Đường quỹ đạo, khung tròn và chuyển động có góc giới hạn. |
| Web 2 | `frame-shift` | Điện ảnh: framing, crop, chiều sâu và preview sản phẩm. |
| Web 2 | `cobalt-court` | Cobalt: chữ qua mask, panel theo hướng và nhịp rõ ràng. |
| Web 2 | `cutout-dept` | Collage: mở lớp giấy, nhãn nhấc nhẹ và độ nảy có kiểm soát. |

Chọn một kiểu, một nhóm hoặc cả hai web theo yêu cầu. Skill không buộc agent thêm toàn bộ 9 kiểu vào mọi dự án.

## Cài vào Codex

Repo hiện để **private**. Máy hoặc agent tải repo phải đăng nhập GitHub bằng tài khoản có quyền đọc. Không gửi token trong chat hoặc ghi token vào mã nguồn.

### Cách 1: nhờ Skill Installer

Gửi cho Codex:

```text
Dùng $skill-installer để cài skill từ:
https://github.com/devoralabsapp/devoralabs-web-motion/tree/main/skills/devoralabs-web-motion
```

Nếu skill đã tồn tại, installer sẽ không tự ghi đè. Hãy yêu cầu agent kiểm tra phiên bản hiện có rồi cập nhật có chủ đích.

Sau khi cài thành công, skill có thể được gọi ở lượt tiếp theo. Trên máy đã tạo skill này, skill đã được cài sẵn.

### Cách 2: tải repo và chép thư mục skill

```sh
git clone https://github.com/devoralabsapp/devoralabs-web-motion.git
```

Chép **nguyên thư mục** `skills/devoralabs-web-motion/` vào `$CODEX_HOME/skills/`. Nếu không đặt `CODEX_HOME`, dùng `~/.codex/skills/`.

Cấu trúc sau khi cài phải là:

```text
<thư mục skills>/
└── devoralabs-web-motion/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    ├── assets/
    └── scripts/
```

Không chỉ chép riêng `SKILL.md`: agent còn cần tài liệu và mã tham khảo bên cạnh nó. Kiểm tra trước khi ghi đè một bản skill đã tùy chỉnh.

## Cách dùng

Trong Codex, gọi bằng `$devoralabs-web-motion`. Cho agent biết kiểu cần làm, trang cần áp dụng và phần phải giữ nguyên.

### Web 1: Một nét thành giao diện thật

```text
Dùng $devoralabs-web-motion, kiểu Web 1 / one-line.
Làm hero chuyển từ ba tác vụ rời rạc thành dashboard đang có.
Dùng đúng các module HTML của demo, không tạo hai bộ dữ liệu.
Giữ bộ lọc, giỏ hàng, tab demo và form khi cuộn hoặc replay.
Kiểm tra cuộn ngược sau khi đã thao tác demo trên desktop/mobile.
```

### Web 1: chỉ đổi phong cách chuyển động

```text
Dùng $devoralabs-web-motion để áp dụng kiểu kinetic cho trang này.
Giữ nội dung và chức năng. Thay motion của headline, preview dự án
và các section theo nhịp chuyển động ngang; giữ dấu tiếng Việt.
```

### Web 2: đủ ba hướng

```text
Dùng $devoralabs-web-motion cho Web 2 với frame-shift,
cobalt-court và cutout-dept. Mỗi kiểu cần composition và motion riêng.
Giữ dữ liệu dùng chung khi đổi kiểu. Bốn bước quy trình vẫn chuyển động,
nhưng không tự chạy lặp khi đứng yên hoặc cuộn nhẹ ở mép màn hình.
Không sửa Web 1. Chạy thử và báo rõ những môi trường đã kiểm tra.
```

### Sửa lỗi nháy hoặc nghi ngờ cache

```text
Dùng $devoralabs-web-motion để kiểm tra section này bị nháy trên Windows.
Đối chiếu prefers-reduced-motion, trigger geometry và file đang tải thật.
Đo clip/transform ở giữa animation và trạng thái sau khi kết thúc.
Giữ chuyển động theo thiết kế, không chuyển cả section sang tĩnh.
Kiểm tra tải lại với cache còn nguyên; không mặc định cache là nguyên nhân.
```

### Agent khác ngoài Codex

Clone repo rồi yêu cầu agent đọc entrypoint theo đường dẫn thực tế:

```text
Đọc skills/devoralabs-web-motion/SKILL.md và dùng nó làm hướng dẫn
cho tác vụ này. Áp dụng Web 1 / blueprint vào trang dự án đang mở.
Chỉ đọc các reference liên quan, giữ nguyên state và chức năng hiện có.
```

Agent không hỗ trợ cú pháp `$skill` vẫn có thể đọc Markdown và mã tham khảo. Hãy dùng đường dẫn tuyệt đối nếu working directory khác thư mục repo.

## Bên trong skill

- [Web 1](skills/devoralabs-web-motion/references/web1.md): storyboard, FLIP, SVG morph, 6 kiểu và reverse replay.
- [Web 2](skills/devoralabs-web-motion/references/web2.md): 3 kiểu Creative Lab và bốn bước có trigger ổn định.
- [Độ ổn định](skills/devoralabs-web-motion/references/reliability.md): nháy lặp, reduced motion, Windows/macOS, cache và kiểm thử.
- [Stable reveal](skills/devoralabs-web-motion/assets/stable-reveal.mjs): helper có thể tích hợp, không phụ thuộc framework.
- `assets/source/`: snapshot các engine motion gốc của hai web. Đây là mã học cách triển khai, phụ thuộc DOM của website gốc, không phải template website chạy độc lập.

## Kiểm thử helper

Không cần cài Node/Playwright chỉ để đọc hoặc cài skill. Các lệnh dưới dành cho người muốn kiểm thử helper đi kèm, không thay thế kiểm thử website được tạo.

Tại thư mục gốc repo:

```sh
npm ci
npx playwright install chromium
npm test
```

Nếu máy đã có Chrome, có thể bỏ bước tải Chromium và chọn Chrome:

```powershell
# PowerShell / Windows
$env:BROWSER_CHANNEL = 'chrome'
npm test
```

```sh
# macOS / Linux
BROWSER_CHANNEL=chrome npm test
```

Script tự mở fixture local riêng, kiểm tra hình học cốt lõi Web 1 và helper reveal ở 1440px/390px: chuyển động hiển thị thật, dừng ổn định, replay, focus, reduced motion, giữ input và dọn listener. Không truy cập production, không cài dependency hoặc deploy tự động. Đây không phải bài kiểm thử toàn bộ 9 giao diện trên mọi trình duyệt.

Skill không tự cấp quyền push, merge, deploy hoặc thay đổi website ngoài phạm vi yêu cầu.
