export const initialOrders=()=>[
 {id:'DH-1042',name:'Linh An',channel:'Website',amount:680000,status:'new'},
 {id:'DH-1041',name:'Minh Khôi',channel:'Tin nhắn',amount:420000,status:'processing'},
 {id:'DH-1040',name:'Hà Chi',channel:'Website',amount:950000,status:'new'},
 {id:'DH-1039',name:'Tuấn Nam',channel:'Tại cửa hàng',amount:240000,status:'done'}
];
export const products=[{id:'notebook',name:'Sổ ghi chú',detail:'Giấy chấm · A5',price:120000,art:'notebook'},{id:'tray',name:'Khay để bàn',detail:'Gỗ sáng · Nhỏ gọn',price:280000,art:'tray'},{id:'lamp',name:'Đèn làm việc',detail:'Ánh sáng ấm · Đỏ gạch',price:650000,art:'lamp'}];
export const initialRequests=()=>[{id:'YC-028',name:'Mai Anh',title:'Bổ sung vật dụng văn phòng',detail:'Sổ ghi chép và bút cho buổi làm việc tuần tới.',amount:480000,status:'pending'},{id:'YC-027',name:'Quang Minh',title:'Mua giá đỡ màn hình',detail:'Một giá đỡ cho bàn làm việc khu vực vận hành.',amount:650000,status:'pending'},{id:'YC-026',name:'Ngọc Hà',title:'In tài liệu hướng dẫn',detail:'Tài liệu sử dụng nội bộ cho buổi hướng dẫn.',amount:320000,status:'approved'}];
export const orderSummary=orders=>({total:orders.length,pending:orders.filter(o=>o.status==='new').length,value:orders.reduce((s,o)=>s+o.amount,0)});
export const cartSummary=cart=>({quantity:products.reduce((s,p)=>s+(cart[p.id]||0),0),total:products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0)});
export function changeQuantity(cart,id,delta){if(!products.some(p=>p.id===id))return cart;const next={...cart,[id]:Math.max(0,Math.min(99,(cart[id]||0)+delta))};if(!next[id])delete next[id];return next;}
export function advanceOrder(orders,id){return orders.map(o=>o.id!==id?o:{...o,status:o.status==='new'?'processing':'done'});}
export function approveRequest(requests,id){return requests.map(r=>r.id===id?{...r,status:'approved'}:r);}
