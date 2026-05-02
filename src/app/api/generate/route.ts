'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ name, price, lang }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Network error');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">🎬 ShortZ</h1>
        
        <input 
          type="text" 
          placeholder="Product Name" 
          className="w-full p-3 border rounded-lg mb-3" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        
        <input 
          type="text" 
          placeholder="Price (USD)" 
          className="w-full p-3 border rounded-lg mb-3" 
          value={price} 
          onChange={e => setPrice(e.target.value)} 
        />
        
        <select 
          className="w-full p-3 border rounded-lg mb-4" 
          value={lang} 
          onChange={e => setLang(e.target.value)}
        >
          <option value="en">🇺🇸 English</option>
          <option value="mn">🇲🇳 Монгол</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="zh">🇨🇳 中文</option>
        </select>
        
        <button 
          onClick={generateVideo} 
          disabled={loading} 
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Generating...' : '✨ Generate 9:16 Video ✨'}
        </button>
        
        {videoUrl && (
          <video src={videoUrl} controls className="w-full mt-6 rounded-lg border" />
        )}
      </div>
    </main>
  );
}