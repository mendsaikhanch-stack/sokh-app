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

/* ==================== RACING STRIPE LOGO (#2) + WOLF IMAGE ==================== */
const WOLF_IMG="data:image/webp;base64,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";

const ShieldLogo=({size="md",dark=true,centered=false})=>{
  const tx=dark?"#fff":"#1a1a1a",txS=dark?"#888":"#777";
  const sz={
    xs:{num:24,name:12,sub:7,stripe:5,div:32,gap:8,tag:6,wolf:0},
    sm:{num:36,name:16,sub:8,stripe:7,div:42,gap:10,tag:7,wolf:42},
    md:{num:52,name:22,sub:10,stripe:9,div:56,gap:12,tag:8,wolf:65},
    lg:{num:72,name:30,sub:12,stripe:12,div:68,gap:14,tag:9,wolf:90},
    xl:{num:96,name:40,sub:14,stripe:14,div:84,gap:16,tag:10,wolf:130},
  }[size]||{num:52,name:22,sub:10,stripe:9,div:56,gap:12,tag:8,wolf:65};
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:centered?"center":"flex-start"}}>
      {/* Left wolf */}
      {sz.wolf>0&&<img src={WOLF_IMG} alt="" style={{height:sz.wolf,width:"auto",objectFit:"contain",marginRight:sz.gap*0.4,filter:`drop-shadow(0 4px 12px rgba(0,0,0,${dark?0.6:0.2}))`}}/>}
      {/* 444 number */}
      <div style={{position:"relative",display:"inline-block"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:sz.num,fontWeight:400,lineHeight:0.85,color:"#f59e0b",position:"relative",zIndex:1,
          filter:"drop-shadow(0 2px 8px rgba(245,158,11,0.35))"}}>444</div>
        <div style={{position:"absolute",top:"50%",left:-4,right:-4,height:sz.stripe,
          background:"linear-gradient(90deg,#f59e0b,#ef4444)",transform:"translateY(-50%) skewX(-12deg)",opacity:0.25,zIndex:0,borderRadius:2}}/>
      </div>
      {/* Divider */}
      <div style={{width:2,height:sz.div,background:`linear-gradient(180deg,transparent,${dark?"#444":"#ccc"},transparent)`,margin:`0 ${sz.gap}px`,flexShrink:0}}/>
      {/* PRIUS text */}
      <div style={{textAlign:"left"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:sz.name,fontWeight:700,lineHeight:1,color:tx,letterSpacing:2,textTransform:"uppercase"}}>PRIUS</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:sz.sub,fontWeight:600,letterSpacing:3,color:"#f59e0b",textTransform:"uppercase",marginTop:2}}>сэлбэг & засвар</div>
        {(size==="lg"||size==="xl")&&<div style={{display:"flex",gap:4,marginTop:6}}>
          {[10,20,30,40,"AQUA"].map(n=><span key={n} style={{fontSize:sz.tag,padding:"2px 6px",borderRadius:3,
            background:dark?"rgba(255,255,255,0.1)":"#f0f0f0",color:txS,fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>{n}</span>)}
        </div>}
      </div>
      {/* Right wolf (mirrored) */}
      {sz.wolf>0&&<img src={WOLF_IMG} alt="" style={{height:sz.wolf,width:"auto",objectFit:"contain",marginLeft:sz.gap*0.4,transform:"scaleX(-1)",filter:`drop-shadow(0 4px 12px rgba(0,0,0,${dark?0.6:0.2}))`}}/>}
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
// Advice page
advice:"Зөвлөгөө",adviceTitle:"Засварын зөвлөгөө",adviceDesc:"Машиныхаа асуудлыг тайлбарлаад мэргэжлийн зөвлөгөө аваарай",
askQuestion:"Асуултаа бичнэ үү",advicePlaceholder:"Жишээ нь: Prius 20 мотор дуу гаргаж байна, юу болсон бэ?",
uploadVideo:"Видео/Зураг оруулах",sendQuestion:"Зөвлөгөө авах",
adviceHistory:"Өмнөх зөвлөгөөнүүд",noAdvice:"Одоохондоо зөвлөгөө байхгүй",
adviceCategories:"Түгээмэл асуудлууд",
catBattery:"Батерей асуудал",catEngine:"Мотор асуудал",catBrake:"Тоормос асуудал",
catSuspension:"Явах эд анги",catElectric:"Цахилгаан систем",catOil:"Тос/Шингэн",
adviceResponse:"Зөвлөгөө",estimatedCost:"Төсөвт зардал",urgency:"Яаралтай байдал",
urgencyLow:"Бага",urgencyMed:"Дунд",urgencyHigh:"Яаралтай",
comeToShop:"Манайд ирж үзүүлээрэй",freeConsult:"Үнэгүй зөвлөгөө",
attachFile:"Файл хавсаргах",recording:"Бичлэг",photo:"Зураг",video:"Видео",
selectModel:"Загвараа сонгоно уу",describeIssue:"Асуудлаа дэлгэрэнгүй бичнэ үү",
tipBattery:"Батерей 3-5 жилд нэг удаа шалгуулах хэрэгтэй",
tipOil:"Тос 5,000км тутамд солих нь зүйтэй",
tipBrake:"Тоормосны наклад 30,000км-д солигдоно",
tipCoolant:"Хөргөлтийн шингэн 2 жилд солих",
// Delivery
delivery:"Хүргэлт",deliveryMethod:"Хүргэлтийн хэлбэр",
deliveryUB:"УБ доторх хүргэлт",deliveryUBDesc:"1-3 хоногт хүргэнэ",deliveryUBPrice:"5,000₮",
deliveryExpress:"Шуурхай хүргэлт",deliveryExpressDesc:"Өнөөдөр 3 цагийн дотор",deliveryExpressPrice:"15,000₮",
deliveryPickup:"Өөрөө ирж авах",deliveryPickupDesc:"Салбар дээрээс авна (Үнэгүй)",deliveryPickupPrice:"Үнэгүй",
deliveryProvince:"Аймаг/Хөдөө",deliveryProvinceDesc:"3-7 хоногт шуудангаар",deliveryProvincePrice:"10,000-25,000₮",
deliveryCourier:"Шуудан/Унаагаар",deliveryCourierDesc:"Аймаг руу шуудан/унаагаар",deliveryCourierPrice:"Тохиролцоно",
deliveryAddress:"Хүргэлтийн хаяг",deliveryDistrict:"Дүүрэг",deliveryKhoroo:"Хороо",deliveryBuilding:"Байр/Гудамж",
deliveryApartment:"Тоот/Орц",deliveryNote:"Нэмэлт тэмдэглэл",deliveryPhone:"Хүлээн авагчийн утас",
deliveryTracking:"Хүргэлт хянах",deliveryStatus:"Хүргэлтийн төлөв",
statusPreparing:"Бэлтгэж байна",statusShipped:"Илгээсэн",statusDelivering:"Хүргэж байна",statusDelivered:"Хүргэгдсэн",
estimatedDelivery:"Хүрэх хугацаа",deliveryFree:"Үнэгүй",deliveryTotal:"Хүргэлтийн төлбөр",
freeDeliveryOver:"100,000₮-с дээш захиалгад УБ хүргэлт үнэгүй",
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
advice:"Advice",adviceTitle:"Repair Advice",adviceDesc:"Describe your car issue and get professional advice",
askQuestion:"Write your question",advicePlaceholder:"E.g. Prius 20 engine making noise, what could be wrong?",
uploadVideo:"Upload Video/Photo",sendQuestion:"Get Advice",
adviceHistory:"Previous Advice",noAdvice:"No advice yet",
adviceCategories:"Common Issues",
catBattery:"Battery Issues",catEngine:"Engine Issues",catBrake:"Brake Issues",
catSuspension:"Suspension",catElectric:"Electrical System",catOil:"Oil/Fluids",
adviceResponse:"Advice",estimatedCost:"Estimated Cost",urgency:"Urgency",
urgencyLow:"Low",urgencyMed:"Medium",urgencyHigh:"Urgent",
comeToShop:"Come visit us",freeConsult:"Free consultation",
attachFile:"Attach file",recording:"Recording",photo:"Photo",video:"Video",
selectModel:"Select your model",describeIssue:"Describe the issue in detail",
tipBattery:"Battery should be checked every 3-5 years",
tipOil:"Oil change recommended every 5,000km",
tipBrake:"Brake pads replaced around 30,000km",
tipCoolant:"Coolant should be replaced every 2 years",
delivery:"Delivery",deliveryMethod:"Delivery Method",
deliveryUB:"UB City Delivery",deliveryUBDesc:"Delivered in 1-3 days",deliveryUBPrice:"5,000₮",
deliveryExpress:"Express Delivery",deliveryExpressDesc:"Today within 3 hours",deliveryExpressPrice:"15,000₮",
deliveryPickup:"Pickup",deliveryPickupDesc:"Pick up from our shop (Free)",deliveryPickupPrice:"Free",
deliveryProvince:"Province/Rural",deliveryProvinceDesc:"3-7 days by mail",deliveryProvincePrice:"10,000-25,000₮",
deliveryCourier:"By Post/Bus",deliveryCourierDesc:"Shipped to province by post/bus",deliveryCourierPrice:"Negotiable",
deliveryAddress:"Delivery Address",deliveryDistrict:"District",deliveryKhoroo:"Khoroo",deliveryBuilding:"Building/Street",
deliveryApartment:"Apartment/Entrance",deliveryNote:"Additional notes",deliveryPhone:"Recipient phone",
deliveryTracking:"Track Delivery",deliveryStatus:"Delivery Status",
statusPreparing:"Preparing",statusShipped:"Shipped",statusDelivering:"Delivering",statusDelivered:"Delivered",
estimatedDelivery:"Estimated delivery",deliveryFree:"Free",deliveryTotal:"Delivery fee",
freeDeliveryOver:"Free UB delivery on orders over 100,000₮",
}};

