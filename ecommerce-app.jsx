import { useState, useReducer, useEffect, useCallback } from "react";
import {
  ShoppingCart, Sun, Moon, Search, Menu, X, Plus, Minus, Trash2, Heart,
  ChevronRight, Check, User, LogOut, Settings, BarChart3,
  Users, ClipboardList, Filter, Mail, Phone, MapPin, Clock, Car, Wrench,
  Battery, Cpu, Package, MessageCircle, Star, CreditCard, Banknote, QrCode,
  Calendar, Shield, Truck, Award, Camera, Share2, ExternalLink,
  AlertTriangle, Bell, Send, Play, Pause, RefreshCw, Timer, TrendingUp,
  Eye, Copy, Link, Globe, Zap, ChevronDown, ChevronUp, Image
} from "lucide-react";

/* ==================== SOCIAL ICONS ==================== */
const FBIcon = ({size=18,className=""})=><svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IGIcon = ({size=18,className=""})=><svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TKIcon = ({size=18,className=""})=><svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
const YTIcon = ({size=18,className=""})=><svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;

/* ==================== SHIELD LOGO ==================== */
const ShieldLogo=({size=40,showText=true,textSize="sm",dark=true})=>{
  const s=size,tx=dark?"#ffffff":"#1a1a1a",txS=dark?"#999":"#666";
  return(
    <div style={{display:"flex",alignItems:"center",gap:showText?10:0}}>
      <svg width={s} height={s*1.14} viewBox="0 0 140 160" style={{filter:"drop-shadow(0 2px 6px rgba(245,158,11,0.3))"}}>
        <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#d97706"/></linearGradient></defs>
        <path d="M70 8 L130 35 L130 85 C130 115 105 145 70 155 C35 145 10 115 10 85 L10 35 Z" fill="none" stroke="url(#sg)" strokeWidth="3"/>
        <path d="M70 20 L120 42 L120 82 C120 108 100 134 70 143 C40 134 20 108 20 82 L20 42 Z" fill={dark?"rgba(245,158,11,0.08)":"rgba(245,158,11,0.05)"}/>
        <text x="70" y="78" textAnchor="middle" fontFamily="'Orbitron',sans-serif" fontSize="42" fontWeight="900" fill="#f59e0b">444</text>
        <text x="70" y="105" textAnchor="middle" fontFamily="'Rajdhani',sans-serif" fontSize="16" fontWeight="700" fill={tx} letterSpacing="6">PRIUS</text>
        <line x1="45" y1="115" x2="95" y2="115" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
        <text x="70" y="130" textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize="8" fill={txS} letterSpacing="3">СЭЛБЭГ ЗАСВАР</text>
      </svg>
      {showText&&<div style={{lineHeight:1}}>
        <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:textSize==="lg"?28:textSize==="md"?20:14,fontWeight:800,color:"#f59e0b",letterSpacing:-1}}>444</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:textSize==="lg"?16:textSize==="md"?13:10,fontWeight:700,color:tx,letterSpacing:3,marginTop:1}}>PRIUS</div>
        {textSize!=="sm"&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:8,color:txS,letterSpacing:2,marginTop:2}}>СЭЛБЭГ & ЗАСВАР</div>}
      </div>}
    </div>
  );
};

/* ==================== TRANSLATIONS ==================== */
const T={mn:{
brand:"444 Prius Сэлбэг Засвар",home:"Нүүр",parts:"Сэлбэг",services:"Засвар",gallery:"Зураг",contact:"Холбоо барих",
addToCart:"Сагсанд нэмэх",yourCart:"Таны сагс",total:"Нийт",placeOrder:"Захиалга өгөх",cartEmpty:"Сагс хоосон",
shipping:"Хүргэлт",payment:"Төлбөр",review:"Шалгах",confirmation:"Баталгаажуулалт",
allModels:"Бүх загвар",price:"Үнэ",quantity:"Тоо",inStock:"Нөөцөд",
heroTitle:"Toyota Prius & Aqua сэлбэг, засвар",heroSub:"Prius 10, 11, 20, 30, 40/41, Aqua — Япон ориг сэлбэг, мэргэжлийн засвар",
shopNow:"Сэлбэг үзэх",bookService:"Засвар захиалах",search:"Сэлбэг хайх...",admin:"Админ",
overview:"Тойм",productMgmt:"Бүтээгдэхүүн",orderMgmt:"Захиалга",settings:"Тохиргоо",
addedToCart:"Сагсанд нэмэгдлээ!",removedFromCart:"Хасагдлаа!",
email:"Имэйл",password:"Нууц үг",name:"Нэр",phone:"Утас",address:"Хаяг",
orderSuccess:"Захиалга амжилттай!",orderSuccessDesc:"Бид тантай холбогдоно.",backToShop:"Буцах",outOfStock:"Дууссан",
paymentMethod:"Төлбөрийн хэлбэр",cash:"Бэлэн мөнгө",qpay:"QPay / SocialPay",bankTransfer:"Дансаар",installment:"Хуваан төлөх",
ourServices:"Манай үйлчилгээ",whyUs:"Яагаад биднийг?",
warranty:"Баталгаат",fastService:"Хурдан шуурхай",originalParts:"Ориг сэлбэг",experienced:"Туршлагатай",
callUs:"Залгах",sendMsg:"Мессеж",workHours:"Ажлын цаг",everyDay:"Даваа-Бямба: 09:00-19:00",sunday:"Ням: Амарна",
sortBy:"Эрэмбэлэх",priceLow:"Үнэ ↑",priceHigh:"Үнэ ↓",ratingHigh:"Үнэлгээ ↓",byName:"Нэрээр",
noProducts:"Олдсонгүй",clearFilters:"Цэвэрлэх",items:"ш",prev:"Өмнөх",next:"Дараах",
computerDiag:"Компьютер оношлогоо",batteryService:"Батерей засвар",engineRepair:"Мотор засвар",
suspensionRepair:"Явах эд анги",acService:"Кондишн",oilChange:"Тос солилт",callout:"Дуудлагын засвар",bodyRepair:"Кузов засвар",
bankName:"Хаан банк",accountNo:"5012345678",accountHolder:"444 Prius ХХК",
qpayDesc:"QPay/SocialPay сканнер",installmentDesc:"3-12 сар хуваан төлөх",cashDesc:"Салбар дээр бэлнээр",
fbPage:"Facebook",viewOnFb:"Facebook-д үзэх",new:"Шинэ",used:"Хуучин",
login:"Нэвтрэх",logout:"Гарах",save:"Хадгалах",cancel:"Цуцлах",delete:"Устгах",
orderNew:"Шинэ",orderProcessing:"Боловсруулж буй",orderDelivered:"Хүргэсэн",
totalProducts:"Нийт сэлбэг",totalOrders:"Нийт захиалга",totalRevenue:"Нийт орлого",activeUsers:"Идэвхтэй",
// Social & New features
socialConnect:"Social холболт",autoPost:"Автомат пост",scheduler:"Хуваарь",
postSchedule:"Постын хуваарь",dailyPosts:"Өдөрт 3 удаа",postTimes:"09:00, 13:00, 18:00",
schedulerOn:"Идэвхтэй",schedulerOff:"Идэвхгүй",nextPost:"Дараагийн пост",
stockAlert:"Нөөцийн анхааруулга",lowStock:"Цөөхөн үлдлээ!",stockWarning:"Нөөц бага!",
onlyLeft:"л үлдлээ",alertThreshold:"Анхааруулах босго",stockAlerts:"Нөөцийн мэдэгдэл",
shareToSocial:"Social-д хуваалцах",shareProduct:"Бүтээгдэхүүн хуваалцах",
postPreview:"Постын урьдчилсан харагдац",generatePost:"Пост үүсгэх",postNow:"Одоо постлох",
scheduled:"Хуваарилсан",posted:"Постлогдсон",pending:"Хүлээгдэж буй",
socialDashboard:"Social удирдлага",followers:"Дагагч",engagement:"Идэвхжилт",
postsToday:"Өнөөдрийн пост",connectedAccounts:"Холбогдсон хаягууд",
autoPostDesc:"Өдөрт 3 удаа сэлбэгийн зар автоматаар постлогдоно",
notifSettings:"Мэдэгдлийн тохиргоо",emailNotif:"Имэйл мэдэгдэл",smsNotif:"SMS мэдэгдэл",
},en:{
brand:"444 Prius Parts & Service",home:"Home",parts:"Parts",services:"Services",gallery:"Gallery",contact:"Contact",
addToCart:"Add to Cart",yourCart:"Your Cart",total:"Total",placeOrder:"Place Order",cartEmpty:"Cart is empty",
shipping:"Shipping",payment:"Payment",review:"Review",confirmation:"Confirmation",
allModels:"All Models",price:"Price",quantity:"Qty",inStock:"In Stock",
heroTitle:"Toyota Prius & Aqua Parts & Service",heroSub:"Prius 10, 11, 20, 30, 40/41, Aqua — Original Japanese parts",
shopNow:"Browse Parts",bookService:"Book Service",search:"Search parts...",admin:"Admin",
overview:"Overview",productMgmt:"Products",orderMgmt:"Orders",settings:"Settings",
addedToCart:"Added to cart!",removedFromCart:"Removed!",
email:"Email",password:"Password",name:"Name",phone:"Phone",address:"Address",
orderSuccess:"Order Successful!",orderSuccessDesc:"We will contact you.",backToShop:"Back",outOfStock:"Out of Stock",
paymentMethod:"Payment Method",cash:"Cash",qpay:"QPay / SocialPay",bankTransfer:"Bank Transfer",installment:"Installment",
ourServices:"Our Services",whyUs:"Why Choose Us?",
warranty:"Warranty",fastService:"Fast Service",originalParts:"Original Parts",experienced:"Experienced",
callUs:"Call Us",sendMsg:"Message",workHours:"Hours",everyDay:"Mon-Sat: 09:00-19:00",sunday:"Sun: Closed",
sortBy:"Sort",priceLow:"Price ↑",priceHigh:"Price ↓",ratingHigh:"Rating ↓",byName:"Name",
noProducts:"No products",clearFilters:"Clear",items:"pcs",prev:"Prev",next:"Next",
computerDiag:"Computer Diagnostics",batteryService:"Battery Service",engineRepair:"Engine Repair",
suspensionRepair:"Suspension",acService:"AC Service",oilChange:"Oil Change",callout:"Callout",bodyRepair:"Body Repair",
bankName:"Khan Bank",accountNo:"5012345678",accountHolder:"444 Prius LLC",
qpayDesc:"Scan with QPay/SocialPay",installmentDesc:"3-12 month plans",cashDesc:"Pay cash at location",
fbPage:"Facebook",viewOnFb:"View on Facebook",new:"New",used:"Used",
login:"Login",logout:"Logout",save:"Save",cancel:"Cancel",delete:"Delete",
orderNew:"New",orderProcessing:"Processing",orderDelivered:"Delivered",
totalProducts:"Total Parts",totalOrders:"Total Orders",totalRevenue:"Revenue",activeUsers:"Active",
socialConnect:"Social Connect",autoPost:"Auto Post",scheduler:"Scheduler",
postSchedule:"Post Schedule",dailyPosts:"3x Daily",postTimes:"09:00, 13:00, 18:00",
schedulerOn:"Active",schedulerOff:"Inactive",nextPost:"Next Post",
stockAlert:"Stock Alert",lowStock:"Low Stock!",stockWarning:"Stock Low!",
onlyLeft:"left",alertThreshold:"Alert Threshold",stockAlerts:"Stock Alerts",
shareToSocial:"Share to Social",shareProduct:"Share Product",
postPreview:"Post Preview",generatePost:"Generate Post",postNow:"Post Now",
scheduled:"Scheduled",posted:"Posted",pending:"Pending",
socialDashboard:"Social Dashboard",followers:"Followers",engagement:"Engagement",
postsToday:"Today's Posts",connectedAccounts:"Connected Accounts",
autoPostDesc:"Auto-post parts 3x daily to social media",
notifSettings:"Notification Settings",emailNotif:"Email Notifications",smsNotif:"SMS Notifications",
}};

