import { ImageResponse } from 'next/og';
export const alt='LOOP — Possibility, within reach.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#f6f3ec',padding:70,color:'#18251f'}}><div style={{fontSize:34,fontWeight:700,letterSpacing:-2}}>LOOP</div><div style={{display:'flex',flexDirection:'column',fontSize:84,lineHeight:1.04,letterSpacing:-5}}><div>Possibility,</div><div style={{color:'#9b4d35'}}>within reach.</div></div><div style={{display:'flex',justifyContent:'space-between',fontSize:20}}><div>Liberation of Oppressed People</div><div>Community. Access. Empowerment.</div></div></div>,size);}
