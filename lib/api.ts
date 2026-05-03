export interface PredictionData {
  symbol: string;
  assetType: string;
  market_data: {
    current_price: number;
    ma_5: number;
    ma_10: number;
    ma_20: number;
    volatility: number;
    trend_slope: number;
  };
  global_factors: {
    sox_index: number;
    sox_daily_change: number;
    us_10yr_yield: number;
    us_10yr_yield_change: number;
  };
  sentiment_data: {
    overall_sentiment: string;
    total_score: number;
    factors: Array<{
      keyword: string;
      score: number;
      impact: string;
      headline: string;
    }>;
  };
  prediction_result: {
    target_prediction: {
      date: string;
      days_ahead: number;
      predicted_price: number;
      predicted_change_percent: number;
      range_high: number;
      range_low: number;
      success_rate: number;
      recommendation: string;
      overheating_warning: boolean;
      trend_slope: number;
      invalidation_point: number;
      potential_drawdown: number;
      liquidity_score: number;
      sharpe_ratio: number;
      max_drawdown: number;
      take_profit: number;
      hedge_pairing: string;
      analyst_insights: any;
      attribution_weights: any;
      analyst_digest: {
        reasoning: string[];
        contra_signals: string[];
      };
    };
    chart_data: {
      historical: Array<{
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }>;
    };
    recommendations: {
      [key: string]: {
        label: string;
        predicted_price: number;
        predicted_change_percent: number;
        grade: string;
        confidence_score: number;
        avg_achievement_rate: number;
        max_drawdown: number;
        decision_summary: {
          drivers: string[];
          risks: string[];
        };
      };
    };
    market_summary: {
      today_status: string;
      color_code: string;
      alert_msg: string;
    };
  };
}

export async function fetchPrediction(symbol: string, assetType: string, targetDate: string, scenario: string = 'normal'): Promise<PredictionData> {
  const url = new URL('/api/predict', window.location.origin);
  if (symbol) url.searchParams.append('symbol', symbol);
  if (assetType) url.searchParams.append('assetType', assetType);
  if (targetDate) url.searchParams.append('targetDate', targetDate);
  if (scenario) url.searchParams.append('scenario', scenario);

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch prediction');
  }
  
  const data = await response.json();
  return data;
}
