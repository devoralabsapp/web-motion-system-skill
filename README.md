# Web Motion System Skill

Skill để AI agent học và triển khai **240 mục motion có GIF demo riêng**, cùng **6 kiểu Web 1 + 3 kiểu Web 2**, giữ dữ liệu, phát lại khi cuộn và tránh nháy lặp.

Skill chính: [SKILL.md](skills/web-motion-system-skill/SKILL.md). Tài liệu kỹ thuật viết bằng tiếng Anh để nhiều agent sử dụng; ví dụ và nội dung tiếng Việt được giữ nguyên.

## Motion Explorer web app

**Every motion. All in one place.** Web app nằm trong cùng repo, dùng chung 240 renderer và bộ GIF của skill.

- **All motions:** đủ 240 mục / 24 nhóm, tìm ID/tên/tiếng Việt, lọc collection/category, lưu mục yêu thích trên trình duyệt.
- **Motion Lab:** demo Canvas chạy trực tiếp, play/pause/replay, tua timeline, chỉnh tốc độ, GIF gốc, tải GIF và chép prompt cho agent.
- **In practice:** giao diện thao tác được với reveal ổn định, SVG draw, pointer tilt, magnetic text, FLIP khi lọc/sắp xếp, checkbox draw, count-up, progress, tab, toggle và accordion. State giữ nguyên khi đổi màn hình.
- Chỉ chạy tối đa 6 preview trong viewport; ngừng khi tab bị ẩn. Reduced motion tắt autoplay và hiệu ứng trang; người dùng vẫn có thể chủ động phát riêng một demo. Có thông báo khi thiết bị yêu cầu giảm chuyển động.
- Demo 3D/shader là mô phỏng Canvas 2D; input/audio/data minh họa được ghi rõ. Đây không phải thư viện renderer 3D sản xuất.

### Chạy trên máy

```sh
npm ci
npm run dev
```

Mở địa chỉ Local được in ra (mặc định cổng 4190). Build tĩnh bằng `npm run build`, output ở `dist/`. Không cần backend hay biến môi trường để chạy app.

### Tự deploy trên Vercel

