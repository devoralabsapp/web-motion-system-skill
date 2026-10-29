import {translatePhrase,canonicalText,validLanguage} from './i18n-text.js';
const localeKey='redline-language',textSources=new WeakMap(),attributeSources=new WeakMap();
const localizedAttributes=['aria-label','placeholder','title','alt','data-question','content'];
let localeValue='vi',localeStarted=false;
export const getLanguage=()=>localeValue;
function preferredLanguage(){const query=new URLSearchParams(location.search).get('lang');if(validLanguage(query))return query;try{const saved=localStorage.getItem(localeKey);if(validLanguage(saved))return saved;}catch{}return 'vi';}
function ignored(element){return !element||Boolean(element.closest('script,style,textarea,[data-i18n-ignore]'));}
function translateNode(node){if(ignored(node.parentElement)||!node.nodeValue.trim())return;
 const current=node.nodeValue,prior=textSources.get(node);const original=prior&&prior.last===current?prior.original:current.replace(current.trim(),canonicalText(current.trim()));
 const next=translatePhrase(original,localeValue);textSources.set(node,{original,last:next});if(current!==next)node.nodeValue=next;
}
function translateAttributes(element){if(ignored(element))return;let sources=attributeSources.get(element);if(!sources){sources=new Map();attributeSources.set(element,sources);}
 if(element.matches('img[src]')){const src=element.getAttribute('src');if(/project-(orders|shop|internal)(-en)?\.jpg/.test(src)){const base=src.replace(/(project-(?:orders|shop|internal))-en\.jpg/,'$1.jpg');const next=localeValue==='en'?base.replace(/\.jpg$/,'-en.jpg'):base;if(src!==next)element.setAttribute('src',next);}}
 for(const name of localizedAttributes){if(!element.hasAttribute(name))continue;const current=element.getAttribute(name),prior=sources.get(name);const original=prior&&prior.last===current?prior.original:canonicalText(current);const next=translatePhrase(original,localeValue);sources.set(name,{original,last:next});if(current!==next)element.setAttribute(name,next);}
}
export function refreshLanguage(root=document.documentElement){
 if(root.nodeType===3){translateNode(root);return;}if(root.nodeType!==1)return;
 translateAttributes(root);const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){if(node.nodeType===3)translateNode(node);else translateAttributes(node);}
}
export function setLanguage(language,{updateUrl=true,announce=true}={}){
 if(!validLanguage(language))return;localeValue=language;document.documentElement.lang=language;
 refreshLanguage();try{localStorage.setItem(localeKey,language);}catch{}
 if(updateUrl){const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(history.state,'',url);}
 if(announce)document.dispatchEvent(new CustomEvent('language:change',{detail:{language}}));
}
export function initI18n(){if(localeStarted)return;localeStarted=true;setLanguage(preferredLanguage(),{announce:false});
 new MutationObserver(records=>{const roots=new Set();for(const record of records){if(record.type==='characterData')translateNode(record.target);else if(record.type==='attributes')translateAttributes(record.target);else for(const node of record.addedNodes)roots.add(node);}roots.forEach(refreshLanguage);}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:localizedAttributes});
 addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='redline:language'||!validLanguage(event.data.language))return;setLanguage(event.data.language);});
}
export function makeBrief(data){const value=key=>String(data.get(key)||'').trim();return localeValue==='en'?
 `WEB APP PROJECT BRIEF\n\nName: ${value('name')}\nContact: ${value('contact')}\nApplication: ${translatePhrase(value('type'),'en')}\n\nProblem to solve:\n${value('problem')}\n\nEstimated budget: ${value('budget')||'To be discussed'}\nPreferred timing: ${value('timing')||'To be discussed'}\n\nThis brief was created locally. It has not been sent to a recipient.`:
 `BRIEF DỰ ÁN WEB APP\n\nTên: ${value('name')}\nKênh liên hệ: ${value('contact')}\nLoại ứng dụng: ${value('type')}\n\nVấn đề cần giải quyết:\n${value('problem')}\n\nNgân sách dự kiến: ${value('budget')||'Chưa xác định'}\nThời điểm mong muốn: ${value('timing')||'Có thể trao đổi sau'}\n\nBrief được tạo cục bộ. Chưa gửi đến người nhận.`;
}
