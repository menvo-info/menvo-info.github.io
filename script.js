// ----- Tabs -----
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
function openTab(id) {
  tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === id));
  panels.forEach((p) => p.classList.toggle('active', p.id === id));
  if (history.replaceState) history.replaceState(null, '', '#' + id);
}
tabs.forEach((t) => t.addEventListener('click', () => {
  openTab(t.dataset.tab);
  if (window.innerWidth < 980) document.querySelector('.main').scrollIntoView({ behavior: 'smooth' });
}));
const start = location.hash.replace('#', '');
if (document.getElementById(start)) openTab(start);

// ----- Contact form -> email app -----
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent('Portfolio contact from ' + f.name.value);
  const body = encodeURIComponent(f.message.value + '\n\n' + f.name.value + (f.email.value ? ' · ' + f.email.value : ''));
  window.location.href = 'mailto:menthcstk@gmail.com?subject=' + subject + '&body=' + body;
});

// ----- Gallery -----
const gallery = document.getElementById('gallery');
document.querySelector('.gallery-open').addEventListener('click', () => gallery.showModal());
document.querySelector('#gallery .gallery-close').addEventListener('click', () => gallery.close());
gallery.addEventListener('click', (e) => { if (e.target === gallery) gallery.close(); });

const layout = document.getElementById('layout');
document.querySelector('.layout-open').addEventListener('click', () => layout.showModal());
document.querySelector('.layout-close').addEventListener('click', () => layout.close());
layout.addEventListener('click', (e) => { if (e.target === layout) layout.close(); });

document.getElementById('year').textContent = new Date().getFullYear();

