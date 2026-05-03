export interface DimensionResult {
  score: number;
  signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  reason: string;
}

export interface ResonanceReport {
  ticker: string;
  finalScore: number;
  dimensions: {
    chip: DimensionResult;
    sentiment: DimensionResult;
    technical: DimensionResult;
  };
  timestamp: number;
}