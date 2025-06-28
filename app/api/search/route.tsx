import { searchFood } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const start = Date.now();
    console.log(`[GET /api/search] ▶️ Incoming: ${req.url}`);

    const query = req.nextUrl.searchParams.get('query');
    console.log(`[GET] query param 'q': ${query}`);

    if (!query) {
        console.error(`[GET] ❌ Missing query parameter 'q'`);
        return NextResponse.json(
            { error: 'Missing query parameter "q"' },
            { status: 400 }
        );
    }

    try {
        console.log(`[GET] 🔍 Calling searchFood("${query}")`);
        const results = await searchFood(query);
        console.log(
            `[GET] ✅ searchFood returned ${results.length} item(s) in ${Date.now() - start}ms`,
            results
        );
        return NextResponse.json(results);
    } catch (err) {
        console.error(`[GET] 💥 searchFood threw error after ${Date.now() - start}ms:`, err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