// ----- Language toggle (EN / VI) -----
const vi = {
  downloadCV: 'Tải CV', tabAbout: 'Giới thiệu', tabProjects: 'Dự án', tabResume: 'CV', tabContact: 'Liên hệ',
  aboutTitle: 'Về tôi',
  aboutLead: 'Tôi đang theo con đường kỹ sư phần mềm nhúng, thích làm việc với board thật: đi dây, nạp firmware, đọc log và tìm ra vì sao hệ thống không chạy như mong đợi. Tôi quan tâm đến những hệ thống có thể kiểm thử, đo lường và giải thích được.',
  factLocation: 'Việt Nam', factField: 'Nhúng & IoT', factEdu: 'Kỹ thuật Máy tính',
  highlightsTitle: 'Điểm nổi bật', metricBoards: 'gói tin đến nơi, 8 giờ thử nghiệm', metricPacket: 'board, tối đa 3 chặng', metricThroughput: 'dòng tiêu thụ khi chạy pin', metricVectors: 'lõi AES tại 100 MHz',
  experienceTitle: 'Học vấn & Kinh nghiệm', eduText: 'Chương trình Cử nhân · Công nghệ Kỹ thuật Máy tính',
  akTitle: 'Chương trình đào tạo Nhúng', akText: 'STM32, framework hướng sự kiện AK, FreeRTOS và luyện thuật toán bằng C hằng tuần.',
  highlandsText: 'Làm việc ở các vị trí nhận order, bán hàng, barista và chăm sóc khách hàng; hỗ trợ vận hành đội nhóm trong giờ cao điểm.',
  editorText: 'Chỉnh sửa khoảng 15 video ngắn, kiểm tra nhịp dựng, phụ đề, âm thanh, hình ảnh và chất lượng xuất cuối.',
  skillsTitle: 'Kỹ năng', skLang: 'Ngôn ngữ', skHw: 'Phần cứng & Nền tảng', skProto: 'Nhúng & Giao thức', skTools: 'Công cụ',
  statsTitle: 'Hoạt động GitHub',
  projectsTitle: 'Dự án tiêu biểu',
  picoSummary: 'Mạng BLE gồm 4 board, node cảm biến gửi dữ liệu về Root qua tối đa 3 chặng. Mọi gói tin được xác nhận end-to-end, và node tự tìm đường mới khi mất liên kết hoặc mất node cha.',
  mmDelivery: 'gói tin đến nơi', mmHop: 'mỗi chặng', mmReroute: 'đổi đường',
  pico1: 'Root ACK end-to-end, gửi lại với cùng định danh gói, lọc gói trùng',
  pico2: 'Định tuyến MESH tự phục hồi, chống vòng lặp; 23 lượt thí nghiệm tự động có chèn lỗi',
  pico3: 'Node tự hàn trên mạch đục lỗ: quang trở, INA219 đo dòng, pin 18650 + TP4056, nguyên mẫu ngủ sâu',
  viewRepo0: 'Xem repository ↗', viewLayout: 'Xem sơ đồ mạch đục lỗ',
  proj2Title: 'Đồ án 2 · Mạng cảm biến BLE đa chặng', proj2Text: 'Chuyển mạng từ ESP32 sang Raspberry Pi Pico 2 W: 4 board, 3 chặng, ACK end-to-end, thí nghiệm tự động.', projectsLead: 'Những hệ thống tôi có thể trình bày từ kiến trúc đến kiểm thử: quyết định thiết kế, trường hợp lỗi, phép đo và kết quả trên phần cứng.',
  wsnSummary: 'Triển khai và kiểm thử firmware Gateway GATT server và Sensor client, xác minh đường truyền dự phòng qua Relay trên ba bo ESP32 thật.',
  wsn1: 'Gói dữ liệu 10 byte, GATT Write With Response, đưa dữ liệu callback về loop bằng queue',
  wsn2: 'Chuyển sang Relay sau 3 lần mất phản hồi, thử lại đường trực tiếp sau 10 lần thành công',
  wsn3: 'Theo dõi sequence để phát hiện mất/trùng gói, log Serial CSV gồm RSSI và PDR',
  viewRepo: 'Xem repository ↗', viewRepo2: 'Xem repository ↗', viewFlows: 'Xem lưu đồ kỹ thuật',
  aesSummary: 'Dự án nhóm (5 thành viên): lõi AES-128 dạng iterative và pipeline 10 tầng, hoàn tất quy trình Vivado và tích hợp với ARM Cortex-A9 qua AXI4-Lite.',
  aes1: 'RTL và testbench, synthesis, implementation, timing, bitstream, kiểm thử trên board',
  aes2: 'Xác minh bằng vector FIPS-197; thông lượng 12.8 Gbps trong mô phỏng RTL',
  aes3: 'C driver truy cập thanh ghi bộ tăng tốc qua AXI4-Lite',
  rfidSummary: 'Xác định workflow truy cập, kịch bản kiểm thử và tiêu chí nghiệm thu. Lắp ráp phần cứng, tích hợp các thành phần, tái hiện lỗi và xác minh các kịch bản truy cập bình thường lẫn bất thường.',
  resumeTitle: 'CV', downloadCV2: 'Tải PDF', openTab: 'Mở tab mới ↗',
  contactTitle: 'Liên hệ', contactText: 'Bạn đang tìm thực tập sinh Embedded hoặc IoT? Tôi sẵn sàng trình bày kiến trúc, luồng code, cách kiểm thử và giới hạn của các dự án.',
  phName: 'Họ tên *', phEmail: 'Email', phMsg: 'Lời nhắn *', send: 'Gửi', formNote: 'Nút này sẽ mở ứng dụng email với nội dung đã soạn sẵn.',
  footer: 'Xây dựng từ những hệ thống đã kiểm thử, không phải từ khóa.'
};
let lang = 'en';
const langBtn = document.querySelector('.lang-toggle');
langBtn.addEventListener('click', () => {
  lang = lang === 'en' ? 'vi' : 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((n) => {
    if (n.dataset.en === undefined) n.dataset.en = n.textContent;
    n.textContent = lang === 'vi' ? (vi[n.dataset.i18n] || n.dataset.en) : n.dataset.en;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((n) => {
    if (n.dataset.enPh === undefined) n.dataset.enPh = n.placeholder;
    n.placeholder = lang === 'vi' ? (vi[n.dataset.i18nPh] || n.dataset.enPh) : n.dataset.enPh;
  });
  langBtn.textContent = lang === 'en' ? 'Tiếng Việt' : 'English';
});