/* ==================== BUSINESS & DATA ==================== */
const DEFAULT_BIZ={name:"444 Prius Сэлбэг Засвар",phone:"8911-2722",phone2:"9444-4444",
address:"УБ хот, Энх тайваны өргөн чөлөө",
branches:[{name:"Төв салбар",phone:"8911-2722",address:"УБ хот, Энх тайваны өргөн чөлөө"}],
facebook:"https://www.facebook.com/444.prius.selbeg",
instagram:"https://www.instagram.com/444.prius.selbeg",
tiktok:"https://www.tiktok.com/@444prius",
youtube:"https://www.youtube.com/@444prius",
workHours:"Даваа-Бямба: 09:00-19:00",
bankName:"Хаан банк",accountNo:"5012345678",accountHolder:"444 Prius ХХК"};

const getSOCIALS=(biz)=>[
  {key:"facebook",label:"Facebook",Icon:FBIcon,url:biz.facebook,color:"text-blue-600",bg:"bg-blue-600",followers:"2.4K"},
  {key:"instagram",label:"Instagram",Icon:IGIcon,url:biz.instagram,color:"text-pink-600",bg:"bg-gradient-to-r from-purple-600 to-pink-500",followers:"1.8K"},
  {key:"tiktok",label:"TikTok",Icon:TKIcon,url:biz.tiktok,color:"text-black dark:text-white",bg:"bg-black",followers:"3.1K"},
  {key:"youtube",label:"YouTube",Icon:YTIcon,url:biz.youtube,color:"text-red-600",bg:"bg-red-600",followers:"890"},
];

const models=["Prius 10/11","Prius 20","Prius 30","Prius 40/41","Aqua"];
const partCats=["Мотор","Батерей","Явах эд анги","Гадна детал","Цахилгаан","Тос/Шингэн"];
const LOW_STOCK_THRESHOLD = 3;