/* ==================== BUSINESS & DATA ==================== */
const BIZ={name:"444 Prius Сэлбэг Засвар",phone:"8911-2722",phone2:"9444-4444",
address:"УБ хот, Энх тайваны өргөн чөлөө",
facebook:"https://www.facebook.com/444.prius.selbeg",
instagram:"https://www.instagram.com/444.prius.selbeg",
tiktok:"https://www.tiktok.com/@444prius",
youtube:"https://www.youtube.com/@444prius"};

const SOCIALS=[
  {key:"facebook",label:"Facebook",Icon:FBIcon,url:BIZ.facebook,color:"text-blue-600",bg:"bg-blue-600",followers:"2.4K"},
  {key:"instagram",label:"Instagram",Icon:IGIcon,url:BIZ.instagram,color:"text-pink-600",bg:"bg-gradient-to-r from-purple-600 to-pink-500",followers:"1.8K"},
  {key:"tiktok",label:"TikTok",Icon:TKIcon,url:BIZ.tiktok,color:"text-black dark:text-white",bg:"bg-black",followers:"3.1K"},
  {key:"youtube",label:"YouTube",Icon:YTIcon,url:BIZ.youtube,color:"text-red-600",bg:"bg-red-600",followers:"890"},
];

const models=["Prius 10/11","Prius 20","Prius 30","Prius 40/41","Aqua"];
const partCats=["Мотор","Батерей","Явах эд анги","Гадна детал","Цахилгаан","Тос/Шингэн"];
const LOW_STOCK_THRESHOLD = 3;

const initProducts=[
  {id:1,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:850000,model:"Prius 20",cat:"Батерей",rating:4.9,stock:2,cond:"used",img:"🔋",desc:{mn:"Япон задаргааны hybrid батерей",en:"Japanese hybrid battery"}},
  {id:2,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:950000,model:"Prius 30",cat:"Батерей",rating:4.8,stock:3,cond:"used",img:"🔋",desc:{mn:"Prius 30 hybrid батерей",en:"Prius 30 hybrid battery"}},
  {id:3,name:{mn:"Инвертор",en:"Inverter"},price:450000,model:"Prius 20",cat:"Цахилгаан",rating:4.7,stock:4,cond:"used",img:"⚡",desc:{mn:"Инвертор, баталгаа 6 сар",en:"Inverter, 6mo warranty"}},
  {id:4,name:{mn:"Урд гупер",en:"Front Bumper"},price:120000,model:"Prius 20",cat:"Гадна детал",rating:4.5,stock:8,cond:"used",img:"🚗",desc:{mn:"Урд гупер, өнгө сонголттой",en:"Front bumper, color options"}},
  {id:5,name:{mn:"Хойд гупер",en:"Rear Bumper"},price:110000,model:"Prius 30",cat:"Гадна детал",rating:4.4,stock:1,cond:"used",img:"🚗",desc:{mn:"Хойд гупер",en:"Rear bumper"}},
  {id:6,name:{mn:"Рулын аппарат",en:"Steering Rack"},price:280000,model:"Prius 10/11",cat:"Явах эд анги",rating:4.6,stock:3,cond:"used",img:"🔧",desc:{mn:"Рулын аппарат засварласан",en:"Repaired steering rack"}},
  {id:7,name:{mn:"Амортизатор урд",en:"Front Shocks"},price:65000,model:"Prius 20",cat:"Явах эд анги",rating:4.3,stock:12,cond:"new",img:"🔩",desc:{mn:"Шинэ амортизатор, хос",en:"New shock absorbers, pair"}},
  {id:8,name:{mn:"Мотор 1NZ-FXE",en:"Engine 1NZ-FXE"},price:1200000,model:"Prius 20",cat:"Мотор",rating:4.9,stock:2,cond:"used",img:"⚙️",desc:{mn:"Япон мотор, 80,000км",en:"Japanese engine, 80K km"}},
  {id:9,name:{mn:"Мотор 2ZR-FXE",en:"Engine 2ZR-FXE"},price:1500000,model:"Prius 30",cat:"Мотор",rating:4.8,stock:1,cond:"used",img:"⚙️",desc:{mn:"Prius 30 мотор",en:"Prius 30 engine"}},
  {id:10,name:{mn:"Агаар шүүгч",en:"Air Filter"},price:15000,model:"Prius 20",cat:"Тос/Шингэн",rating:4.2,stock:30,cond:"new",img:"💨",desc:{mn:"Шинэ агаар шүүгч",en:"New air filter"}},
  {id:11,name:{mn:"Тоормосны наклад",en:"Brake Pads"},price:45000,model:"Prius 30",cat:"Явах эд анги",rating:4.5,stock:20,cond:"new",img:"🛞",desc:{mn:"Шинэ тоормосны наклад",en:"New brake pads"}},
  {id:12,name:{mn:"Толь хажуу",en:"Side Mirror"},price:55000,model:"Prius 20",cat:"Гадна детал",rating:4.3,stock:10,cond:"used",img:"🪞",desc:{mn:"Хажуу толь, цахилгаан",en:"Electric side mirror"}},
  {id:13,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:750000,model:"Aqua",cat:"Батерей",rating:4.7,stock:2,cond:"used",img:"🔋",desc:{mn:"Aqua hybrid батерей",en:"Aqua hybrid battery"}},
  {id:14,name:{mn:"Урд фара LED",en:"LED Headlight"},price:85000,model:"Prius 30",cat:"Цахилгаан",rating:4.4,stock:6,cond:"used",img:"💡",desc:{mn:"Урд фара LED",en:"LED headlight"}},
  {id:15,name:{mn:"Мотор масло 5W-30",en:"Engine Oil 5W-30"},price:35000,model:"Prius 20",cat:"Тос/Шингэн",rating:4.6,stock:50,cond:"new",img:"🛢️",desc:{mn:"Toyota genuine 4л",en:"Toyota genuine 4L"}},
  {id:16,name:{mn:"Хаалга урд",en:"Front Door"},price:180000,model:"Prius 40/41",cat:"Гадна детал",rating:4.5,stock:2,cond:"used",img:"🚪",desc:{mn:"Prius 40 хаалга",en:"Prius 40 door"}},
];

