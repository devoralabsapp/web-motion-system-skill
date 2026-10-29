import {englishText} from './translations.js';
const reverseText=new Map(Object.entries(englishText).map(([vi,en])=>[en,vi]));
export function canonicalText(text){return reverseText.get(text)||text;}
export function translatePhrase(text,language='vi'){
 const raw=String(text),key=canonicalText(raw.trim());if(language!=='en')return raw.replace(raw.trim(),key);
 let translated=englishText[key];
 if(!translated){
  const exact=part=>englishText[part]||part;
  const rules=[
   [/^(\d+) \/ (\d+) ĐƠN$/,(m,a,b)=>`${a} / ${b} ORDERS`],[/^(\d+) YÊU CẦU$/,(m,a)=>`${a} REQUESTS`],
   [/^(Xử lý|Hoàn tất) đơn (.+)$/,(m,a,id)=>`${a==='Xử lý'?'Process':'Complete'} order ${id}`],
   [/^Duyệt yêu cầu (.+)$/,(m,id)=>`Approve request ${id}`],
   [/^Thêm (.+) vào giỏ$/,(m,name)=>`Add ${exact(name)} to basket`],
   [/^(Tăng|Giảm) số lượng (.+)$/,(m,action,name)=>`${action==='Tăng'?'Increase':'Decrease'} ${exact(name)} quantity`],
   [/^Số lượng (.+)$/,(m,name)=>`${exact(name)} quantity`],[/^Xóa (.+) khỏi giỏ$/,(m,name)=>`Remove ${exact(name)} from basket`],
   [/^Đang hiển thị (\d+) \/ (\d+) đơn hàng\.$/,(m,a,b)=>`Showing ${a} / ${b} orders.`],[/^Đang hiển thị (\d+) yêu cầu\.$/,(m,n)=>`Showing ${n} requests.`],
   [/^(.+) : (Đơn mới|Đang xử lý|Hoàn tất)\. Tổng số đã cập nhật\.$/,(m,id,status)=>`${id}: ${exact(status)}. Totals updated.`],
   [/^Đã thêm (.+) vào giỏ\.$/,(m,name)=>`Added ${exact(name.charAt(0).toUpperCase()+name.slice(1))} to the basket.`],
   [/^Đã duyệt (.+)\. Còn (\d+) yêu cầu chờ\.$/,(m,id,n)=>`${id} approved. ${n} ${n==='1'?'request':'requests'} pending.`],
   [/^Xem chi tiết (.+)$/,(m,name)=>`View details: ${exact(name)}`],
   [/^Ảnh chụp bản demo (.+)$/,(m,name)=>`Screenshot of the ${exact(name)} demo`],
   [/^Ảnh chụp giao diện demo (.+) đã xây trong website$/,(m,name)=>`Screenshot of the ${exact(name.toUpperCase()).toLowerCase()} demo built into this website`],
   [/^DỰ ÁN MINH HỌA \/ (.+)$/,(m,name)=>`SAMPLE PROJECT / ${exact(name)}`],
   [/^(.+) \/ CONCEPT$/,(m,name)=>`${exact(name)} / CONCEPT`],
   [/^Đang xem: (.+)\.$/,(m,name)=>`Now viewing: ${exact(name)}.`],
   [/^Portfolio Redline Atelier — (.+)$/,(m,name)=>`Redline Atelier portfolio — ${exact(name)}`]
  ];
  for(const [pattern,replace] of rules)if(pattern.test(key)){translated=key.replace(pattern,replace);break;}
 }
 return translated?raw.replace(raw.trim(),translated):raw;
}
export const validLanguage=value=>value==='en'||value==='vi';
