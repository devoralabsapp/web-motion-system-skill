// Stable IDs match the 240-item catalog requested by the user.
export const groupNames=[
 ['Foundations','Nền tảng','Transform, opacity, filter or color interpolation. Keep a stable wrapper and animate a child.'],
 ['Entrances','Xuất hiện','Animate toward the natural visible layout; do not leave content hidden if JavaScript fails.'],
 ['Exits','Biến mất','Keep the departing node until its exit finishes; move focus before removing an interactive region.'],
 ['Typography','Chữ','Preserve semantic text, grapheme clusters, Vietnamese accents and accessible reading order.'],
 ['Advanced type','Chữ nâng cao','Treat decorative duplicates as aria-hidden. Provide a static readable label beneath the visual treatment.'],
 ['Images','Hình ảnh','Crop inside an image wrapper. Keep aspect ratios and link hit areas fixed.'],
 ['Masks','Mask và clipping','Animate clip/mask layers, not measured scroll-trigger containers or focus outlines.'],
 ['SVG paths','SVG và nét vẽ','Use normalized stroke length or compatible path topology; keep decorative paths outside reading text.'],
 ['Scroll','Theo cuộn','Use native scrolling, stable measurements and bounded progress; do not hijack wheel or touch.'],
 ['Layout','Bố cục','Measure before/after layout once; animate visual deltas without changing DOM identity or app data.'],
 ['Navigation','Chuyển trang','Preserve navigation semantics and focus; clean up overlays and handle interrupted navigation.'],
 ['Controls','Điều khiển','An interaction must work immediately. Animation should confirm the action, not delay it.'],
 ['Feedback','Loading và trạng thái','Only show actual loading/progress or an explicitly labeled illustration; never fake success.'],
 ['Physics','Vật lý và kéo','Keep physics bounded and deterministic enough to settle; preserve keyboard alternatives.'],
 ['Pointer','Con trỏ','Provide touch/keyboard equivalents and avoid moving a hit target away from the pointer.'],
 ['Depth','3D và chiều sâu','Use perspective, transforms or a real 3D renderer as appropriate. Canvas GIFs are 2D projection studies.'],
 ['Paper','Giấy và vật liệu','Restrict rotations/folds to artwork; real paragraphs, forms and controls remain upright.'],
 ['Particles','Hạt','Use bounded particle counts and deterministic seeds for testing. Keep decorative canvases out of the accessibility tree.'],
 ['Distortion','Shader và biến dạng','These GIFs are Canvas 2D studies. Use shaders, mesh rendering or compositing when actual production fidelity needs them.'],
 ['Cinematic','Điện ảnh','Let framing, focus or lighting serve a concrete transition. Avoid invented playback controls and telemetry.'],
 ['Data','Dữ liệu','Derive values from actual data. GIF values are labeled demo; provide readable data alternatives in production.'],
 ['Product','Sản phẩm và ứng dụng','Use real app elements when the design calls for live UI; presentation must never mutate business state.'],
 ['Triggers','Cách kích hoạt','The GIF simulates an input event; it cannot receive hover, focus or scroll. Implement the actual event in the host app.'],
 ['Timing','Nhịp và easing','This changes how another effect plays. Compose it with a visible property rather than calling it a separate visual effect.']
];
// English name | Vietnamese description | implementation recipe (entry-specific).
const rows=[
`Fade|Đổi độ trong suốt|Interpolate opacity between 0 and 1 without changing layout.
Translate / Slide|Dịch vị trí|Animate translateX or translateY on a child plane.
Scale|Phóng to thu nhỏ|Interpolate scale around a deliberate transform origin.
Rotate|Xoay quanh tâm|Animate a bounded angle, then settle at the intended orientation.
Skew|Nghiêng theo trục|Interpolate skewX; reserve distortion for short artwork or headings.
Stretch|Kéo giãn|Scale one axis while holding the other constant.
Squash|Ép dẹt|Compress Y and expand X briefly, then restore both axes.
Pivot|Xoay quanh bản lề|Set transform-origin to a corner and rotate through a short arc.
Blur transition|Từ mờ sang rõ|Reduce filter blur to zero as content becomes visible.
Color transition|Chuyển màu|Interpolate background or stroke colors with readable contrast.`,
`Fade up|Hiện dần và đi lên|Combine opacity 0 to 1 with translateY 30px to zero.
Fade down|Hiện dần và đi xuống|Combine opacity with negative starting Y offset.
Slide in left|Đi vào từ trái|Translate a child from outside the left clip boundary.
Slide in right|Đi vào từ phải|Translate a child from outside the right clip boundary.
Pop in|Bật xuất hiện|Scale from near zero through a small overshoot to one.
Grow from origin|Lớn từ điểm neo|Scale from the lower-left origin instead of the center.
Drop in|Rơi vào vị trí|Start above the frame and use a damped landing curve.
Spring entrance|Xuất hiện bằng lò xo|Use a damped spring and a finite settle threshold.
Overshoot entrance|Vượt đích rồi về|Pass the target once, then ease back to the final position.
Zoom-through entrance|Tiến từ xa qua khung|Combine depth-like scale and focus while ending at identity.`,
`Fade away|Tan dần|Decrease opacity and retain DOM until the exit completes.
Shrink out|Thu nhỏ biến mất|Scale toward zero around the center during removal.
Zoom out exit|Lùi xa|Scale down with a depth cue and fading contrast.
Collapse exit|Co vùng nội dung|Animate measured height or grid row size before removal.
Slide out|Trượt ra ngoài|Translate beyond a clipping wrapper; preserve neighboring layout.
Mask retract|Mask khép lại|Animate inset from zero to a closed horizontal aperture.
Dissolve|Tan theo vùng|Use a deterministic spatial threshold to remove image regions.
Disintegration|Phân rã thành mảnh|Split a visual clone into fragments with short departing paths.
Fall off|Rơi khỏi bố cục|Combine downward acceleration and bounded rotation on a departing clone.
Fly away|Bay khỏi vị trí|Move a visual clone along an upward curved trajectory.`,
`Character stagger|Ký tự lệch nhịp|Segment text by grapheme and offset each character start time.
Word stagger|Từng từ nối tiếp|Wrap words in visual spans while keeping one accessible text label.
Line reveal|Từng dòng qua mask|Use padded line masks that preserve accents and existing emphasis.
Typewriter|Gõ chữ|Reveal grapheme clusters at a timed rate with an optional decorative caret.
Text scramble|Ký tự nhiễu thành chữ|Replace only unrevealed characters with seeded temporary glyphs.
Split-text assembly|Chữ tách rồi ráp|Move glyph fragments toward their measured final word positions.
Text morph|Chuyển hình chữ|Use compatible glyph paths or crossfade aligned outlines; do not claim arbitrary fonts share topology.
Kinetic typography|Chữ dẫn chuyển động|Sequence horizontal phrase masks with scale and directional accents.
Tracking animation|Đổi khoảng ký tự|Animate letter-spacing for a short title with room for reflow.
Variable-font animation|Đổi trục font|Animate supported font-variation axes; the demo illustrates weight with a stroke approximation.`,
`Outline drawing|Vẽ viền chữ|Convert a short display label to paths and draw normalized strokes.
Text fill reveal|Màu lấp vào chữ|Clip a moving color plane inside a static text mask.
Moving gradient text|Gradient chạy trong chữ|Move a color gradient beneath a fixed text mask.
Marquee|Dòng chữ chạy|Duplicate an aria-hidden visual track for a seamless translation loop.
Word carousel|Luân phiên cụm từ|Transition one word at a time in a stable-width label container.
Text on path|Chữ theo đường|Place glyphs along a curve with tangent-aligned orientation.
Text bending|Chữ uốn cong|Offset and rotate letters along a controllable baseline curve.
Typographic echo|Nhiều lớp chữ nối đuôi|Draw decorative copies with time-offset transforms and decreasing opacity.
Odometer digits|Chữ số cuộn|Use clipped vertical digit tracks for each changing place value.
Reading highlight|Nhấn theo đoạn đọc|Move a highlight behind text according to actual reading progress.`,
`Image wipe|Ảnh mở theo hướng|Expand a rectangular image clip while the image plane stays fixed.
Curtain reveal|Mở ảnh như rèm|Translate two covering panels away from the center.
Ken Burns|Pan zoom chậm|Animate scale and translation within a fixed photo crop.
Image parallax|Ảnh trôi trong khung|Translate an oversized image plane within a stationary wrapper.
Hover crossfade|Đổi ảnh khi hover|Crossfade two aligned image planes on actual pointer hover.
Displacement transition|Ảnh chuyển qua biến dạng|Offset sampled image strips with a displacement field during the blend.
Liquid image transition|Ảnh chuyển như chất lỏng|Use a moving wave boundary to replace the old image.
Image slicing|Ảnh chia thành dải|Stagger translated image strips while preserving final registration.
Image flip|Lật ảnh|Rotate the visual around Y and switch the image at the backface boundary.
Pixel reveal|Ảnh hiện theo ô|Reveal a seeded grid of image tiles progressively.`,
`Rectangular reveal|Mở vùng chữ nhật|Grow a rectangular clip from a chosen anchor.
Circular reveal|Mở vùng tròn|Increase circle radius until all corners are visible.
Iris transition|Đóng mở khẩu độ|Use rotating polygon blades around a central aperture.
Polygon reveal|Mở theo đa giác|Interpolate a polygon mask with consistent vertex count.
Blob mask|Mask hữu cơ|Animate radial control points of a smooth organic mask.
Diagonal wipe|Mở theo đường chéo|Sweep a diagonal polygon across the visual.
Venetian blinds|Mở qua các nan|Expand parallel strip masks with synchronized or staggered timing.
Checkerboard reveal|Mở ô bàn cờ|Reveal alternating square cells on separate timing phases.
Cursor-follow mask|Mask theo con trỏ|Track pointer position with a bounded circular reveal mask.
Radial sweep|Quét góc quanh tâm|Expand a sector angle while keeping a constant outer radius.`,
`Line drawing|Nét tự vẽ|Set pathLength to one and animate stroke-dashoffset from one to zero.
Line erasing|Nét tự xóa|Animate the visible stroke length toward zero without altering geometry.
Path tracer|Điểm sáng theo nét|Evaluate position along the path as progress changes.
Path morphing|Đường biến hình|Interpolate equal-length compatible cubic path coordinate arrays.
Icon morphing|Icon biến hình|Morph compatible outlines or transition coordinated icon strokes.
Dash flow|Nét đứt chạy|Animate dash phase on a stationary path.
Sequential vector reveal|Các phần SVG nối tiếp|Schedule subpaths with bounded stagger and visible final state.
Brush-stroke reveal|Nét cọ mở nội dung|Use a growing broad stroke as a mask, then expose the full content.
Line-to-interface|Nét thành giao diện|Morph a free line into a frame and reveal actual UI inside it.
Connector rerouting|Đường nối đổi tuyến|Interpolate connector control points between valid layout routes.`,
`Scroll reveal|Hiện khi cuộn tới|Trigger a one-shot entrance from stable viewport geometry.
Scroll scrubbing|Tiến trình bám cuộn|Map scroll position continuously into a bounded timeline value.
Multilayer parallax|Nhiều lớp trôi|Apply distinct bounded scroll ratios to decorative depth layers.
Pinned scene|Ghim một cảnh|Keep a scene sticky while the document progresses through its narrative span.
Sticky storytelling|Kể chuyện trong sticky|Change the visual chapter while readable sections move beside a fixed stage.
Horizontal scroll section|Cuộn dọc thành dải ngang|Map local vertical progress to a horizontal track translation.
Scroll-controlled frame sequence|Cuộn điều khiển khung hình|Choose a preloaded frame index from actual scroll progress.
Scroll zoom|Cuộn để tiến gần|Map local scroll progress to a limited image scale.
Scroll rotation|Cuộn đổi góc|Map scroll progress to a bounded angle rather than an endless spin.
Reading progression|Tiến trình đọc|Compute progress from the current readable section and highlight its text.`,
`FLIP animation|Nối hai layout|Measure First and Last bounds, invert the delta, then animate to identity.
Animated grid reflow|Lưới chuyển vị trí|Keep keyed card identities and animate measured grid placement changes.
List reordering|Danh sách đổi thứ tự|Animate keyed row deltas when sorting changes their layout.
Masonry rearrangement|Khối lệch hàng tổ chức lại|Measure each masonry tile and animate to its new column and Y position.
Accordion expansion|Mở chiều cao|Measure intrinsic content height; animate the container and preserve focus.
Card expansion|Thẻ mở rộng|Expand measured card bounds while retaining its content identity.
Shape interpolation|Khung đổi hình|Interpolate size and corner radius between defined states.
Sliding navigation indicator|Chỉ báo trượt|Measure the selected tab and animate one shared indicator.
Tab-content transition|Đổi nội dung tab|Transition outgoing/incoming panels without resetting retained state.
Responsive layout transition|Chuyển bố cục responsive|FLIP between breakpoints using stable keys and final responsive layout.`,
`Page crossfade|Hai trang hòa nhau|Crossfade incoming and outgoing snapshots while navigation commits once.
Push transition|Trang mới đẩy cũ|Translate both page planes in the same direction with complementary offsets.
Slide-over transition|Trang phủ trượt|Move the incoming page above a stationary outgoing page.
Page curtain|Rèm chuyển trang|Cover the viewport, commit navigation, then retract the cover.
Portal transition|Qua khung sang cảnh|Expand a bounded portal mask into the next scene.
Zoom navigation|Phóng vào điểm đến|Scale a selected visual into the destination framing.
Shared-element transition|Phần tử nối hai trang|FLIP a visual clone between source and target, restoring opacity and focus.
Glitch transition|Nhiễu lúc chuyển|Apply brief seeded strip offsets and channel separation, then settle cleanly.
Paper-tear transition|Xé giấy lộ trang|Move an irregular paper boundary across the next scene.
Diagonal scene cut|Cắt cảnh theo mảng chéo|Slide a diagonal scene mask across a stationary destination.`,
`Button press|Nút nén khi bấm|Compress the visual button layer on pointerdown and release on pointerup or cancel.
Magnetic button|Nút hút nhẹ|Offset an inner visual toward the pointer while retaining the actual hit box.
Animated underline|Gạch chân chuyển động|Scale a thin underline from a deliberate transform origin.
Border drawing|Vẽ đường viền|Draw normalized border segments around a fixed control.
Toggle motion|Công tắc đổi trạng thái|Move the thumb and update its semantic checked state together.
Checkbox drawing|Vẽ dấu tích|Draw check strokes after the real input value changes.
Hamburger-to-close|Menu thành dấu đóng|Translate and rotate top/bottom lines; hide the middle line.
Like / favorite burst|Yêu thích bật phản hồi|Scale a heart and emit a small bounded decorative burst after toggling.
Click ripple|Gợn từ điểm bấm|Expand a fading circle from the actual click location.
Focus-ring transition|Viền focus đổi trạng thái|Animate a visible outline response without hiding keyboard focus.`,
`Spinner|Vòng đang xử lý|Rotate a partial arc only while the actual pending operation remains active.
Determinate progress|Tiến trình có dữ liệu|Use true completion data to set a linear progress bar.
Skeleton shimmer|Vệt sáng trên khung chờ|Sweep a low-contrast gradient through placeholder blocks.
Loading dots|Chấm chờ nối tiếp|Stagger dot offsets or opacity while marking the status accessibly.
Breathing indicator|Chỉ báo nhịp thở|Pulse scale and opacity gently within a narrow range.
Stroke loader|Nét chạy quanh đường|Move a bounded dash window around a normalized outline.
Success checkmark|Dấu hoàn tất|Draw the check only after the operation reports success.
Error shake|Rung báo lỗi|Apply a short damped horizontal shake once per validation event.
Status-color pulse|Nhấn màu trạng thái|Briefly emphasize a real changed status, then return to readable colors.
Completion confetti|Giấy mừng hoàn thành|Emit finite particles after an actual completion, with reduced-motion fallback.`,
`Inertial drag|Kéo có quán tính|Estimate release velocity and integrate bounded deceleration.
Momentum carousel|Carousel giữ đà|Apply deceleration along the track and settle on a valid item.
Spring return|Lò xo về vị trí|Integrate a damped spring toward a fixed rest position.
Snap-to-position|Hút về điểm neo|Choose the nearest allowed anchor after drag release.
Rubber-band resistance|Kéo vượt có lực cản|Compress displacement beyond a limit with a nonlinear resistance curve.
Magnetic attraction|Vật hút nhau|Move particles toward bounded attraction centers with damping.
Pointer repulsion|Vật tránh con trỏ|Apply distance-weighted repulsion and restore each rest position afterward.
Collision response|Phản ứng va chạm|Resolve overlap and reverse normal velocity with bounded restitution.
Gravity motion|Chuyển động trọng lực|Integrate acceleration and stop or bounce at a defined floor.
Pendulum motion|Đung đưa|Move a mass around a fixed pivot using a damped angular oscillation.`,
`Cursor follower|Lớp theo chuột|Track pointer coordinates with a time-based follower on a decorative layer.
Cursor trail|Đuôi con trỏ|Render a short history of pointer samples with fading age.
Spotlight cursor|Vùng sáng theo chuột|Center a radial illumination mask on current pointer position.
Pointer tilt|Mặt nghiêng theo chuột|Map pointer offset inside the card to small perspective rotations.
Pointer parallax|Các lớp lệch theo chuột|Apply distinct offset factors to bounded artwork layers.
Contextual cursor morph|Con trỏ đổi ngữ cảnh|Change a decorative cursor shape over supported interactive targets.
Velocity stretch|Kéo dài theo tốc độ|Orient an ellipse along smoothed pointer velocity with a scale limit.
Brush painting|Chuột vẽ bề mặt|Accumulate pointer strokes on a canvas without intercepting normal controls.
Particle cursor|Hạt theo con trỏ|Emit a capped set of fading particles from pointer samples.
Cursor-revealed content|Chuột lộ nội dung|Expose a second surface through a pointer-centered mask.`,
`Perspective card tilt|Thẻ nghiêng phối cảnh|Rotate a card around X and Y with a limited perspective depth.
3D card flip|Lật thẻ 3D|Rotate through 180 degrees with explicit front/back faces.
Cube transition|Chuyển mặt khối hộp|Rotate registered planes around a cube center.
3D carousel|Carousel không gian|Arrange item planes on a circular 3D track and rotate the track.
Orbital motion|Vật đi quanh tâm|Evaluate an elliptical path and vary depth/occlusion as it passes.
Exploded view|Sản phẩm tách lớp|Move registered layers apart along a chosen axis while retaining alignment.
Assembly animation|Các bộ phận ráp lại|Stage parts from distinct start transforms into one final product.
Camera dolly|Camera tiến lùi|Move a perspective camera toward the target rather than scaling the DOM layout.
Camera orbit|Camera xoay quanh vật|Animate camera angle while maintaining a stable look-at target.
Depth-of-field transition|Đổi nét theo chiều sâu|Change focal distance among depth layers; use actual depth in production.`,
`Paper fold|Gấp giấy|Rotate one paper half about its fold edge with a backface treatment.
Paper unfold|Mở lớp gấp|Open a folded plane toward a flat final sheet.
Page curl|Cuộn mép trang|Use a curved mesh or controlled strip approximation at the page edge.
Book-page turn|Lật trang sách|Rotate a page around the book spine and expose the reverse side.
Stacked-sheet movement|Chồng giấy dịch chuyển|Offset aligned sheets with small bounded translation and rotation.
Card fan|Xòe thẻ|Rotate cards around a common lower pivot with a spread parameter.
Card shuffle|Xáo thẻ|Temporarily lift and reorder visual cards, then settle into a stack.
Folder opening|Mở tập hồ sơ|Rotate a folder cover away from an upright content sheet.
Sticker peel/lift|Nhấc nhãn dán|Bend or lift a decorative corner with a restrained underside cue.
Cutout assembly|Ghép mảnh cắt|Animate paper fragments toward a deliberate final collage arrangement.`,
`Particle emission|Phát hạt|Spawn a capped particle set from an emitter with deterministic lifetime.
Particle explosion|Hạt bung ra|Distribute velocities radially with a finite decay.
Particle implosion|Hạt hút vào|Move particles from a ring toward a common target.
Particle dissolve|Nội dung tan thành hạt|Sample the visual into particles and disperse them after capture.
Dust drift|Bụi trôi|Move low-contrast particles slowly across a bounded art field.
Particle trail|Đường đuôi hạt|Emit short-lived particles along a moving source path.
Swarm motion|Bầy hạt thành cụm|Use bounded attraction plus repulsion to preserve group density.
Flocking|Bầy đàn|Combine alignment, cohesion and separation in the production simulation.
Flow-field particles|Hạt theo trường hướng|Integrate particles along a smooth vector field.
Particle text formation|Hạt tụ thành chữ|Assign particles to sampled text target positions.`,
`Mesh warping|Uốn bề mặt lưới|Displace mesh vertices with a bounded analytic field.
Water ripple|Gợn nước|Use radial distance and time to displace rings or sampled pixels.
Metaballs|Khối hữu cơ nhập tách|Threshold a sum of radial influence fields.
Gooey connection|Nối như chất keo|Combine blurred alpha fields with a threshold or bridge geometry.
Noise displacement|Méo theo nhiễu|Offset sample coordinates with a seeded continuous noise field.
Chromatic aberration|Tách kênh màu|Offset red/green/blue channels briefly within an artwork boundary.
Refraction distortion|Méo khúc xạ|Displace background sampling by a lens normal field.
Fluid gradient|Màu như chất lỏng|Animate smooth gradient centers and blending weights.
Ink diffusion|Mực loang|Evolve irregular expanding alpha fronts; a real fluid solver is optional by fidelity.
Dither dissolve|Tan theo mẫu điểm|Use a moving threshold against an ordered or seeded dither pattern.`,
`Animated framing|Khung thay đổi|Animate a bounded crop around a chosen product subject.
Match cut|Nối cảnh tương ứng|Align a shared shape across two scene compositions during the cut.
Motion blur|Nhòe chuyển động|Accumulate time-offset visual samples or use a velocity-aware renderer.
Rack focus|Chuyển điểm nét|Transfer sharpness between fixed foreground/background subjects.
Light sweep|Vệt sáng quét|Move a clipped specular gradient across a material surface.
Animated vignette|Viền tối thay đổi|Interpolate radial darkening without lowering readable UI contrast.
Slit-scan effect|Lát thời gian|Sample different temporal states for adjacent image strips.
Shutter transition|Đóng mở cửa chớp|Move registered shutter blades to cover and expose a scene.
Letterbox transition|Dải điện ảnh đóng mở|Animate top/bottom matte bars outside important content.
Dolly zoom|Zoom phối hợp camera|Change camera distance and field of view while retaining subject scale.`,
`Count-up/down|Số đổi giá trị|Interpolate a display value toward the actual new numeric state.
Bar growth|Cột phát triển|Scale bars from their baseline, not from the center.
Line-chart drawing|Vẽ biểu đồ đường|Reveal the actual data path with a normalized stroke window.
Arc progress|Tiến trình cung|Map real completion to a stroke arc angle.
Chart morphing|Đổi cấu trúc biểu đồ|Interpolate a defined data mapping; keep labels and values accessible.
Animated bar ranking|Đổi thứ hạng|Maintain keyed bars and FLIP their rank positions.
Timeline progression|Tiến qua mốc|Move the progress marker through actual chronological milestones.
Map-route drawing|Vẽ tuyến bản đồ|Reveal a geographic route and move a marker along it.
Heatmap evolution|Bản đồ nhiệt đổi|Interpolate cells from actual old to new data ranges.
Audio-reactive visualization|Phản ứng âm thanh|Read analyser frequency/time data; the GIF uses a labeled synthetic signal.`,
`Task-to-dashboard|Tác vụ thành dashboard|Move actual task modules to measured dashboard slots with one state store.
Wireframe-to-interface|Khung thành UI|Stage strokes, surfaces and real controls without replacing app identity.
Diagram-to-product|Sơ đồ thành sản phẩm|Map diagram nodes to product regions with deliberate visual correspondence.
Feature spotlight|Nhấn tính năng|Expose one real feature region while maintaining the rest of the interface.
Guided product tour|Hướng dẫn từng điểm|Anchor an accessible step to actual controls and allow immediate dismissal.
Interactive before/after|So sánh trước sau|Bind a clipped comparison surface to a real range control or drag handle.
Card-to-detail|Thẻ thành chi tiết|Measure the source and detail bounds for a shared visual transition.
Workflow simulation|Mô phỏng quy trình|Advance explicitly labeled demo records through valid process states.
Live UI assembly|UI thật ráp lại|FLIP the same HTML controls into final layout, then release transforms for interaction.
Product-state transition|Đổi trạng thái sản phẩm|Animate the visual delta after the real product state has changed.`,
`On load|Khi trang sẵn sàng|Start after required layout/assets are ready; keep primary actions usable before intro ends.
On enter viewport|Khi đi vào màn hình|Use stable wrapper bounds and a deliberate entry threshold.
On leave viewport|Khi ra khỏi màn hình|Fire an exit once at a defined boundary without hiding focused content.
Scroll-linked|Bám tiến trình cuộn|Derive normalized progress from the real scroll container.
Hover-triggered|Khi rê chuột|Listen to pointer enter/leave and provide equivalent focus behavior.
Click/tap-triggered|Khi bấm chạm|Start from the actual activation event, including keyboard activation.
Focus-triggered|Khi nhận focus|Respond to focus-visible/focusin without moving the control target.
Drag-controlled|Khi kéo|Use pointer capture, cancellation and a keyboard-operable equivalent.
State-driven|Khi state đổi|Animate after an actual data transition; do not mutate state from animation progress.
Audio/data-driven|Theo tín hiệu đầu vào|Map measured input to bounded visual parameters; GIF input is synthetic.`,
`Linear|Tốc độ đều|Use p directly as the property interpolation value.
Ease-in|Tăng tốc|Use a convex easing curve, for example p cubed.
Ease-out|Giảm tốc|Use a concave easing curve, for example one minus the cube of one minus p.
Ease-in-out|Tăng rồi giảm tốc|Use a symmetric smooth timing curve with stable endpoints.
Spring|Nhịp lò xo|Use a damped oscillator or the host library spring with an explicit settle threshold.
Bounce|Nhịp nảy|Use piecewise impact-like timing with decreasing rebound amplitude.
Elastic|Đàn hồi|Use a bounded oscillatory easing that ends at the target.
Stagger|Lệch nhịp|Offset multiple element start times without duplicating business events.
Yoyo / alternate|Thuận rồi ngược|Play the same timeline in alternating directions without resetting application state.
Sequenced choreography|Nối nhiều chuyển động|Use a timeline with explicit phase boundaries and cancellation semantics.`
];
export const effects=rows.flatMap((text,g)=>text.split('\n').map((line,index)=>{
 const [name,vi,recipe]=line.split('|'),id=g*10+index+1;
 const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const key=String(id).padStart(3,'0')+'-'+slug;
 return {id,key,name,vi,recipe,group:g+1,groupName:groupNames[g][0],kind:g===22?'trigger':g===23?'timing':'effect',gif:`${key}.gif`,durationMs:g===12?1200:g===8?1000:g===19?900:850};
}));
if(effects.length!==240||new Set(effects.map(e=>e.key)).size!==240)throw new Error('Catalog must contain 240 unique entries');
