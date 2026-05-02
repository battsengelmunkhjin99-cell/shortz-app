import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, price, lang = 'en' } = req.body;
  const productName = name || 'Amazing Product';
  const demoVideoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

  res.status(200).json({
    success: true,
    videoUrl: demoVideoUrl,
    script: `🔥 ${productName} only $${price}! Link in bio!`
  });
}