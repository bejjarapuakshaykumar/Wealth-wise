import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";


const API_KEY = "YOUR_ALPHA_VANTAGE_KEY";

const Stocks = () => {
  const [query, setQuery] = useState("");
  const [investment, setInvestment] = useState("");
  const [duration, setDuration] = useState("1"); // in years
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [risk, setRisk] = useState("---");
  const [expectedReturn, setExpectedReturn] = useState("---");
  const [projectedValue, setProjectedValue] = useState("---");
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    if (!query || !investment) return alert("Enter stock and amount");
    setLoading(true);

    try {
      // Fetch historical data
      const histRes = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${API_KEY}`
      );
      const histData = await histRes.json();
      const timeSeries = histData["Time Series (Daily)"];
      if (!timeSeries) throw new Error("Historical data not found");

      const chartArr = Object.entries(timeSeries)
        .slice(0, 30)
        .reverse()
        .map(([date, value]) => ({ date, close: parseFloat(value["4. close"]) }));

      setChartData(chartArr);

      // Risk and expected return calculations
      const changes = [];
      for (let i = 1; i < chartArr.length; i++) {
        const prev = chartArr[i - 1].close;
        const curr = chartArr[i].close;
        changes.push(((curr - prev) / prev) * 100);
      }

      const avg = changes.reduce((a, b) => a + b, 0) / changes.length;
      const variance = changes.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / changes.length;
      const stdDev = Math.sqrt(variance);

      let riskLevel = "";
      if (stdDev < 1) riskLevel = "Low";
      else if (stdDev < 2.5) riskLevel = "Medium";
      else riskLevel = "High";
      setRisk(riskLevel);

      const dailyAvgReturn = avg / 100;
      const annualReturn = dailyAvgReturn * 252 * 100;
      setExpectedReturn(annualReturn.toFixed(2));

      const fv = Number(investment) * Math.pow(1 + dailyAvgReturn * 252, Number(duration));
      setProjectedValue(fv.toFixed(2));

      setStockData({ name: query.toUpperCase(), price: chartArr[chartArr.length - 1].close });

      // Save to backend
      if (investment && chartArr.length) {
        try {
          await axios.post("http://localhost:5000/api/investments", {
            userId: "user123", // temporary, later use real logged-in user
            stockSymbol: query.toUpperCase(),
            investmentAmount: Number(investment),
            durationYears: Number(duration),
            expectedReturn: Number(annualReturn.toFixed(2)),
            projectedValue: Number(fv.toFixed(2)),
            riskLevel: riskLevel
          });
          console.log("✅ Investment saved to backend");
        } catch (err) {
          console.error("❌ Failed to save investment:", err.message);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert(err.message);
      setStockData(null);
      setChartData([]);
      setRisk("---");
      setExpectedReturn("---");
      setProjectedValue("---");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 space-y-6">
        <Input placeholder="Stock symbol e.g., RELIANCE" value={query} onChange={e => setQuery(e.target.value)} />
        <Input type="number" placeholder="Investment Amount ₹" value={investment} onChange={e => setInvestment(e.target.value)} />
        <Input type="number" placeholder="Duration (years)" value={duration} onChange={e => setDuration(e.target.value)} />
        <Button onClick={fetchStock} disabled={loading}>{loading ? "Loading..." : "Analyze"}</Button>

        {stockData && (
          <>
            <Card>
              <Label>Current Price: ₹{stockData.price}</Label>
            </Card>

            <Card>
              <Label>Risk Level: {risk}</Label>
            </Card>

            <Card>
              <Label>Expected Annual Return: {expectedReturn}%</Label>
              <Label>Projected Value: ₹{projectedValue}</Label>
            </Card>

            <Card style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="close" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Stocks;