const svcList=[
  {icon:Cpu,key:"computerDiag",price:"30,000₮~"},{icon:Battery,key:"batteryService",price:"50,000₮~"},
  {icon:Wrench,key:"engineRepair",price:"Үнэ тохирно"},{icon:Car,key:"suspensionRepair",price:"40,000₮~"},
  {icon:Filter,key:"acService",price:"25,000₮~"},{icon:Package,key:"oilChange",price:"15,000₮~"},
  {icon:Truck,key:"callout",price:"20,000₮~"},{icon:Shield,key:"bodyRepair",price:"Үнэ тохирно"},
];

const mockOrders=[
  {id:"ORD-001",customer:"Батбаяр",phone:"9911-2233",items:2,total:900000,status:"new",date:"2026-02-25",pay:"qpay"},
  {id:"ORD-002",customer:"Ганбаатар",phone:"8800-1122",items:1,total:1200000,status:"processing",date:"2026-02-24",pay:"bank"},
  {id:"ORD-003",customer:"Сарангэрэл",phone:"9900-3344",items:3,total:245000,status:"delivered",date:"2026-02-23",pay:"cash"},
];

/* ==================== SCHEDULED POSTS MOCK ==================== */
const initScheduledPosts=[
  {id:1,product:1,time:"09:00",status:"posted",platforms:["facebook","instagram"],date:"2026-02-27"},
  {id:2,product:8,time:"13:00",status:"scheduled",platforms:["facebook","tiktok"],date:"2026-02-27"},
  {id:3,product:2,time:"18:00",status:"pending",platforms:["facebook","instagram","tiktok","youtube"],date:"2026-02-27"},
  {id:4,product:13,time:"09:00",status:"pending",platforms:["facebook","instagram"],date:"2026-02-28"},
];

/* ==================== CART REDUCER ==================== */
function cartR(s,a){switch(a.type){
case"ADD":{const e=s.find(i=>i.id===a.p.id);return e?s.map(i=>i.id===a.p.id?{...i,qty:i.qty+a.q}:i):[...s,{...a.p,qty:a.q}];}
case"REMOVE":return s.filter((_,i)=>i!==a.i);case"INC":return s.map((x,i)=>i===a.i?{...x,qty:x.qty+1}:x);
case"DEC":return s.map((x,i)=>i===a.i?{...x,qty:Math.max(1,x.qty-1)}:x);case"CLEAR":return[];default:return s;}}