const initProducts=[
  {id:1,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:850000,model:"Prius 20",cat:"Батерей",rating:4.9,stock:2,cond:"used",img:"https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&h=400&fit=crop",emoji:"🔋",desc:{mn:"Япон задаргааны hybrid батерей",en:"Japanese hybrid battery"}},
  {id:2,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:950000,model:"Prius 30",cat:"Батерей",rating:4.8,stock:3,cond:"used",img:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",emoji:"🔋",desc:{mn:"Prius 30 hybrid батерей",en:"Prius 30 hybrid battery"}},
  {id:3,name:{mn:"Инвертор",en:"Inverter"},price:450000,model:"Prius 20",cat:"Цахилгаан",rating:4.7,stock:4,cond:"used",img:"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",emoji:"⚡",desc:{mn:"Инвертор, баталгаа 6 сар",en:"Inverter, 6mo warranty"}},
  {id:4,name:{mn:"Урд гупер",en:"Front Bumper"},price:120000,model:"Prius 20",cat:"Гадна детал",rating:4.5,stock:8,cond:"used",img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",emoji:"🚗",desc:{mn:"Урд гупер, өнгө сонголттой",en:"Front bumper, color options"}},
  {id:5,name:{mn:"Хойд гупер",en:"Rear Bumper"},price:110000,model:"Prius 30",cat:"Гадна детал",rating:4.4,stock:1,cond:"used",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",emoji:"🚗",desc:{mn:"Хойд гупер",en:"Rear bumper"}},
  {id:6,name:{mn:"Рулын аппарат",en:"Steering Rack"},price:280000,model:"Prius 10/11",cat:"Явах эд анги",rating:4.6,stock:3,cond:"used",img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",emoji:"🔧",desc:{mn:"Рулын аппарат засварласан",en:"Repaired steering rack"}},
  {id:7,name:{mn:"Амортизатор урд",en:"Front Shocks"},price:65000,model:"Prius 20",cat:"Явах эд анги",rating:4.3,stock:12,cond:"new",img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",emoji:"🔩",desc:{mn:"Шинэ амортизатор, хос",en:"New shock absorbers, pair"}},
  {id:8,name:{mn:"Мотор 1NZ-FXE",en:"Engine 1NZ-FXE"},price:1200000,model:"Prius 20",cat:"Мотор",rating:4.9,stock:2,cond:"used",img:"https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&h=400&fit=crop",emoji:"⚙️",desc:{mn:"Япон мотор, 80,000км",en:"Japanese engine, 80K km"}},
  {id:9,name:{mn:"Мотор 2ZR-FXE",en:"Engine 2ZR-FXE"},price:1500000,model:"Prius 30",cat:"Мотор",rating:4.8,stock:1,cond:"used",img:"https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=400&fit=crop",emoji:"⚙️",desc:{mn:"Prius 30 мотор",en:"Prius 30 engine"}},
  {id:10,name:{mn:"Агаар шүүгч",en:"Air Filter"},price:15000,model:"Prius 20",cat:"Тос/Шингэн",rating:4.2,stock:30,cond:"new",img:"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",emoji:"💨",desc:{mn:"Шинэ агаар шүүгч",en:"New air filter"}},
  {id:11,name:{mn:"Тоормосны наклад",en:"Brake Pads"},price:45000,model:"Prius 30",cat:"Явах эд анги",rating:4.5,stock:20,cond:"new",img:"https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=400&fit=crop",emoji:"🛞",desc:{mn:"Шинэ тоормосны наклад",en:"New brake pads"}},
  {id:12,name:{mn:"Толь хажуу",en:"Side Mirror"},price:55000,model:"Prius 20",cat:"Гадна детал",rating:4.3,stock:10,cond:"used",img:"https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop",emoji:"🪞",desc:{mn:"Хажуу толь, цахилгаан",en:"Electric side mirror"}},
  {id:13,name:{mn:"Hybrid батерей",en:"Hybrid Battery"},price:750000,model:"Aqua",cat:"Батерей",rating:4.7,stock:2,cond:"used",img:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",emoji:"🔋",desc:{mn:"Aqua hybrid батерей",en:"Aqua hybrid battery"}},
  {id:14,name:{mn:"Урд фара LED",en:"LED Headlight"},price:85000,model:"Prius 30",cat:"Цахилгаан",rating:4.4,stock:6,cond:"used",img:"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=400&fit=crop",emoji:"💡",desc:{mn:"Урд фара LED",en:"LED headlight"}},
  {id:15,name:{mn:"Мотор масло 5W-30",en:"Engine Oil 5W-30"},price:35000,model:"Prius 20",cat:"Тос/Шингэн",rating:4.6,stock:50,cond:"new",img:"https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=400&fit=crop",emoji:"🛢️",desc:{mn:"Toyota genuine 4л",en:"Toyota genuine 4L"}},
  {id:16,name:{mn:"Хаалга урд",en:"Front Door"},price:180000,model:"Prius 40/41",cat:"Гадна детал",rating:4.5,stock:2,cond:"used",img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",emoji:"🚪",desc:{mn:"Prius 40 хаалга",en:"Prius 40 door"}},
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
  const[deliveryMethod,setDeliveryMethod]=useState("ub");
  const[deliveryForm,setDeliveryForm]=useState({district:"",khoroo:"",building:"",apartment:"",note:"",phone2:""});
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
  // Business info state (editable from admin)
  const[BIZ,setBIZ]=useState(DEFAULT_BIZ);
  const SOCIALS=getSOCIALS(BIZ);
  // Advice feature
  const[adviceModel,setAdviceModel]=useState("");
  const[adviceText,setAdviceText]=useState("");
  const[adviceFiles,setAdviceFiles]=useState([]);
  const[adviceLoading,setAdviceLoading]=useState(false);
  const[adviceHistory,setAdviceHistory]=useState([
    {id:1,model:"Prius 20",question:"Мотор хэт халж байна, юу хийх вэ?",
      answer:"Хөргөлтийн шингэн шалгана уу. Шингэн хангалттай байвал термостат эвдэрсэн байж болно. Радиаторын сэнсийг шалгах хэрэгтэй.",
      cost:"30,000-80,000₮",urgency:"high",date:"2026-02-26",files:[]},
    {id:2,model:"Prius 30",question:"Hybrid батерей анхааруулга асаж байна",
      answer:"Батерейн элементүүдийн вольт шалгах хэрэгтэй. Зарим элемент сул байвал засварлах боломжтой. Бүтэн солих шаардлагагүй байж болно.",
      cost:"50,000-850,000₮",urgency:"med",date:"2026-02-25",files:[]},
    {id:3,model:"Aqua",question:"Тоормос дарахад чичиргээ мэдрэгдэж байна",
      answer:"Тоормосны диск муруйсан эсвэл наклад жигд бус элэгдсэн байна. Дискийг токарьдах эсвэл солих хэрэгтэй.",
      cost:"45,000-120,000₮",urgency:"high",date:"2026-02-24",files:[]},
  ]);

  const t=T[lang];const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const deliveryFee=deliveryMethod==="pickup"?0:deliveryMethod==="express"?15000:deliveryMethod==="province"?15000:deliveryMethod==="courier"?20000:cartTotal>=100000?0:5000;
  const grandTotal=cartTotal+deliveryFee;
  const fmt=p=>`₮${p.toLocaleString()}`;
  const unreadCount=notifications.filter(n=>!n.read).length;

  useEffect(()=>{document.title=t.brand;
    // Load Google Fonts for Shield Logo
    if(!document.getElementById('shield-fonts')){
      const link=document.createElement('link');link.id='shield-fonts';link.rel='stylesheet';
      link.href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Bebas+Neue&family=Oswald:wght@400;500;600;700&display=swap";
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
          <p className="text-3xl text-center mb-2">{product.emoji||"📦"}</p>
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
            <p className="text-sm font-medium">{n.product.emoji||"📦"} {lang==="mn"?n.product.name.mn:n.product.name.en}</p>
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
        <div className="flex items-center gap-3"><ShieldLogo size="xs" dark={dark}/><span className={`text-sm px-2 py-0.5 rounded ${aL} text-amber-500 font-medium`}>{t.admin}</span></div>
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
                  <span>{p.emoji||"📦"} {lang==="mn"?p.name.mn:p.name.en} <span className={txS}>({p.model})</span></span>
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
                  <td className="px-4 py-3">{prod?.emoji||"📦"} {lang==="mn"?prod?.name.mn:prod?.name.en} <span className={txS}>({prod?.model})</span></td>
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
                <td className="px-4 py-3 font-medium">{p.emoji||"📦"} {lang==="mn"?p.name.mn:p.name.en} <span className={`text-xs ${txS}`}>({p.model})</span></td>
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
                    <span className="text-3xl">{p.emoji||"📦"}</span>
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

          {/* Settings - EDITABLE */}
          {adminTab==="settings"&&<div className="space-y-4 max-w-2xl">
            {/* Business Info */}
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18} className="text-amber-500"/>{lang==="mn"?"Бизнесийн мэдээлэл":"Business Info"}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className={`block text-xs mb-1 ${txS}`}>{lang==="mn"?"Бизнесийн нэр":"Business Name"}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.name} onChange={e=>setBIZ({...BIZ,name:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{t.phone} 1</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.phone} onChange={e=>setBIZ({...BIZ,phone:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{t.phone} 2</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.phone2} onChange={e=>setBIZ({...BIZ,phone2:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{t.address}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.address} onChange={e=>setBIZ({...BIZ,address:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{lang==="mn"?"Ажлын цаг":"Work Hours"}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.workHours} onChange={e=>setBIZ({...BIZ,workHours:e.target.value})}/></div>
              </div>
            </div>

            {/* Branches */}
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2"><MapPin size={18} className="text-amber-500"/>{lang==="mn"?"Салбарууд":"Branches"}</h3>
                <button onClick={()=>setBIZ({...BIZ,branches:[...BIZ.branches,{name:"",phone:"",address:""}]})}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium"><Plus size={14}/>{lang==="mn"?"Салбар нэмэх":"Add Branch"}</button>
              </div>
              <div className="space-y-3">
                {BIZ.branches.map((br,i)=>(
                  <div key={i} className={`p-4 rounded-xl border ${bd} ${dark?"bg-gray-700/30":"bg-gray-50"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-amber-500">{lang==="mn"?"Салбар":"Branch"} #{i+1}</span>
                      {BIZ.branches.length>1&&<button onClick={()=>setBIZ({...BIZ,branches:BIZ.branches.filter((_,j)=>j!==i)})} className="text-red-500 hover:text-red-700"><Trash2 size={14}/></button>}
                    </div>
                    <div className="grid md:grid-cols-3 gap-2">
                      <div><label className={`block text-xs mb-1 ${txS}`}>{t.name}</label>
                        <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={lang==="mn"?"Төв салбар":"Main Branch"} value={br.name}
                          onChange={e=>{const b=[...BIZ.branches];b[i]={...b[i],name:e.target.value};setBIZ({...BIZ,branches:b});}}/></div>
                      <div><label className={`block text-xs mb-1 ${txS}`}>{t.phone}</label>
                        <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder="9999-1234" value={br.phone}
                          onChange={e=>{const b=[...BIZ.branches];b[i]={...b[i],phone:e.target.value};setBIZ({...BIZ,branches:b});}}/></div>
                      <div><label className={`block text-xs mb-1 ${txS}`}>{t.address}</label>
                        <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={lang==="mn"?"Хаяг оруулах":"Enter address"} value={br.address}
                          onChange={e=>{const b=[...BIZ.branches];b[i]={...b[i],address:e.target.value};setBIZ({...BIZ,branches:b});}}/></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><CreditCard size={18} className="text-amber-500"/>{lang==="mn"?"Төлбөрийн мэдээлэл":"Payment Info"}</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div><label className={`block text-xs mb-1 ${txS}`}>{lang==="mn"?"Банкны нэр":"Bank Name"}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.bankName} onChange={e=>setBIZ({...BIZ,bankName:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{lang==="mn"?"Дансны дугаар":"Account No."}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.accountNo} onChange={e=>setBIZ({...BIZ,accountNo:e.target.value})}/></div>
                <div><label className={`block text-xs mb-1 ${txS}`}>{lang==="mn"?"Данс эзэмшигч":"Account Holder"}</label>
                  <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} value={BIZ.accountHolder} onChange={e=>setBIZ({...BIZ,accountHolder:e.target.value})}/></div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={18} className="text-amber-500"/>{t.connectedAccounts}</h3>
              <div className="space-y-3">
                {[["facebook","Facebook",FBIcon,"text-blue-600"],["instagram","Instagram",IGIcon,"text-pink-600"],["tiktok","TikTok",TKIcon,dark?"text-white":"text-black"],["youtube","YouTube",YTIcon,"text-red-600"]].map(([key,label,Icon,clr])=>(
                  <div key={key} className="flex items-center gap-3">
                    <Icon size={20} className={clr}/>
                    <input className={`flex-1 px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={`${label} URL`} value={BIZ[key]}
                      onChange={e=>setBIZ({...BIZ,[key]:e.target.value})}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className={`${cd} rounded-xl border ${bd} p-5`}>
              <h3 className="font-bold mb-3 flex items-center gap-2"><Bell size={18} className="text-amber-500"/>{t.notifSettings}</h3>
              <label className="flex items-center justify-between py-2"><span className="text-sm">{t.emailNotif}</span><div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"/></div></label>
              <label className="flex items-center justify-between py-2"><span className="text-sm">{t.smsNotif}</span><div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"/></div></label>
            </div>

            {/* Save confirmation */}
            <button onClick={()=>addToast(lang==="mn"?"Тохиргоо хадгалагдлаа!":"Settings saved!")}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-2"><Check size={18}/>{t.save}</button>
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
            <ShieldLogo size="sm" dark={dark}/>
          </button>
          <nav className="hidden md:flex items-center gap-5">
            {[["home",t.home],["parts",t.parts],["services",t.services],["gallery",t.gallery],["advice",t.advice],["contact",t.contact]].map(([k,l])=>(
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
            {[["home",t.home],["parts",t.parts],["services",t.services],["gallery",t.gallery],["advice",t.advice],["contact",t.contact]].map(([k,l])=>(
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
              <div className={`w-14 h-14 rounded-lg ${aL} overflow-hidden flex-shrink-0`}>
                {item.img.startsWith("http")?<img src={item.img} alt="" className="w-full h-full object-cover"/>
                :<div className="w-full h-full flex items-center justify-center text-2xl">{item.emoji||item.img}</div>}</div>
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
          <div className={`w-full aspect-video rounded-xl ${aL} overflow-hidden mb-4 relative`}>
            {showProductModal.img.startsWith("http")?<img src={showProductModal.img} alt="" className="w-full h-full object-cover"/>
            :<div className="w-full h-full flex items-center justify-center text-6xl">{showProductModal.emoji||showProductModal.img}</div>}
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
          {/* Step 0: Delivery Method + Address */}
          {checkoutStep===0&&<div className="space-y-4">
            <h3 className="font-bold text-lg mb-2">{t.deliveryMethod}</h3>
            <p className={`text-xs ${txS} -mt-2 mb-2`}>{t.freeDeliveryOver}</p>
            {/* Delivery options */}
            <div className="space-y-2">
              {[["pickup",Package,t.deliveryPickup,t.deliveryPickupDesc,t.deliveryPickupPrice,"text-green-500"],
                ["ub",Truck,t.deliveryUB,t.deliveryUBDesc,cartTotal>=100000?t.deliveryFree:t.deliveryUBPrice,"text-blue-500"],
                ["express",Zap,t.deliveryExpress,t.deliveryExpressDesc,t.deliveryExpressPrice,"text-amber-500"],
                ["province",MapPin,t.deliveryProvince,t.deliveryProvinceDesc,t.deliveryProvincePrice,"text-purple-500"],
                ["courier",Send,t.deliveryCourier,t.deliveryCourierDesc,t.deliveryCourierPrice,"text-teal-500"]
              ].map(([k,I,label,desc,price,clr])=>(
                <button key={k} onClick={()=>setDeliveryMethod(k)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${deliveryMethod===k?`border-amber-500 ${aL}`:bd}`}>
                  <I size={22} className={clr}/>
                  <div className="flex-1"><p className="font-medium text-sm">{label}</p><p className={`text-xs ${txS}`}>{desc}</p></div>
                  <div className="text-right"><span className={`text-sm font-bold ${k==="pickup"||(k==="ub"&&cartTotal>=100000)?"text-green-500":"text-amber-500"}`}>{price}</span></div>
                  {deliveryMethod===k&&<Check size={18} className="text-amber-500"/>}
                </button>
              ))}
            </div>
            {/* Address form (hide for pickup) */}
            {deliveryMethod!=="pickup"&&<div className={`space-y-3 p-4 rounded-xl border ${bd} ${aL} mt-3`}>
              <h4 className="font-bold text-sm flex items-center gap-2"><MapPin size={16} className="text-amber-500"/>{t.deliveryAddress}</h4>
              <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={t.name} value={checkoutForm.name} onChange={e=>setCheckoutForm({...checkoutForm,name:e.target.value})}/>
              <div className="grid grid-cols-2 gap-2">
                <input className={`px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={t.phone} value={checkoutForm.phone} onChange={e=>setCheckoutForm({...checkoutForm,phone:e.target.value})}/>
                <input className={`px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={t.deliveryPhone} value={deliveryForm.phone2} onChange={e=>setDeliveryForm({...deliveryForm,phone2:e.target.value})}/>
              </div>
              {(deliveryMethod==="ub"||deliveryMethod==="express")&&<div className="grid grid-cols-2 gap-2">
                <select className={`px-3 py-2 rounded-lg border text-sm ${inp}`} value={deliveryForm.district} onChange={e=>setDeliveryForm({...deliveryForm,district:e.target.value})}>
                  <option value="">{t.deliveryDistrict}</option>
                  {["БГД","БЗД","ЧД","СБД","СХД","ХУД","БНД","НД","ХАД"].map(d=><option key={d} value={d}>{d}</option>)}
                </select>
                <input className={`px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={t.deliveryKhoroo} value={deliveryForm.khoroo} onChange={e=>setDeliveryForm({...deliveryForm,khoroo:e.target.value})}/>
              </div>}
              <input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={deliveryMethod==="province"||deliveryMethod==="courier"?t.address:t.deliveryBuilding} value={deliveryForm.building||checkoutForm.address} onChange={e=>{setDeliveryForm({...deliveryForm,building:e.target.value});setCheckoutForm({...checkoutForm,address:e.target.value});}}/>
              {(deliveryMethod==="ub"||deliveryMethod==="express")&&<input className={`w-full px-3 py-2 rounded-lg border text-sm ${inp}`} placeholder={t.deliveryApartment} value={deliveryForm.apartment} onChange={e=>setDeliveryForm({...deliveryForm,apartment:e.target.value})}/>}
              <textarea className={`w-full px-3 py-2 rounded-lg border text-sm ${inp} resize-none`} rows={2} placeholder={t.deliveryNote} value={deliveryForm.note} onChange={e=>setDeliveryForm({...deliveryForm,note:e.target.value})}/>
            </div>}
            {deliveryMethod==="pickup"&&<div className={`p-4 rounded-xl border ${bd} ${aL}`}>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><MapPin size={16} className="text-green-500"/>{t.deliveryPickup}</h4>
              <p className="text-sm">{BIZ.address}</p>
              <p className={`text-xs ${txS} mt-1`}>☎️ {BIZ.phone}</p>
              <p className={`text-xs ${txS}`}>{BIZ.workHours}</p>
            </div>}
            {/* Delivery fee summary */}
            <div className={`flex justify-between items-center p-3 rounded-lg ${aL}`}>
              <span className={`text-sm ${txS}`}>{t.deliveryTotal}:</span>
              <span className={`font-bold ${deliveryFee===0?"text-green-500":"text-amber-500"}`}>{deliveryFee===0?t.deliveryFree:fmt(deliveryFee)}</span>
            </div>
            <button onClick={()=>setCheckoutStep(1)} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.next} →</button>
          </div>}

          {/* Step 1: Payment */}
          {checkoutStep===1&&<div className="space-y-4"><h3 className="font-bold text-lg mb-4">{t.paymentMethod}</h3>
            {[["qpay",QrCode,t.qpay,t.qpayDesc,"text-blue-500"],["bank",CreditCard,t.bankTransfer,`${t.bankName} | ${t.accountNo}`,"text-green-600"],["cash",Banknote,t.cash,t.cashDesc,"text-amber-600"],["installment",Calendar,t.installment,t.installmentDesc,"text-purple-600"]].map(([k,I,label,desc,clr])=>(
              <button key={k} onClick={()=>setPayMethod(k)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition ${payMethod===k?`border-amber-500 ${aL}`:`${bd}`}`}><I size={28} className={clr}/><div><p className="font-medium">{label}</p><p className={`text-xs ${txS}`}>{desc}</p></div>{payMethod===k&&<Check size={20} className="ml-auto text-amber-500"/>}</button>
            ))}<div className="flex gap-3 mt-2"><button onClick={()=>setCheckoutStep(0)} className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}>← {t.prev}</button><button onClick={()=>setCheckoutStep(2)} className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.next} →</button></div></div>}

          {/* Step 2: Review with delivery */}
          {checkoutStep===2&&<div><h3 className="font-bold text-lg mb-4">{t.review}</h3>
            <div className="space-y-2 mb-3">{cart.map((item,i)=><div key={i} className={`flex justify-between py-2 border-b ${bd}`}><span className="text-sm">{item.emoji||"📦"} {lang==="mn"?item.name.mn:item.name.en} x{item.qty}</span><span className="font-medium text-sm">{fmt(item.price*item.qty)}</span></div>)}</div>
            <div className={`flex justify-between py-2 text-sm ${txS}`}><span>{t.total} ({lang==="mn"?"барааны":"items"}):</span><span>{fmt(cartTotal)}</span></div>
            <div className={`flex justify-between py-2 text-sm ${txS}`}><span>{t.deliveryTotal} ({deliveryMethod==="pickup"?t.deliveryPickup:deliveryMethod==="express"?t.deliveryExpress:deliveryMethod==="ub"?t.deliveryUB:deliveryMethod==="province"?t.deliveryProvince:t.deliveryCourier}):</span><span className={deliveryFee===0?"text-green-500":""}>{deliveryFee===0?t.deliveryFree:fmt(deliveryFee)}</span></div>
            <div className={`flex justify-between py-3 border-t ${bd} font-bold text-lg mt-2`}>{t.total}<span className="text-amber-500">{fmt(grandTotal)}</span></div>
            {/* Delivery info summary */}
            <div className={`p-3 rounded-xl ${aL} mt-3 text-sm space-y-1`}>
              <p className="font-medium flex items-center gap-2">{deliveryMethod==="pickup"?<Package size={14} className="text-green-500"/>:<Truck size={14} className="text-blue-500"/>}{deliveryMethod==="pickup"?t.deliveryPickup:t.deliveryAddress}</p>
              {deliveryMethod!=="pickup"&&<><p className={txS}>{checkoutForm.name} | {checkoutForm.phone}</p>
              <p className={txS}>{deliveryForm.district} {deliveryForm.khoroo} {deliveryForm.building||checkoutForm.address} {deliveryForm.apartment}</p></>}
              {deliveryMethod==="pickup"&&<p className={txS}>{BIZ.address}</p>}
            </div>
            <div className="flex gap-3 mt-4"><button onClick={()=>setCheckoutStep(1)} className={`flex-1 py-3 rounded-xl border font-medium ${bd}`}>← {t.prev}</button><button onClick={()=>{setCheckoutStep(3);dc({type:"CLEAR"});}} className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.placeOrder}</button></div></div>}

          {/* Step 3: Confirmation with tracking */}
          {checkoutStep===3&&<div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-amber-500"/></div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">{t.orderSuccess}</h3>
            <p className={txS}>{t.orderSuccessDesc}</p>
            {/* Delivery tracking */}
            <div className={`mt-6 p-4 rounded-xl border ${bd} ${aL} text-left max-w-sm mx-auto`}>
              <p className="font-bold text-sm mb-3 flex items-center gap-2"><Truck size={16} className="text-amber-500"/>{t.deliveryTracking}</p>
              <div className="flex items-center gap-2 mb-4">
                {[t.statusPreparing,t.statusShipped,t.statusDelivering,t.statusDelivered].map((s,i)=>(
                  <div key={i} className="flex-1 text-center">
                    <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs ${i===0?"bg-amber-500 text-white":`border-2 ${bd} ${txS}`}`}>{i===0?<Check size={12}/>:i+1}</div>
                    <p className={`text-xs ${i===0?"text-amber-500 font-medium":txS}`}>{s}</p>
                  </div>
                ))}
              </div>
              <p className={`text-xs ${txS}`}>{t.estimatedDelivery}: {deliveryMethod==="express"?lang==="mn"?"Өнөөдөр":"Today":deliveryMethod==="pickup"?lang==="mn"?"Одоо авах боломжтой":"Available now":deliveryMethod==="ub"?"1-3 "+( lang==="mn"?"хоног":"days"):deliveryMethod==="province"?"3-7 "+(lang==="mn"?"хоног":"days"):"5-10 "+(lang==="mn"?"хоног":"days")}</p>
            </div>
            <p className={`mt-3 text-sm ${txS}`}>☎️ {BIZ.phone}</p>
            <button onClick={()=>{setShowCheckout(false);setCheckoutStep(0);navTo("home");}} className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.backToShop}</button>
          </div>}
        </div>
      </div>:<>

      {/* HERO */}
      {page==="home"&&<section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(255,255,255,0.03) 35px,rgba(255,255,255,0.03) 70px)"}}/></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="flex justify-center mb-8"><ShieldLogo size="xl" dark={true} centered={true}/></div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 mx-auto max-w-2xl">{t.heroTitle}</h1>
          <p className="text-lg opacity-80 mb-6 mx-auto max-w-xl">{t.heroSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={()=>navTo("parts")} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold">{t.shopNow} →</button>
            <button onClick={()=>navTo("services")} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold">{t.bookService}</button>
          </div>
          {/* Social follow buttons */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-full ${s.bg} text-white text-sm font-medium hover:opacity-90 transition`}><s.Icon size={16} className="text-white"/>{s.label}<span className="opacity-70">{s.followers}</span></a>)}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">{models.map(m=><span key={m} className="px-3 py-1 rounded-full bg-white/10 text-sm">{m}</span>)}</div>
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
              <div className={`relative aspect-square ${aL} overflow-hidden cursor-pointer`} onClick={()=>{setShowProductModal(p);setModalQty(1);}}>
                {p.img.startsWith("http")?<img src={p.img} alt={lang==="mn"?p.name.mn:p.name.en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>:null}
                <div className={`w-full h-full items-center justify-center text-5xl ${p.img.startsWith("http")?"hidden":"flex"}`}>{p.emoji||p.img}</div>
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
          {[{img:"https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&h=400&fit=crop",c:"Hybrid батерей засвар"},{img:"https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=600&h=400&fit=crop",c:"Мотор 1NZ-FXE"},{img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",c:"Prius 30 урд гупер"},{img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",c:"Явах эд анги"},{img:"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",c:"LED фара"},{img:"https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop",c:"Тоормосны систем"}].map((p,i)=>(
            <div key={i} className={`${cd} rounded-xl border ${bd} overflow-hidden group`}><div className={`aspect-video ${aL} overflow-hidden`}><img src={p.img} alt={p.c} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/></div><p className="p-3 text-sm font-medium">{p.c}</p></div>
          ))}
        </div>
        <div className="text-center mt-6 flex flex-wrap justify-center gap-3">
          {SOCIALS.map(s=><a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium ${s.bg}`}><s.Icon size={18} className="text-white"/>{s.label}</a>)}
        </div>
      </section>}

      {/* ADVICE PAGE */}
      {page==="advice"&&<section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">{t.adviceTitle}</h2>
        <p className={`${txS} mb-6`}>{t.adviceDesc}</p>

        {/* Quick Tips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[[Battery,"catBattery","tipBattery","text-green-500"],[Wrench,"catEngine","tipOil","text-blue-500"],[Car,"catBrake","tipBrake","text-red-500"],[Package,"catOil","tipCoolant","text-amber-500"]].map(([Icon,catKey,tipKey,clr],i)=>(
            <div key={i} className={`${cd} rounded-xl p-4 border ${bd}`}>
              <Icon size={24} className={`${clr} mb-2`}/>
              <h4 className="font-bold text-xs mb-1">{t[catKey]}</h4>
              <p className={`text-xs ${txS}`}>{t[tipKey]}</p>
            </div>
          ))}
        </div>

        {/* Ask Question Form */}
        <div className={`${cd} rounded-2xl border ${bd} p-6 mb-8`}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageCircle size={20} className="text-amber-500"/>{t.askQuestion}</h3>
          
          {/* Model selector */}
          <div className="mb-4">
            <label className={`block text-sm mb-2 font-medium ${txS}`}>{t.selectModel}</label>
            <div className="flex flex-wrap gap-2">
              {models.map(m=>(
                <button key={m} onClick={()=>setAdviceModel(m)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${adviceModel===m?"bg-amber-500 text-white":`border ${bd} hover:border-amber-500`}`}>{m}</button>
              ))}
            </div>
          </div>

          {/* Text input */}
          <div className="mb-4">
            <label className={`block text-sm mb-2 font-medium ${txS}`}>{t.describeIssue}</label>
            <textarea className={`w-full px-4 py-3 rounded-xl border text-sm ${inp} min-h-[120px] resize-none`}
              placeholder={t.advicePlaceholder} value={adviceText} onChange={e=>setAdviceText(e.target.value)}/>
          </div>

          {/* File upload */}
          <div className="mb-4">
            <label className={`block text-sm mb-2 font-medium ${txS}`}>{t.attachFile}</label>
            <div className="flex flex-wrap gap-3">
              {/* Uploaded files preview */}
              {adviceFiles.map((f,i)=>(
                <div key={i} className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border ${bd} ${aL}`}>
                  {f.type.startsWith("image")?<Image size={16} className="text-amber-500"/>:
                   f.type.startsWith("video")?<Eye size={16} className="text-blue-500"/>:
                   <Package size={16} className="text-gray-500"/>}
                  <span className="text-xs font-medium truncate max-w-[120px]">{f.name}</span>
                  <span className={`text-xs ${txS}`}>({(f.size/1024/1024).toFixed(1)}MB)</span>
                  <button onClick={()=>setAdviceFiles(p=>p.filter((_,j)=>j!==i))} className="text-red-500 ml-1"><X size={14}/></button>
                </div>
              ))}
              {/* Upload buttons */}
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed ${bd} cursor-pointer hover:border-amber-500 transition`}>
                <Camera size={18} className="text-amber-500"/>
                <span className="text-sm">{t.photo}</span>
                <input type="file" accept="image/*" className="hidden" onChange={e=>{if(e.target.files[0])setAdviceFiles(p=>[...p,e.target.files[0]]);e.target.value="";}}/>
              </label>
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed ${bd} cursor-pointer hover:border-blue-500 transition`}>
                <Eye size={18} className="text-blue-500"/>
                <span className="text-sm">{t.video}</span>
                <input type="file" accept="video/*" className="hidden" onChange={e=>{if(e.target.files[0])setAdviceFiles(p=>[...p,e.target.files[0]]);e.target.value="";}}/>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button disabled={!adviceText.trim()||!adviceModel||adviceLoading}
            onClick={()=>{
              setAdviceLoading(true);
              setTimeout(()=>{
                const responses=[
                  {answer:lang==="mn"?"Таны тайлбарлаж буй асуудал нь ихэвчлэн "+adviceModel+" загварт тохиолддог. Манай мэргэжилтэн шалгаж үзэх шаардлагатай. Компьютер оношлогоо хийлгэхийг зөвлөж байна.":"Based on your description, this is a common issue with "+adviceModel+". We recommend a computer diagnostic check with our specialist.",
                    cost:adviceModel.includes("30")?"50,000-200,000₮":"30,000-150,000₮",urgency:adviceText.length>50?"high":"med"},
                ];
                const r=responses[0];
                setAdviceHistory(p=>[{id:Date.now(),model:adviceModel,question:adviceText,answer:r.answer,cost:r.cost,urgency:r.urgency,date:new Date().toISOString().split("T")[0],files:adviceFiles.map(f=>f.name)},...p]);
                setAdviceText("");setAdviceFiles([]);setAdviceLoading(false);
                addToast(lang==="mn"?"Зөвлөгөө бэлэн боллоо!":"Advice ready!");
              },2000);
            }}
            className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${!adviceText.trim()||!adviceModel||adviceLoading?"bg-gray-400 cursor-not-allowed":"bg-amber-500 hover:bg-amber-600"}`}>
            {adviceLoading?<><RefreshCw size={18} className="animate-spin"/>{lang==="mn"?"Боловсруулж байна...":"Processing..."}</>
            :<><Send size={18}/>{t.sendQuestion}</>}
          </button>
        </div>

        {/* Advice History */}
        <div>
          <h3 className="font-bold text-lg mb-4">{t.adviceHistory}</h3>
          {adviceHistory.length===0?<p className={`text-center py-8 ${txS}`}>{t.noAdvice}</p>
          :<div className="space-y-4">
            {adviceHistory.map(a=>(
              <div key={a.id} className={`${cd} rounded-xl border ${bd} overflow-hidden`}>
                {/* Question header */}
                <div className={`p-4 border-b ${bd} ${dark?"bg-gray-700/30":"bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${aL} text-amber-500 font-medium`}>{a.model}</span>
                    <span className={`text-xs ${txS}`}>{a.date}</span>
                  </div>
                  <p className="font-medium text-sm">{a.question}</p>
                  {a.files&&a.files.length>0&&<div className="flex gap-2 mt-2">{a.files.map((f,i)=>(
                    <span key={i} className={`text-xs px-2 py-1 rounded ${aL} flex items-center gap-1`}><Camera size={10}/>{f}</span>
                  ))}</div>}
                </div>
                {/* Answer */}
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                      <Wrench size={16} className="text-white"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-500 mb-1">{t.adviceResponse}</p>
                      <p className="text-sm leading-relaxed">{a.answer}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className={`text-xs px-3 py-1.5 rounded-lg ${aL} flex items-center gap-1`}>
                      <CreditCard size={12} className="text-amber-500"/>{t.estimatedCost}: <strong>{a.cost}</strong>
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 ${a.urgency==="high"?"bg-red-100 text-red-600":a.urgency==="med"?"bg-yellow-100 text-yellow-600":"bg-green-100 text-green-600"}`}>
                      <AlertTriangle size={12}/>{t.urgency}: <strong>{a.urgency==="high"?t.urgencyHigh:a.urgency==="med"?t.urgencyMed:t.urgencyLow}</strong>
                    </span>
                  </div>
                  <a href={`tel:${BIZ.phone}`} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium">
                    <Phone size={14}/>{t.comeToShop} — {t.freeConsult}
                  </a>
                </div>
              </div>
            ))}
          </div>}
        </div>

        {/* Common Issues Categories */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">{t.adviceCategories}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[[Battery,"catBattery","text-green-500","bg-green-50"],[Wrench,"catEngine","text-blue-500","bg-blue-50"],[Car,"catBrake","text-red-500","bg-red-50"],[Cpu,"catElectric","text-purple-500","bg-purple-50"],[Package,"catOil","text-amber-500","bg-amber-50"],[Filter,"catSuspension","text-teal-500","bg-teal-50"]].map(([Icon,key,clr,bgClr],i)=>(
              <button key={i} onClick={()=>{setAdviceText(t[key]+" - ");document.querySelector("textarea")?.focus();}}
                className={`${cd} rounded-xl p-4 border ${bd} hover:shadow-md transition text-left flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-lg ${dark?aL:bgClr} flex items-center justify-center`}><Icon size={20} className={clr}/></div>
                <span className="font-medium text-sm">{t[key]}</span>
              </button>
            ))}
          </div>
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
          <div><div className="mb-4"><ShieldLogo size="md" dark={dark}/></div><p className={`text-sm ${txS} mb-3`}>Prius & Aqua сэлбэг, засвар</p>
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
