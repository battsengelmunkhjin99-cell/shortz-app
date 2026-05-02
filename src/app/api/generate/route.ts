import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';

export async function POST(req: NextRequest) {
  const { name, price, lang = 'en' } = await req.json();
  const productName = name || 'Amazing Product';
  
  // Скрипт үүсгэх
  const script = `🔥 ${productName} only $${price}! Limited time offer! Link in bio! 🔥`;
  
  // 1. Google TTS дуу үүсгэх
  const audioPath = path.join(process.cwd(), 'temp', `voice_${Date.now()}.mp3`);
  await fs.mkdir(path.dirname(audioPath), { recursive: true });
  
  const audioUrl = googleTTS.getAudioUrl(script.slice(0, 200), { lang, slow: false });
  const audioRes = await fetch(audioUrl);
  const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
  await fs.writeFile(audioPath, audioBuffer);
  
  // 2. Demo видео (бодит видео үүсгэхэд Remotion хэрэгтэй)
  const videoPath = path.join(process.cwd(), 'public', `video_${Date.now()}.mp4`);
  await fs.writeFile(videoPath, 'demo');
  
  return NextResponse.json({ videoUrl: `/${path.basename(videoPath)}` });
}