/* ==================== MAIN ==================== */
export default function PriusShop(){
  const[dark,setDark]=useState(false);const[lang,setLang]=useState("mn");const[page,setPage]=useState("home");
  const[mobileMenu,setMobileMenu]=useState(false);const[showCart,setShowCart]=useState(false);
  const[showAuth,setShowAuth]=useState(false);const[showProductModal,setShowProductModal]=useState(null);
  const[cart,dc]=useReducer(cartR,[]);const[wishIds,setWishIds]=useState([]);const[toasts,setToasts]=useState([]);
  const[products]=useState(initProducts);const[searchQ,setSearchQ]=useState("");
  const[selModel,setSelModel]=useState(null);const[selCat,setSelCat]=useState(null);const[sortBy,setSortBy]=useState("default");
  const[user,setUser]=useState(null);const[adminView,setAdminView]=useState(false);const[adminTab,setAdminTab]=useState("overview");
  const[orders,setOrders]=useState(mockOrders);const[checkoutStep,setCheckoutStep]=useState(0);
  const[showCheckout,setShowCheckout]=useState(false);const[payMethod,setPayMethod]=useState("qpay");
  const[modalQty,setModalQty]=useState(1);const[checkoutForm,setCheckoutForm]=useState({name:"",phone:"",address:""});
  // New: Social & Scheduler
  const[schedulerOn,setSchedulerOn]=useState(true);
  const[scheduledPosts,setScheduledPosts]=useState(initScheduledPosts);
  const[stockAlerts]=useState(products.filter(p=>p.stock<=LOW_STOCK_THRESHOLD&&p.stock>0));
  const[showShareModal,setShowShareModal]=useState(null);
  const[notifications,setNotifications]=useState(
    products.filter(p=>p.stock<=LOW_STOCK_THRESHOLD).map((p,i)=>({id:i,product:p,read:false,time:"Өнөөдөр"}))
  );
  const[showNotifs,setShowNotifs]=useState(false);

  const t=T[lang];const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const fmt=p=>`₮${p.toLocaleString()}`;
  const unreadCount=notifications.filter(n=>!n.read).length;

  useEffect(()=>{document.title=t.brand;
    // Load Google Fonts for Shield Logo
    if(!document.getElementById('shield-fonts')){
      const link=document.createElement('link');link.id='shield-fonts';link.rel='stylesheet';
      link.href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  },[t.brand]);
  const addToast=useCallback(m=>{const id=Date.now();setToasts(p=>[...p,{id,m}]);setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),2500);},[]);
  const navTo=p=>{setPage(p);setShowCheckout(false);setMobileMenu(false);window.scrollTo(0,0);};

  const filtered=products.filter(p=>{const n=lang==="mn"?p.name.mn:p.name.en;
    return n.toLowerCase().includes(searchQ.toLowerCase())&&(!selModel||p.model===selModel)&&(!selCat||p.cat===selCat);
  }).sort((a,b)=>{if(sortBy==="priceLow")return a.price-b.price;if(sortBy==="priceHigh")return b.price-a.price;
    if(sortBy==="rating")return b.rating-a.rating;if(sortBy==="name")return(lang==="mn"?a.name.mn:a.name.en).localeCompare(lang==="mn"?b.name.mn:b.name.en);return 0;});

  const bg=dark?"bg-gray-900":"bg-gray-50",tx=dark?"text-gray-100":"text-gray-900",txS=dark?"text-gray-400":"text-gray-500";
  const cd=dark?"bg-gray-800":"bg-white",bd=dark?"border-gray-700":"border-gray-200";
  const inp=dark?"bg-gray-700 text-gray-100 border-gray-600":"bg-white text-gray-900 border-gray-300";
  const hdr=dark?"bg-gray-800/95 backdrop-blur":"bg-white/95 backdrop-blur";
  const aL=dark?"bg-amber-500/20":"bg-amber-50";

  // Share URL generator
  const getShareUrl=(product,platform)=>{
    const text=`${lang==="mn"?product.name.mn:product.name.en} - ${fmt(product.price)} | 444 Prius Сэлбэг | ☎️ ${BIZ.phone}`;
    const url=BIZ.facebook;
    if(platform==="facebook")return`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    if(platform==="instagram")return BIZ.instagram;
    if(platform==="tiktok")return BIZ.tiktok;
    return url;
  };

  /* ===== SHARE MODAL ===== */
  const ShareModal=({product,onClose})=>(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50"/>
      <div className={`relative ${cd} rounded-2xl p-6 w-full max-w-sm shadow-2xl`} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3"><X size={18}/></button>
        <h3 className="font-bold text-lg mb-4">{t.shareToSocial}</h3>
        <div className={`p-3 rounded-xl ${aL} mb-4`}>
          <p className="text-3xl text-center mb-2">{product.img}</p>
          <p className="font-medium text-sm text-center">{lang==="mn"?product.name.mn:product.name.en}</p>
          <p className="text-amber-500 font-bold text-center">{fmt(product.price)}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SOCIALS.map(s=>(
            <a key={s.key} href={getShareUrl(product,s.key)} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-white font-medium text-sm ${s.bg}`}>
              <s.Icon size={18} className="text-white"/>{s.label}
            </a>
          ))}
        </div>
        <button onClick={()=>{navigator.clipboard?.writeText(`${lang==="mn"?product.name.mn:product.name.en} - ${fmt(product.price)} | ☎️ ${BIZ.phone}`);addToast("Copied!");onClose();}}
          className={`w-full mt-3 py-2.5 rounded-xl border ${bd} flex items-center justify-center gap-2 text-sm font-medium`}><Copy size={16}/>Copy Link</button>
      </div>
    </div>
  );

  /* ===== NOTIFICATIONS DROPDOWN ===== */
  const NotifsDropdown=()=>(
    <div className={`absolute right-0 top-full mt-2 w-80 ${cd} rounded-xl shadow-2xl border ${bd} z-50 max-h-96 overflow-y-auto`}>
      <div className={`p-3 border-b ${bd} flex justify-between items-center`}>
        <h4 className="font-bold text-sm">{t.stockAlerts}</h4>
        <button onClick={()=>setNotifications(p=>p.map(n=>({...n,read:true})))} className="text-xs text-amber-500">{t.clearFilters}</button>
      </div>
      {notifications.length===0?<p className={`p-4 text-sm ${txS} text-center`}>Мэдэгдэл байхгүй</p>
      :notifications.map(n=>(
        <div key={n.id} className={`p-3 border-b ${bd} flex gap-3 ${!n.read?aL:""}`} onClick={()=>setNotifications(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}>
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5"/>
          <div>
            <p className="text-sm font-medium">{n.product.img} {lang==="mn"?n.product.name.mn:n.product.name.en}</p>
            <p className="text-xs text-red-500 font-medium">{n.product.stock} {t.onlyLeft}! ({n.product.model})</p>
            <p className={`text-xs ${txS}`}>{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );

  /* ===== LOW STOCK BADGE ON PRODUCT ===== */
  const StockBadge=({stock})=>{
    if(stock===0)return<span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">{t.outOfStock}</span>;
    if(stock<=LOW_STOCK_THRESHOLD)return<span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">{t.lowStock} {stock}{t.onlyLeft}</span>;
    return null;
  };

  /* ==================== ADMIN ==================== */
  if(adminView&&user?.isAdmin)return(
    <div className={`min-h-screen ${bg} ${tx} transition-colors duration-300`}>
      <header className={`${hdr} border-b ${bd} px-4 py-3 flex items-center justify-between sticky top-0 z-40`}>
        <div className="flex items-center gap-2"><ShieldLogo size={22} showText={false} dark={dark}/><span className="font-bold text-amber-500">444</span><span className={`text-sm px-2 py-0.5 rounded ${aL} text-amber-500`}>{t.admin}</span></div>
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="relative">
            <button onClick={()=>setShowNotifs(!showNotifs)} className={`p-2 rounded-lg ${cd} relative`}>
              <Bell size={16}/>{unreadCount>0&&<span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{unreadCount}</span>}
            </button>
            {showNotifs&&<NotifsDropdown/>}
          </div>
          <button onClick={()=>setDark(!dark)} className={`p-2 rounded-lg ${cd}`}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button>
          <button onClick={()=>setLang(lang==="mn"?"en":"mn")} className={`px-2 py-1 rounded text-xs ${cd}`}>{lang==="mn"?"EN":"MN"}</button>
          <button onClick={()=>setAdminView(false)} className="px-3 py-1.5 rounded-lg text-sm bg-amber-500 text-white">{t.backToShop}</button>
        </div>
      </header>
      <div className="flex">
        <aside className={`w-52 min-h-screen ${cd} border-r ${bd} p-3 hidden md:block`}>
          {[["overview",BarChart3,t.overview],["social",Globe,t.socialDashboard],["scheduler",Timer,t.scheduler],["products",Package,t.productMgmt],["orders",ClipboardList,t.orderMgmt],["alerts",AlertTriangle,t.stockAlerts],["settings",Settings,t.settings]].map(([k,I,l])=>(
            <button key={k} onClick={()=>setAdminTab(k)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-left text-sm transition ${adminTab===k?`${aL} text-amber-500 font-medium`:txS}`}>
              <I size={17}/>{l}
              {k==="alerts"&&stockAlerts.length>0&&<span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{stockAlerts.length}</span>}
            </button>
          ))}
        </aside>
        {/* Mobile admin tabs */}
        <div className={`md:hidden flex overflow-x-auto border-b ${bd} ${cd} w-full`}>
          {[["overview",t.overview],["social","Social"],["scheduler",t.scheduler],["products",t.productMgmt],["orders",t.orderMgmt],["alerts","⚠️"],["settings","⚙️"]].map(([k,l])=>(
            <button key={k} onClick={()=>setAdminTab(k)} className={`px-4 py-3 text-xs whitespace-nowrap ${adminTab===k?"text-amber-500 font-medium border-b-2 border-amber-500":txS}`}>{l}</button>
          ))}
        </div>
        <main className="flex-1 p-4 md:p-6">
          {/* Overview */}
          {adminTab==="overview"&&<div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[[t.totalProducts,products.length,Package,"text-blue-500"],[t.totalOrders,orders.length,ClipboardList,"text-green-500"],[t.totalRevenue,fmt(orders.reduce((s,o)=>s+o.total,0)),TrendingUp,"text-amber-500"],[t.stockAlerts,stockAlerts.length,AlertTriangle,"text-red-500"]].map(([l,v,I,c],i)=>(
                <div key={i} className={`${cd} rounded-xl p-5 border ${bd}`}><div className="flex justify-between mb-2"><span className={`text-sm ${txS}`}>{l}</span><I size={18} className={c}/></div><div className="text-2xl font-bold">{v}</div></div>
              ))}
            </div>
            {/* Low stock warnings */}
            {stockAlerts.length>0&&<div className={`${cd} rounded-xl border border-orange-300 p-4 mb-6`}>
              <h3 className="font-bold text-sm text-orange-500 flex items-center gap-2 mb-3"><AlertTriangle size={16}/>{t.stockWarning}</h3>
              <div className="space-y-2">{stockAlerts.map(p=>(
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span>{p.img} {lang==="mn"?p.name.mn:p.name.en} <span className={txS}>({p.model})</span></span>
                  <span className="text-red-500 font-bold">{p.stock} {t.onlyLeft}</span>
                </div>
              ))}</div>
            </div>}
          </div>}

          {/* Social Dashboard */}
          {adminTab==="social"&&<div>
            <h3 className="font-bold text-lg mb-4">{t.connectedAccounts}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {SOCIALS.map(s=>(
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`${cd} rounded-xl p-5 border ${bd} hover:shadow-lg transition`}>
                  <div className="flex items-center gap-3 mb-3"><s.Icon size={24} className={s.color}/><span className="font-bold text-sm">{s.label}</span></div>
                  <p className="text-2xl font-bold">{s.followers}</p>
                  <p className={`text-xs ${txS}`}>{t.followers}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-500 text-xs"><TrendingUp size={12}/>+12%</div>
                </a>
              ))}
            </div>
            <h3 className="font-bold text-lg mb-4">{t.autoPost}</h3>
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div><p className="font-medium">{t.postSchedule}</p><p className={`text-sm ${txS}`}>{t.autoPostDesc}</p></div>
                <button onClick={()=>setSchedulerOn(!schedulerOn)} className={`px-4 py-2 rounded-full text-sm font-medium ${schedulerOn?"bg-green-500 text-white":"bg-gray-300 text-gray-600"}`}>
                  {schedulerOn?<><Play size={14} className="inline mr-1"/>{t.schedulerOn}</>:<><Pause size={14} className="inline mr-1"/>{t.schedulerOff}</>}
                </button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                {["09:00","13:00","18:00"].map(time=>(
                  <div key={time} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${aL}`}><Timer size={16} className="text-amber-500"/><span className="font-mono font-bold">{time}</span></div>
                ))}
              </div>
              <p className={`text-sm ${txS}`}>{t.dailyPosts}: {t.postTimes}</p>
            </div>
          </div>}

          {/* Scheduler */}
          {adminTab==="scheduler"&&<div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{t.postSchedule}</h3>
              <button className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium flex items-center gap-2"><Plus size={16}/>{t.generatePost}</button>
            </div>
            <div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
              <table className="w-full text-sm"><thead className={dark?"bg-gray-700":"bg-gray-50"}>
                <tr>{[t.date,"⏰",t.productMgmt,"Platforms",t.status].map(h=><th key={h} className="px-4 py-3 text-left font-medium">{h}</th>)}</tr>
              </thead><tbody>{scheduledPosts.map(sp=>{const prod=products.find(p=>p.id===sp.product);return(
                <tr key={sp.id} className={`border-t ${bd}`}>
                  <td className="px-4 py-3 font-mono text-xs">{sp.date}</td>
                  <td className="px-4 py-3 font-mono font-bold">{sp.time}</td>
                  <td className="px-4 py-3">{prod?.img} {lang==="mn"?prod?.name.mn:prod?.name.en} <span className={txS}>({prod?.model})</span></td>
                  <td className="px-4 py-3"><div className="flex gap-1">{sp.platforms.map(p=>{const s=SOCIALS.find(x=>x.key===p);return s?<s.Icon key={p} size={16} className={s.color}/>:null;})}</div></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sp.status==="posted"?"bg-green-100 text-green-700":sp.status==="scheduled"?"bg-blue-100 text-blue-700":"bg-yellow-100 text-yellow-700"}`}>
                    {sp.status==="posted"?t.posted:sp.status==="scheduled"?t.scheduled:t.pending}</span></td>
                </tr>
              );})}</tbody></table>
            </div>
          </div>}

          {/* Products */}
          {adminTab==="products"&&<div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
            <table className="w-full text-sm"><thead className={dark?"bg-gray-700":"bg-gray-50"}>
              <tr>{[t.name,t.price,"Stock",t.status].map(h=><th key={h} className="px-4 py-3 text-left font-medium">{h}</th>)}</tr>
            </thead><tbody>{products.map(p=>(
              <tr key={p.id} className={`border-t ${bd} ${p.stock<=LOW_STOCK_THRESHOLD?"bg-red-50 dark:bg-red-900/20":""}`}>
                <td className="px-4 py-3 font-medium">{p.img} {lang==="mn"?p.name.mn:p.name.en} <span className={`text-xs ${txS}`}>({p.model})</span></td>
                <td className="px-4 py-3">{fmt(p.price)}</td>
                <td className="px-4 py-3">{p.stock<=LOW_STOCK_THRESHOLD&&p.stock>0?<span className="text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={14}/>{p.stock}</span>:p.stock===0?<span className="text-red-500">{t.outOfStock}</span>:p.stock}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${p.cond==="new"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`}>{p.cond==="new"?t.new:t.used}</span></td>
              </tr>
            ))}</tbody></table>
          </div>}

          {/* Orders */}
          {adminTab==="orders"&&<div className={`${cd} rounded-xl border ${bd} overflow-x-auto`}>
            <table className="w-full text-sm"><thead className={dark?"bg-gray-700":"bg-gray-50"}>
              <tr>{["ID",t.customer,t.total,t.paymentMethod,t.status].map(h=><th key={h} className="px-3 py-3 text-left font-medium">{h}</th>)}</tr>
            </thead><tbody>{orders.map((o,i)=>(
              <tr key={o.id} className={`border-t ${bd}`}>
                <td className="px-3 py-3 font-mono text-xs">{o.id}</td><td className="px-3 py-3">{o.customer}</td>
                <td className="px-3 py-3">{fmt(o.total)}</td>
                <td className="px-3 py-3 text-xs">{o.pay==="qpay"?"QPay":o.pay==="bank"?"Банк":"Бэлэн"}</td>
                <td className="px-3 py-3"><select value={o.status} onChange={e=>setOrders(p=>p.map((x,j)=>j===i?{...x,status:e.target.value}:x))} className={`text-xs px-2 py-1 rounded ${inp}`}>
                  <option value="new">{t.orderNew}</option><option value="processing">{t.orderProcessing}</option><option value="delivered">{t.orderDelivered}</option>
                </select></td>
              </tr>
            ))}</tbody></table>
          </div>}

          {/* Stock Alerts */}
          {adminTab==="alerts"&&<div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-orange-500" size={20}/>{t.stockAlerts}</h3>
            <div className={`${cd} rounded-xl border ${bd} p-4 mb-4`}>
              <p className={`text-sm ${txS} mb-2`}>{t.alertThreshold}: <span className="font-bold text-red-500">{LOW_STOCK_THRESHOLD}</span></p>
              <p className={`text-sm ${txS}`}>{lang==="mn"?"Нөөц 3-с бага болоход автоматаар мэдэгдэл илгээнэ":"Auto-notify when stock drops below 3"}</p>
            </div>
            <div className="space-y-3">
              {products.filter(p=>p.stock<=LOW_STOCK_THRESHOLD).map(p=>(
                <div key={p.id} className={`${cd} rounded-xl border ${p.stock===0?"border-red-400":"border-orange-300"} p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.img}</span>
                    <div>
                      <p className="font-medium">{lang==="mn"?p.name.mn:p.name.en}</p>
                      <p className={`text-xs ${txS}`}>{p.model} | {fmt(p.price)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${p.stock===0?"text-red-500":"text-orange-500"}`}>{p.stock}</p>
                    <p className={`text-xs ${p.stock===0?"text-red-500":"text-orange-500"}`}>{p.stock===0?t.outOfStock:t.lowStock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>}

          {/* Settings */}
          {adminTab==="settings"&&<div className="space-y-4 max-w-lg">
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-3">{t.settings}</h3>
              <div className="space-y-2 text-sm">
                <p><span className={txS}>{t.phone}:</span> <strong>{BIZ.phone}, {BIZ.phone2}</strong></p>
                <p><span className={txS}>{t.address}:</span> <strong>{BIZ.address}</strong></p>
              </div>
            </div>
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-3">{t.connectedAccounts}</h3>
              <div className="space-y-2">{SOCIALS.map(s=>(
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm">
                  <s.Icon size={20} className={s.color}/><span className="font-medium">{s.label}</span>
                  <span className="ml-auto text-green-500 text-xs flex items-center gap-1"><Check size={12}/>Connected</span>
                </a>
              ))}</div>
            </div>
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-3">{t.notifSettings}</h3>
              <label className="flex items-center justify-between py-2"><span className="text-sm">{t.emailNotif}</span><div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"/></div></label>
              <label className="flex items-center justify-between py-2"><span className="text-sm">{t.smsNotif}</span><div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"/></div></label>
            </div>
          </div>}
        </main>
      </div>
    </div>
  );

  /* ==================== STORE ==================== */
  return(
    <div className={`min-h-screen ${bg} ${tx} transition-colors duration-300`}>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">{toasts.map(t=><div key={t.id} className="bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2"><Check size={14}/>{t.m}</div>)}</div>

      {/* Share Modal */}
      {showShareModal&&<ShareModal product={showShareModal} onClose={()=>setShowShareModal(null)}/>}

      {/* HEADER */}
      <header className={`${hdr} border-b ${bd} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={()=>navTo("home")} className="flex items-center gap-2 flex-shrink-0">
            <ShieldLogo size={28} showText={true} textSize="sm" dark={dark}/>
          </button>
          <nav className="hidden md:flex items-center gap-5">
            {[["home",t.home],["parts",t.parts],["services",t.services],["gallery",t.gallery],["contact",t.contact]].map(([k,l])=>(
              <button key={k} onClick={()=>navTo(k)} className={`text-sm font-medium transition ${page===k?"text-amber-500":txS}`}>{l}</button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-full ${inp}`}>
              <Search size={15} className={txS}/><input className="bg-transparent outline-none text-sm w-full" placeholder={t.search} value={searchQ} onChange={e=>{setSearchQ(e.target.value);setPage("parts");}}/>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Social links in header */}
            <div className="hidden lg:flex gap-1">
              {SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded ${s.color} opacity-60 hover:opacity-100 transition`}><s.Icon size={16}/></a>)}
            </div>
            <button onClick={()=>setDark(!dark)} className={`p-2 rounded-lg ${dark?"hover:bg-gray-700":"hover:bg-gray-100"}`}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>
            <button onClick={()=>setLang(lang==="mn"?"en":"mn")} className={`px-2 py-1 rounded text-xs font-medium ${aL} text-amber-500`}>{lang==="mn"?"EN":"MN"}</button>
            <button onClick={()=>setShowCart(true)} className="p-2 rounded-lg relative"><ShoppingCart size={18}/>{cartCount>0&&<span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}</button>
            {user?<>{user.isAdmin&&<button onClick={()=>setAdminView(true)} className="px-2 py-1 rounded text-xs bg-amber-500 text-white">{t.admin}</button>}<button onClick={()=>setUser(null)} className={txS}><LogOut size={17}/></button></>
            :<button onClick={()=>setShowAuth(true)} className="hidden md:block px-3 py-1.5 rounded-lg text-sm bg-amber-500 text-white">{t.login}</button>}
            <button onClick={()=>setMobileMenu(true)} className="md:hidden p-2"><Menu size={20}/></button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenu&&<div className="fixed inset-0 z-50" onClick={()=>setMobileMenu(false)}><div className="absolute inset-0 bg-black/50"/>
        <div className={`absolute right-0 top-0 bottom-0 w-72 ${cd} p-5 shadow-2xl`} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setMobileMenu(false)} className="absolute top-4 right-4"><X size={20}/></button>
          <div className="mt-10 space-y-2">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${inp}`}><Search size={15}/><input className="bg-transparent outline-none text-sm w-full" placeholder={t.search} value={searchQ} onChange={e=>{setSearchQ(e.target.value);navTo("parts");}}/></div>
            {[["home",t.home],["parts",t.parts],["services",t.services],["gallery",t.gallery],["contact",t.contact]].map(([k,l])=>(
              <button key={k} onClick={()=>navTo(k)} className={`block w-full text-left py-2 px-3 rounded-lg font-medium ${page===k?`${aL} text-amber-500`:""}`}>{l}</button>))}
            <hr className={bd}/>
            {/* Social links mobile */}
            <div className="flex gap-2">{SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`flex-1 py-2 rounded-lg text-center text-white text-xs ${s.bg}`}><s.Icon size={16} className="mx-auto text-white"/></a>)}</div>
            <a href={`tel:${BIZ.phone}`} className="flex items-center gap-2 py-2 px-3 rounded-lg bg-green-50 text-green-600 font-medium"><Phone size={18}/>{BIZ.phone}</a>
            {!user&&<button onClick={()=>{setShowAuth(true);setMobileMenu(false);}} className="w-full py-2 rounded-lg bg-amber-500 text-white font-medium">{t.login}</button>}
          </div>
        </div>
      </div>}

      {/* CART */}
      {showCart&&<div className="fixed inset-0 z-50" onClick={()=>setShowCart(false)}><div className="absolute inset-0 bg-black/50"/>
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-sm ${cd} shadow-2xl flex flex-col`} onClick={e=>e.stopPropagation()}>
          <div className={`flex items-center justify-between p-4 border-b ${bd}`}><h3 className="font-bold text-lg">{t.yourCart} ({cartCount})</h3><button onClick={()=>setShowCart(false)}><X size={20}/></button></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length===0?<div className={`text-center py-12 ${txS}`}><ShoppingCart size={48} className="mx-auto mb-3 opacity-30"/><p>{t.cartEmpty}</p></div>
            :cart.map((item,i)=><div key={i} className={`flex gap-3 p-3 rounded-xl border ${bd}`}>
              <div className={`w-14 h-14 rounded-lg ${aL} flex items-center justify-center text-2xl flex-shrink-0`}>{item.img}</div>
              <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{lang==="mn"?item.name.mn:item.name.en}</p><p className={`text-xs ${txS}`}>{item.model}</p><p className="font-bold text-sm text-amber-500">{fmt(item.price)}</p>
                <div className="flex items-center gap-2 mt-1"><button onClick={()=>dc({type:"DEC",i})} className={`w-6 h-6 rounded flex items-center justify-center border ${bd}`}><Minus size={12}/></button><span className="text-sm w-6 text-center">{item.qty}</span><button onClick={()=>dc({type:"INC",i})} className={`w-6 h-6 rounded flex items-center justify-center border ${bd}`}><Plus size={12}/></button><button onClick={()=>{dc({type:"REMOVE",i});addToast(t.removedFromCart);}} className="ml-auto text-red-500"><Trash2 size={14}/></button></div>
              </div></div>)}
          </div>
          {cart.length>0&&<div className={`p-4 border-t ${bd}`}><div className="flex justify-between mb-3 font-bold">{t.total}<span className="text-amber-500">{fmt(cartTotal)}</span></div>
            <button onClick={()=>{setShowCart(false);setShowCheckout(true);setCheckoutStep(0);}} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.placeOrder}</button></div>}
        </div>
      </div>}

      {/* AUTH */}
      {showAuth&&<div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setShowAuth(false)}><div className="absolute inset-0 bg-black/50"/>
        <div className={`relative ${cd} rounded-2xl p-6 w-full max-w-sm shadow-2xl`} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setShowAuth(false)} className="absolute top-3 right-3"><X size={18}/></button>
          <h3 className="text-xl font-bold mb-4 text-amber-500">{t.login}</h3>
          <input className={`w-full px-3 py-2 rounded-lg border mb-3 ${inp}`} placeholder={t.email} id="ae"/>
          <input className={`w-full px-3 py-2 rounded-lg border mb-4 ${inp}`} placeholder={t.password} type="password" id="ap"/>
          <button onClick={()=>{const e=document.getElementById("ae")?.value,p=document.getElementById("ap")?.value;if(e==="admin@shop.mn"&&p==="admin123")setUser({name:"Admin",isAdmin:true});else if(e)setUser({name:e.split("@")[0],isAdmin:false});setShowAuth(false);}} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.login}</button>
          <p className={`text-xs mt-3 ${txS} text-center`}>Админ: admin@shop.mn / admin123</p>
        </div>
      </div>}

      {/* PRODUCT MODAL */}
      {showProductModal&&<div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setShowProductModal(null)}><div className="absolute inset-0 bg-black/50"/>
        <div className={`relative ${cd} rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto`} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setShowProductModal(null)} className="absolute top-3 right-3"><X size={18}/></button>
          <div className={`w-full aspect-video rounded-xl ${aL} flex items-center justify-center text-6xl mb-4 relative`}>{showProductModal.img}
            {showProductModal.stock<=LOW_STOCK_THRESHOLD&&showProductModal.stock>0&&<div className="absolute top-2 left-2"><StockBadge stock={showProductModal.stock}/></div>}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${showProductModal.cond==="new"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"}`}>{showProductModal.cond==="new"?t.new:t.used}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${aL} text-amber-500`}>{showProductModal.model}</span>
          </div>
          <h3 className="text-xl font-bold mb-1">{lang==="mn"?showProductModal.name.mn:showProductModal.name.en}</h3>
          <p className="text-2xl font-bold text-amber-500 mb-2">{fmt(showProductModal.price)}</p>
          <div className="flex items-center gap-1 mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} size={16} className={i<Math.floor(showProductModal.rating)?"text-yellow-400 fill-yellow-400":txS}/>)}</div>
          <p className={`mb-4 ${txS}`}>{lang==="mn"?showProductModal.desc.mn:showProductModal.desc.en}</p>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm ${txS}`}>{t.quantity}</span>
            <button onClick={()=>setModalQty(Math.max(1,modalQty-1))} className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bd}`}><Minus size={14}/></button>
            <span className="font-medium w-8 text-center">{modalQty}</span>
            <button onClick={()=>setModalQty(modalQty+1)} className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bd}`}><Plus size={14}/></button>
          </div>
          <p className={`text-sm mb-4 ${showProductModal.stock>0?"text-green-500":"text-red-500"}`}>{showProductModal.stock>0?`${t.inStock}: ${showProductModal.stock} ${t.items}`:t.outOfStock}</p>
          <div className="flex gap-2">
            <button disabled={showProductModal.stock===0} onClick={()=>{dc({type:"ADD",p:showProductModal,q:modalQty});addToast(t.addedToCart);setShowProductModal(null);setModalQty(1);}}
              className={`flex-1 py-3 rounded-xl text-white font-semibold ${showProductModal.stock>0?"bg-amber-500 hover:bg-amber-600":"bg-gray-400 cursor-not-allowed"}`}>{showProductModal.stock>0?t.addToCart:t.outOfStock}</button>
            <button onClick={()=>{setShowShareModal(showProductModal);setShowProductModal(null);}} className={`px-4 py-3 rounded-xl border ${bd}`}><Share2 size={18}/></button>
          </div>
        </div>
      </div>}

      {/* CHECKOUT */}
      {showCheckout?<div className="max-w-2xl mx-auto p-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-8">{[t.shipping,t.payment,t.review,t.confirmation].map((s,i)=>(
          <div key={i} className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i<=checkoutStep?"bg-amber-500 text-white":`border-2 ${bd} ${txS}`}`}>{i+1}</div>
            <span className={`text-xs hidden sm:inline ${i<=checkoutStep?"text-amber-500 font-medium":txS}`}>{s}</span>{i<3&&<ChevronRight size={16} className={txS}/>}</div>
        ))}</div>
        <div className={`${cd} rounded-2xl p-6 border ${bd}`}>
          {checkoutStep===0&&<div className="space-y-3"><h3 className="font-bold text-lg mb-4">{t.shipping}</h3>
            <input className={`w-full px-3 py-2 rounded-lg border ${inp}`} placeholder={t.name} value={checkoutForm.name} onChange={e=>setCheckoutForm({...checkoutForm,name:e.target.value})}/>
            <input className={`w-full px-3 py-2 rounded-lg border ${inp}`} placeholder={t.phone} value={checkoutForm.phone} onChange={e=>setCheckoutForm({...checkoutForm,phone:e.target.value})}/>
            <input className={`w-full px-3 py-2 rounded-lg border ${inp}`} placeholder={t.address} value={checkoutForm.address} onChange={e=>setCheckoutForm({...checkoutForm,address:e.target.value})}/>
            <button onClick={()=>setCheckoutStep(1)} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold mt-2">{t.next} →</button></div>}
          {checkoutStep===1&&<div className="space-y-4"><h3 className="font-bold text-lg mb-4">{t.paymentMethod}</h3>
            {[["qpay",QrCode,t.qpay,t.qpayDesc,"text-blue-500"],["bank",CreditCard,t.bankTransfer,`${t.bankName} | ${t.accountNo}`,"text-green-600"],["cash",Banknote,t.cash,t.cashDesc,"text-amber-600"],["installment",Calendar,t.installment,t.installmentDesc,"text-purple-600"]].map(([k,I,label,desc,clr])=>(
              <button key={k} onClick={()=>setPayMethod(k)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition ${payMethod===k?`border-amber-500 ${aL}`:`${bd}`}`}><I size={28} className={clr}/><div><p className="font-medium">{label}</p><p className={`text-xs ${txS}`}>{desc}</p></div>{payMethod===k&&<Check size={20} className="ml-auto text-amber-500"/>}</button>
            ))}<div className="flex gap-3 mt-2"><button onClick={()=>setCheckoutStep(0)} className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}>← {t.prev}</button><button onClick={()=>setCheckoutStep(2)} className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.next} →</button></div></div>}
          {checkoutStep===2&&<div><h3 className="font-bold text-lg mb-4">{t.review}</h3><div className="space-y-2 mb-4">{cart.map((item,i)=><div key={i} className={`flex justify-between py-2 border-b ${bd}`}><span className="text-sm">{item.img} {lang==="mn"?item.name.mn:item.name.en} x{item.qty}</span><span className="font-medium text-sm">{fmt(item.price*item.qty)}</span></div>)}</div>
            <div className={`flex justify-between py-2 border-t ${bd} font-bold text-lg`}>{t.total}<span className="text-amber-500">{fmt(cartTotal)}</span></div>
            <div className="flex gap-3 mt-4"><button onClick={()=>setCheckoutStep(1)} className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}>← {t.prev}</button><button onClick={()=>{setCheckoutStep(3);dc({type:"CLEAR"});}} className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.placeOrder}</button></div></div>}
          {checkoutStep===3&&<div className="text-center py-8"><div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-amber-500"/></div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">{t.orderSuccess}</h3><p className={txS}>{t.orderSuccessDesc}</p><p className={`mt-2 text-sm ${txS}`}>☎️ {BIZ.phone}</p>
            <button onClick={()=>{setShowCheckout(false);navTo("home");}} className="mt-6 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.backToShop}</button></div>}
        </div>
      </div>:<>

      {/* HERO */}
      {page==="home"&&<section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(255,255,255,0.03) 35px,rgba(255,255,255,0.03) 70px)"}}/></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-3"><ShieldLogo size={48} showText={true} textSize="lg" dark={true}/></div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 max-w-2xl">{t.heroTitle}</h1>
          <p className="text-lg opacity-80 mb-6 max-w-xl">{t.heroSub}</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={()=>navTo("parts")} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.shopNow} →</button>
            <button onClick={()=>navTo("services")} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold">{t.bookService}</button>
          </div>
          {/* Social follow buttons */}
          <div className="flex flex-wrap gap-2 mt-6">
            {SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-full ${s.bg} text-white text-sm font-medium hover:opacity-90 transition`}><s.Icon size={16} className="text-white"/>{s.label}<span className="opacity-70">{s.followers}</span></a>)}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">{models.map(m=><span key={m} className="px-3 py-1 rounded-full bg-white/10 text-sm">{m}</span>)}</div>
        </div>
      </section>}

      {/* WHY US */}
      {page==="home"&&<section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">{t.whyUs}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[[Award,t.warranty,"6 сар","text-green-500"],[Truck,t.fastService,"Дуудлагаар","text-blue-500"],[Shield,t.originalParts,"Япон ориг","text-amber-500"],[Wrench,t.experienced,"10+ жил","text-purple-500"]].map(([I,title,sub,clr],i)=>(
            <div key={i} className={`${cd} rounded-xl p-5 border ${bd} text-center`}><I size={32} className={`mx-auto mb-3 ${clr}`}/><h3 className="font-bold text-sm mb-1">{title}</h3><p className={`text-xs ${txS}`}>{sub}</p></div>
          ))}
        </div>
      </section>}

      {/* PRODUCTS */}
      {(page==="parts"||page==="home")&&<section className="max-w-7xl mx-auto px-4 py-8">
        {page==="home"&&<h2 className="text-2xl font-bold mb-6">{t.parts}</h2>}
        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={()=>setSelModel(null)} className={`px-3 py-1.5 rounded-full text-sm font-medium ${!selModel?"bg-amber-500 text-white":`border ${bd}`}`}>{t.allModels}</button>
          {models.map(m=><button key={m} onClick={()=>{setSelModel(m);setPage("parts");}} className={`px-3 py-1.5 rounded-full text-sm font-medium ${selModel===m?"bg-amber-500 text-white":`border ${bd}`}`}>{m}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex flex-wrap gap-1.5 flex-1">{partCats.map(c=><button key={c} onClick={()=>setSelCat(selCat===c?null:c)} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${selCat===c?`${aL} text-amber-600`:`border ${bd}`}`}>{c}</button>)}</div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className={`px-3 py-1.5 rounded-lg border text-sm ${inp}`}><option value="default">{t.sortBy}</option><option value="priceLow">{t.priceLow}</option><option value="priceHigh">{t.priceHigh}</option><option value="rating">{t.ratingHigh}</option><option value="name">{t.byName}</option></select>
        </div>
        {filtered.length===0?<div className={`text-center py-16 ${txS}`}><Car size={48} className="mx-auto mb-3 opacity-30"/><p className="mb-2">{t.noProducts}</p><button onClick={()=>{setSelModel(null);setSelCat(null);setSearchQ("");}} className="text-amber-500">{t.clearFilters}</button></div>
        :<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {(page==="home"?filtered.slice(0,8):filtered).map(p=>(
            <div key={p.id} className={`${cd} rounded-xl border ${bd} overflow-hidden group hover:shadow-lg transition-all`}>
              <div className={`relative aspect-square ${aL} flex items-center justify-center text-5xl cursor-pointer`} onClick={()=>{setShowProductModal(p);setModalQty(1);}}>
                {p.img}
                {p.stock===0&&<div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">{t.outOfStock}</span></div>}
                {p.stock>0&&p.stock<=LOW_STOCK_THRESHOLD&&<div className="absolute bottom-2 left-2"><span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded animate-pulse">{t.lowStock} {p.stock}{t.onlyLeft}</span></div>}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button onClick={e=>{e.stopPropagation();setWishIds(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id]);}} className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow"><Heart size={14} className={wishIds.includes(p.id)?"text-red-500 fill-red-500":"text-gray-400"}/></button>
                  <button onClick={e=>{e.stopPropagation();setShowShareModal(p);}} className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow"><Share2 size={14} className="text-gray-500"/></button>
                </div>
                <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${p.cond==="new"?"bg-green-500 text-white":"bg-blue-500 text-white"}`}>{p.cond==="new"?t.new:t.used}</span>
              </div>
              <div className="p-3"><p className={`text-xs ${txS} mb-0.5`}>{p.model}</p>
                <h3 className="font-medium text-sm mb-1 truncate">{lang==="mn"?p.name.mn:p.name.en}</h3>
                <div className="flex items-center gap-1 mb-1">{Array.from({length:5}).map((_,i)=><Star key={i} size={11} className={i<Math.floor(p.rating)?"text-yellow-400 fill-yellow-400":txS}/>)}</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-500">{fmt(p.price)}</span>
                  <button disabled={p.stock===0} onClick={()=>{dc({type:"ADD",p,q:1});addToast(t.addedToCart);}} className={`p-2 rounded-lg text-white ${p.stock>0?"bg-amber-500 hover:bg-amber-600":"bg-gray-300 cursor-not-allowed"}`}><Plus size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>}
        {page==="home"&&filtered.length>8&&<div className="text-center mt-6"><button onClick={()=>navTo("parts")} className="px-6 py-2 rounded-xl border border-amber-500 text-amber-500 font-medium">{t.shopNow} →</button></div>}
      </section>}

      {/* SERVICES */}
      {(page==="services"||page==="home")&&<section className={`${page==="home"?dark?"bg-gray-800":"bg-white":""} py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.ourServices}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{svcList.map((s,i)=>{const I=s.icon;return(<div key={i} className={`${cd} rounded-xl p-5 border ${bd} hover:shadow-lg transition text-center`}><I size={32} className="mx-auto mb-3 text-amber-500"/><h3 className="font-bold text-sm mb-1">{t[s.key]}</h3><p className={`text-xs ${txS}`}>{s.price}</p></div>);})}</div>
          {page==="services"&&<div className="text-center mt-8"><a href={`tel:${BIZ.phone}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold"><Phone size={18}/>{t.callUs}: {BIZ.phone}</a></div>}
        </div>
      </section>}

      {/* GALLERY */}
      {page==="gallery"&&<section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{t.gallery}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[{e:"🔋",c:"Hybrid батерей засвар"},{e:"⚙️",c:"Мотор 1NZ-FXE"},{e:"🚗",c:"Prius 30 урд гупер"},{e:"🔧",c:"Явах эд анги"},{e:"💡",c:"LED фара"},{e:"🛞",c:"Тоормосны систем"}].map((p,i)=>(
            <div key={i} className={`${cd} rounded-xl border ${bd} overflow-hidden`}><div className={`aspect-video ${aL} flex items-center justify-center text-6xl`}>{p.e}</div><p className="p-3 text-sm font-medium">{p.c}</p></div>
          ))}
        </div>
        <div className="text-center mt-6 flex flex-wrap justify-center gap-3">
          {SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium ${s.bg}`}><s.Icon size={18} className="text-white"/>{s.label}</a>)}
        </div>
      </section>}

      {/* CONTACT */}
      {page==="contact"&&<section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{t.contact}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`${cd} rounded-xl border ${bd} p-6 space-y-4`}>
            <div className="flex items-center gap-3"><Phone className="text-amber-500" size={20}/><div><p className={`text-xs ${txS}`}>{t.phone}</p><p className="font-bold">{BIZ.phone}</p><p className="font-bold">{BIZ.phone2}</p></div></div>
            <div className="flex items-center gap-3"><MapPin className="text-amber-500" size={20}/><div><p className={`text-xs ${txS}`}>{t.address}</p><p className="font-medium text-sm">{BIZ.address}</p></div></div>
            <div className="flex items-center gap-3"><Clock className="text-amber-500" size={20}/><div><p className={`text-xs ${txS}`}>{t.workHours}</p><p className="font-medium text-sm">{t.everyDay}</p><p className={`text-sm ${txS}`}>{t.sunday}</p></div></div>
            <div className="space-y-2 pt-2">{SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-sm ${s.color} hover:underline`}><s.Icon size={18} className={s.color}/>{s.label} — {s.followers} {t.followers??"дагагч"}</a>)}</div>
            <div className="flex gap-3 pt-2">
              <a href={`tel:${BIZ.phone}`} className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-center flex items-center justify-center gap-2"><Phone size={16}/>{t.callUs}</a>
              <a href="https://m.me/444.prius.selbeg" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-center flex items-center justify-center gap-2"><MessageCircle size={16}/>{t.sendMsg}</a>
            </div>
          </div>
          <div className={`${cd} rounded-xl border ${bd} p-6`}>
            <h3 className="font-bold text-lg mb-4">{t.paymentMethod}</h3>
            <div className="space-y-4">
              {[[QrCode,"QPay / SocialPay",t.qpayDesc,"text-blue-500"],[CreditCard,t.bankTransfer,`${t.bankName} | ${t.accountNo}`,"text-green-600"],[Banknote,t.cash,t.cashDesc,"text-amber-600"],[Calendar,t.installment,t.installmentDesc,"text-purple-600"]].map(([I,title,desc,clr],i)=>(
                <div key={i} className="flex items-start gap-3"><I size={24} className={clr}/><div><p className="font-medium text-sm">{title}</p><p className={`text-xs ${txS}`}>{desc}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>}

      {/* FOOTER */}
      <footer className={`${cd} border-t ${bd} mt-12`}>
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><div className="mb-3"><ShieldLogo size={32} showText={true} textSize="md" dark={dark}/></div><p className={`text-sm ${txS} mb-3`}>Prius & Aqua сэлбэг, засвар</p>
            <div className="flex gap-2">{SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg ${s.color} hover:opacity-80`}><s.Icon size={18}/></a>)}</div>
          </div>
          <div><h4 className="font-bold mb-3">{t.parts}</h4><div className={`space-y-1.5 text-sm ${txS}`}>{models.map(m=><button key={m} onClick={()=>{setSelModel(m);navTo("parts");}} className="block hover:text-amber-500">{m}</button>)}</div></div>
          <div><h4 className="font-bold mb-3">{t.contact}</h4><div className={`space-y-2 text-sm ${txS}`}><p className="flex items-center gap-2"><Phone size={14}/>{BIZ.phone}</p><p className="flex items-center gap-2"><Phone size={14}/>{BIZ.phone2}</p><p className="flex items-center gap-2"><MapPin size={14}/>{BIZ.address}</p></div></div>
          <div><h4 className="font-bold mb-3">{t.paymentMethod}</h4><div className="flex flex-wrap gap-2">{["QPay","SocialPay","Хаан банк","Бэлэн","Хуваан төлөх"].map(p=><span key={p} className={`px-2 py-1 rounded text-xs ${aL} text-amber-600`}>{p}</span>)}</div></div>
        </div>
        <div className={`border-t ${bd} py-4 text-center text-sm ${txS}`}>© 2026 444 Prius Сэлбэг Засвар</div>
      </footer>
      </>}
    </div>
  );
}
