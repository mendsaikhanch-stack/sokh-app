import { WOLF_IMG } from '../../assets/wolf';

export default function ShieldLogo({size="md",dark=true,centered=false,wolf=true}){
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
      {wolf&&sz.wolf>0&&<img src={WOLF_IMG} alt="" style={{height:sz.wolf,width:"auto",objectFit:"contain",marginRight:sz.gap*0.4,filter:`drop-shadow(0 4px 12px rgba(0,0,0,${dark?0.6:0.2}))`}}/>}
      <div style={{position:"relative",display:"inline-block"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:sz.num,fontWeight:400,lineHeight:0.85,color:"#f59e0b",position:"relative",zIndex:1,
          filter:"drop-shadow(0 2px 8px rgba(245,158,11,0.35))"}}>444</div>
        <div style={{position:"absolute",top:"50%",left:-4,right:-4,height:sz.stripe,
          background:"linear-gradient(90deg,#f59e0b,#ef4444)",transform:"translateY(-50%) skewX(-12deg)",opacity:0.25,zIndex:0,borderRadius:2}}/>
      </div>
      <div style={{width:2,height:sz.div,background:`linear-gradient(180deg,transparent,${dark?"#444":"#ccc"},transparent)`,margin:`0 ${sz.gap}px`,flexShrink:0}}/>
      <div style={{textAlign:"left"}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:sz.name,fontWeight:700,lineHeight:1,color:tx,letterSpacing:2,textTransform:"uppercase"}}>PRIUS</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:sz.sub,fontWeight:600,letterSpacing:3,color:"#f59e0b",textTransform:"uppercase",marginTop:2}}>сэлбэг & засвар</div>
        {(size==="lg"||size==="xl")&&<div style={{display:"flex",gap:4,marginTop:6}}>
          {[10,20,30,40,"AQUA"].map(n=><span key={n} style={{fontSize:sz.tag,padding:"2px 6px",borderRadius:3,
            background:dark?"rgba(255,255,255,0.1)":"#f0f0f0",color:txS,fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>{n}</span>)}
        </div>}
      </div>
      {wolf&&sz.wolf>0&&<img src={WOLF_IMG} alt="" style={{height:sz.wolf,width:"auto",objectFit:"contain",marginLeft:sz.gap*0.4,transform:"scaleX(-1)",filter:`drop-shadow(0 4px 12px rgba(0,0,0,${dark?0.6:0.2}))`}}/>}
    </div>
  );
}
