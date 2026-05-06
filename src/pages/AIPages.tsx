import React, { useState } from "react";

const AIPages: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    const question = input.toLowerCase();

    // Simple keyword-based mock AI responses 👇
    if (question.includes("loan")) {
      setResponse("Loans are borrowed amounts that must be repaid with interest. You can explore personal, home, or education loans.");
    } 
    else if (question.includes("credit card")) {
      setResponse("Credit cards allow you to borrow up to a limit. Always pay your dues on time to avoid high interest.");
    } 
    else if (question.includes("emi")) {
      setResponse("EMI stands for Equated Monthly Installment. It’s a fixed payment made every month towards a loan.");
    } 
    else if (question.includes("investment")) {
      setResponse("Investments help your money grow. You can try mutual funds, stocks, or fixed deposits based on your risk level.");
    } 
    else if (question.includes("stock")) {
      setResponse("Stocks represent ownership in a company. Prices fluctuate based on market performance.");
    } 
    else if (question.includes("mutual fund")) {
      setResponse("Mutual funds pool money from investors to buy a diversified portfolio of stocks or bonds.");
    } 
    else if (question.includes("saving")) {
      setResponse("Savings are essential. Try to save at least 20% of your income for emergencies and goals.");
    } 
    else {
      setResponse("Sorry, I don't have information on that yet. Try asking about loans, credit cards, EMIs, or investments!");
    }

    setInput(""); // Clear input box
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">💬 Wealth Wise AI Advisor (Demo)</h1>

      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Ask your financial question:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., What is EMI? or Best investment option?"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleAsk}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ask AI
        </button>

        {response && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-gray-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPages;
