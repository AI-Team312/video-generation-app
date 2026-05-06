import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Authenticate User
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Initialize Replicate API
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const body = await req.json();
    const { prompt, duration } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2. Using Wan 2.1 (T2V-1.3B) for high-quality video generation
    // This model allows flexible duration and high quality
    try {
        const output = await replicate.run(
            "lucataco/wan2.1-t2v-1.3b:600985c4da1765c34538942b036ca6d506085a6b7d7f7e91185012543d839395",
            {
                input: {
                    prompt: prompt,
                    resolution: "720p",
                    aspect_ratio: "16:9",
                    num_frames: Math.min(81, Math.floor((duration || 5) * 8)), // Approx conversion
                    guide_scale: 6,
                    num_inference_steps: 40
                }
            }
        );
        
        // Wan returns a file/URL
        return NextResponse.json({ videoUrl: output }, { status: 201 });
    } catch (apiError: any) {
        console.error("Replicate API Error:", apiError);
        // Fallback for demo if API fails or token missing
        return NextResponse.json({ 
            videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            warning: "Running in demo mode. Please check REPLICATE_API_TOKEN."
        }, { status: 201 });
    }

  } catch (error: any) {
    console.error("Video Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
