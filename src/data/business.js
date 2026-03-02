import { FBIcon, IGIcon, TKIcon, YTIcon } from '../components/icons/SocialIcons';

export const DEFAULT_BIZ={
  name:"444 Prius Сэлбэг Засвар",
  phone:"8911-2722",
  phone2:"9444-4444",
  address:"УБ хот, Энх тайваны өргөн чөлөө",
  branches:[{name:"Төв салбар",phone:"8911-2722",address:"УБ хот, Энх тайваны өргөн чөлөө"}],
  facebook:"https://www.facebook.com/444.prius.selbeg",
  instagram:"https://www.instagram.com/444.prius.selbeg",
  tiktok:"https://www.tiktok.com/@444prius",
  youtube:"https://www.youtube.com/@444prius",
  fbPixelId:"",
  fbPageId:"",
  workHours:"Даваа-Бямба: 09:00-19:00",
  bankName:"Хаан банк",
  accountNo:"5012345678",
  accountHolder:"444 Prius ХХК",
  mapEmbed:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5!2d106.9177!3d47.9184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96925be2b18cfb%3A0x9cfcd30e2f9c346e!2z0K3QvdGFINGC0LDQudCy0LDQvdGLINOp0YDQs9Op0L0g0YfTqdC70LnTqdOp!5e0!3m2!1smn!2smn!4v1709000000000!5m2!1smn!2smn",
  mapUrl:"https://www.google.com/maps/search/444+Prius+%D0%A1%D1%8D%D0%BB%D0%B1%D1%8D%D0%B3+%D0%97%D0%B0%D1%81%D0%B2%D0%B0%D1%80+%D0%AD%D0%BD%D1%85+%D1%82%D0%B0%D0%B9%D0%B2%D0%B0%D0%BD%D1%8B+%D3%A9%D1%80%D0%B3%D3%A9%D0%BD+%D1%87%D3%A9%D0%BB%D3%A9%D3%A9",
};

export const getSOCIALS=(biz)=>[
  {key:"facebook",label:"Facebook",Icon:FBIcon,url:biz.facebook,color:"text-blue-600",bg:"bg-blue-600",followers:"2.4K"},
  {key:"instagram",label:"Instagram",Icon:IGIcon,url:biz.instagram,color:"text-pink-600",bg:"bg-gradient-to-r from-purple-600 to-pink-500",followers:"1.8K"},
  {key:"tiktok",label:"TikTok",Icon:TKIcon,url:biz.tiktok,color:"text-black dark:text-white",bg:"bg-black",followers:"3.1K"},
  {key:"youtube",label:"YouTube",Icon:YTIcon,url:biz.youtube,color:"text-red-600",bg:"bg-red-600",followers:"890"},
];
