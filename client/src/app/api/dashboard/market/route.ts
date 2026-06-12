import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/constants/routes";

function getMockOverview(symbols: string) {
  const symbolsArray = symbols.split(",");
  return symbolsArray.map((symbol) => {
    const mockPrice = symbol.includes("BTC") 
      ? 63000 
      : symbol.includes("ETH") 
      ? 3400 
      : symbol.includes("SOL") 
      ? 150 
      : symbol.includes("APT") 
      ? 8 
      : 10;
    
    return [
      {
        symbol,
        name: symbol.replace("USD", "") + " USD",
        price: mockPrice,
        changePercentage: (Math.random() - 0.5) * 5, // -2.5% to +2.5%
        change: (Math.random() - 0.5) * 10,
        volume: 50000000 + Math.floor(Math.random() * 50000000),
        dayLow: mockPrice * 0.97,
        dayHigh: mockPrice * 1.03,
        yearHigh: mockPrice * 1.5,
        yearLow: mockPrice * 0.5,
        marketCap: mockPrice * 1000000000,
        priceAvg50: mockPrice * 0.98,
        priceAvg200: mockPrice * 0.95,
        exchange: "CRYPTO",
        open: mockPrice,
        previousClose: mockPrice,
        timestamp: Math.floor(Date.now() / 1000),
      }
    ];
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbols = searchParams.get("symbols");

  if (!symbols) {
    return NextResponse.json({ error: "Missing symbols parameter" }, { status: 400 });
  }

  try {
    if (!API_BASE_URL) {
      console.warn("API_BASE_URL is not defined. Returning mock data.");
      return NextResponse.json(getMockOverview(symbols));
    }

    const backendUrl = `${API_BASE_URL}/dashboard/market-overview?symbols=${symbols}`;
    const response = await fetch(backendUrl);
    
    if (!response.ok) {
      console.warn(`Backend returned status ${response.status} for market-overview. Returning fallback mock data.`);
      return NextResponse.json(getMockOverview(symbols));
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in dashboard market API proxy, returning mock data:", error);
    return NextResponse.json(getMockOverview(symbols));
  }
}