1. Import repo `devoralabsapp/web-motion-system-skill` trong team Vercel của bạn.
2. Chọn **Root Directory: ./**, **Framework Preset: Other**.
3. **Build Command:** `npm run build`; **Output Directory:** `dist`; **Install Command:** `npm ci`. Dùng Node.js 24.x.
4. Deploy. File `vercel.json` đã khai báo build/output và các header cho static app. Các lần push tiếp theo có thể deploy qua Git integration của Vercel.

URL chia sẻ dùng hash: `/#view=lab&motion=073`, `/#view=practice`, `/#view=all&category=18`. Repo vẫn private; app build chỉ công bố thư viện demo và các recipe ngắn, không chép toàn bộ snapshot mã của Web 1/Web 2 vào output.

### Kiểm tra app

Sau khi server local đã chạy, mở terminal khác:

```sh
npm run explorer:verify
```

Script Chrome/Playwright kiểm tra thay đổi khung hình của đủ 240 demo live, tìm kiếm/lưu mục, GIF, timeline, clipboard, state của workspace và reduced motion ở desktop/mobile. Có thể đặt `BASE_URL` để kiểm tra một deployment bạn quản lý. Báo cáo và ảnh QA lưu ngoài repo tại `../redline-delivery/motion-catalog/`.

Tên skill đã đổi thành **`$web-motion-system-skill`**. Nếu đã cài bản cũ, đổi/cập nhật thư mục skill thay vì giữ hai bản trùng nội dung.

## Danh mục 240 GIF

**[Mở danh mục 240 mục](skills/web-motion-system-skill/references/catalog.md)** — chọn nhóm để xem 10 GIF cùng lúc, hoặc mở từng recipe. Mỗi mục có ID ổn định, GIF, mô tả tiếng Việt, cách triển khai, thời gian khởi điểm và điều kiện kiểm thử.

| Phạm vi | Nội dung |
| --- | --- |
| 001–220 | Hiệu ứng, biến thể và mẫu chuyển động |
| 221–230 | Cách kích hoạt: load, viewport, scroll, hover, click, focus, drag, state, dữ liệu |
| 231–240 | Easing, spring, bounce, elastic, stagger, yoyo và timeline |

24 nhóm: nền tảng; xuất hiện; biến mất; chữ; chữ nâng cao; ảnh; mask; SVG; cuộn; layout; chuyển trang; điều khiển; loading/trạng thái; vật lý; con trỏ; chiều sâu; giấy; hạt; shader/biến dạng; điện ảnh; dữ liệu; sản phẩm; trigger; easing.

GIF là nghiên cứu minh họa bằng code, không phải video quay website. Demo 3D/shader là bản mô phỏng nguyên lý bằng Canvas 2D; tín hiệu audio/dữ liệu và thao tác đầu vào được ghi rõ là mô phỏng. Các mục có thể giao nhau và kết hợp, không phải 240 tên chuẩn độc lập.

### Gọi một mục cụ thể

```text
Dùng $web-motion-system-skill, mục 073 / Path tracer.
Đọc recipe và GIF tham khảo, rồi áp dụng vào sơ đồ quy trình của trang này.
Giữ dữ liệu, focus và reduced motion; không sửa section khác.
```

### Xem gallery có tìm kiếm trên máy

```sh
npm run catalog:preview
```

Mở địa chỉ local được in ra. Gallery cho tìm theo ID/tên/tiếng Việt, lọc nhóm và loại, phát/dừng từng GIF và chép prompt. Ảnh tĩnh hiển thị mặc định để không chạy 240 GIF cùng lúc. GitHub không chạy file HTML này trực tiếp; dùng các trang Markdown để xem GIF ngay trên GitHub.

### Tạo lại GIF và tài liệu

```sh
npm ci
npm run catalog:docs
npm run catalog:gifs
npm run catalog:verify
```

Generator dùng Playwright và **FFmpeg có encoder GIF** có sẵn trên máy. Cài browser hoặc chọn `BROWSER_CHANNEL=chrome` khi cần; đặt `FFMPEG_PATH` nếu `ffmpeg` không nằm trong PATH. Không có binary FFmpeg hoặc credential được đưa vào repo.

Thông số mặc định: 400×260px, 36 frame, 12fps, GIF lặp 3 giây. Có PNG tĩnh đi kèm. Để tạo lại một số mục: `node scripts/render-catalog-gifs.mjs --ids=1,73,240`. Manifest ghi nguồn renderer, số frame, số frame khác nhau, checksum và kích thước; validator phát hiện GIF thiếu hoặc không khớp renderer.

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
https://github.com/devoralabsapp/web-motion-system-skill/tree/main/skills/web-motion-system-skill
```

Nếu skill đã tồn tại, installer sẽ không tự ghi đè. Hãy yêu cầu agent kiểm tra phiên bản hiện có rồi cập nhật có chủ đích.

Sau khi cài thành công, skill có thể được gọi ở lượt tiếp theo. Trên máy đã tạo skill này, skill đã được cài sẵn.

### Cách 2: tải repo và chép thư mục skill

```sh
git clone https://github.com/devoralabsapp/web-motion-system-skill.git
```

Chép **nguyên thư mục** `skills/web-motion-system-skill/` vào `$CODEX_HOME/skills/`. Nếu không đặt `CODEX_HOME`, dùng `~/.codex/skills/`.

Cấu trúc sau khi cài phải là:

```text
<thư mục skills>/
└── web-motion-system-skill/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    ├── assets/
    └── scripts/
```

Không chỉ chép riêng `SKILL.md`: agent còn cần tài liệu và mã tham khảo bên cạnh nó. Kiểm tra trước khi ghi đè một bản skill đã tùy chỉnh.

## Cách dùng

Trong Codex, gọi bằng `$web-motion-system-skill`. Cho agent biết kiểu cần làm, trang cần áp dụng và phần phải giữ nguyên.

### Web 1: Một nét thành giao diện thật

```text
Dùng $web-motion-system-skill, kiểu Web 1 / one-line.
Làm hero chuyển từ ba tác vụ rời rạc thành dashboard đang có.
Dùng đúng các module HTML của demo, không tạo hai bộ dữ liệu.
Giữ bộ lọc, giỏ hàng, tab demo và form khi cuộn hoặc replay.
Kiểm tra cuộn ngược sau khi đã thao tác demo trên desktop/mobile.
```

### Web 1: chỉ đổi phong cách chuyển động

```text
Dùng $web-motion-system-skill để áp dụng kiểu kinetic cho trang này.
Giữ nội dung và chức năng. Thay motion của headline, preview dự án
và các section theo nhịp chuyển động ngang; giữ dấu tiếng Việt.
```

### Web 2: đủ ba hướng

```text
Dùng $web-motion-system-skill cho Web 2 với frame-shift,
cobalt-court và cutout-dept. Mỗi kiểu cần composition và motion riêng.
Giữ dữ liệu dùng chung khi đổi kiểu. Bốn bước quy trình vẫn chuyển động,
nhưng không tự chạy lặp khi đứng yên hoặc cuộn nhẹ ở mép màn hình.
Không sửa Web 1. Chạy thử và báo rõ những môi trường đã kiểm tra.
```

### Sửa lỗi nháy hoặc nghi ngờ cache

```text
Dùng $web-motion-system-skill để kiểm tra section này bị nháy trên Windows.
Đối chiếu prefers-reduced-motion, trigger geometry và file đang tải thật.
Đo clip/transform ở giữa animation và trạng thái sau khi kết thúc.
Giữ chuyển động theo thiết kế, không chuyển cả section sang tĩnh.
Kiểm tra tải lại với cache còn nguyên; không mặc định cache là nguyên nhân.
```

### Agent khác ngoài Codex

Clone repo rồi yêu cầu agent đọc entrypoint theo đường dẫn thực tế:

```text
Đọc skills/web-motion-system-skill/SKILL.md và dùng nó làm hướng dẫn
cho tác vụ này. Áp dụng Web 1 / blueprint vào trang dự án đang mở.
Chỉ đọc các reference liên quan, giữ nguyên state và chức năng hiện có.
```

Agent không hỗ trợ cú pháp `$skill` vẫn có thể đọc Markdown và mã tham khảo. Hãy dùng đường dẫn tuyệt đối nếu working directory khác thư mục repo.

## Bên trong skill

- [Web 1](skills/web-motion-system-skill/references/web1.md): storyboard, FLIP, SVG morph, 6 kiểu và reverse replay.
- [Web 2](skills/web-motion-system-skill/references/web2.md): 3 kiểu Creative Lab và bốn bước có trigger ổn định.
- [Độ ổn định](skills/web-motion-system-skill/references/reliability.md): nháy lặp, reduced motion, Windows/macOS, cache và kiểm thử.
- [Stable reveal](skills/web-motion-system-skill/assets/stable-reveal.mjs): helper có thể tích hợp, không phụ thuộc framework.
- `assets/source/`: snapshot các engine motion gốc của hai web. Đây là mã học cách triển khai, phụ thuộc DOM của website gốc, không phải template website chạy độc lập.

## Kiểm thử catalog và helper

Không cần cài Node/Playwright chỉ để đọc hoặc cài skill. Các lệnh dưới dành cho người muốn kiểm thử catalog và helper đi kèm, không thay thế kiểm thử website được tạo.

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

`npm test` kiểm tra đủ 240 GIF, checksum, frame và các liên kết recipe; kiểm tra gallery ở 1440px/390px với tìm ID, bộ lọc, phát/dừng, chép prompt và ảnh tĩnh mặc định. Phần helper tự mở fixture local riêng, kiểm tra hình học cốt lõi Web 1 và helper reveal ở 1440px/390px: chuyển động hiển thị thật, dừng ổn định, replay, focus, reduced motion, giữ input và dọn listener. Không truy cập production, không cài dependency hoặc deploy tự động. Đây không phải bài kiểm thử toàn bộ 9 giao diện trên mọi trình duyệt.

Skill không tự cấp quyền push, merge, deploy hoặc thay đổi website ngoài phạm vi yêu cầu.
