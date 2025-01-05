import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Activity, MessageSquare } from 'lucide-react';

const ComparisonLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">LLM Response Comparison</h1>
          <p className="text-gray-600 mt-2">Compare responses from different language models for educational analysis</p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Column */}
          <Card className="col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Prompt Input</h2>
              </div>
              <div className="space-y-4">
                <Input 
                  placeholder="Enter your prompt here..."
                  className="w-full h-32 resize-none"
                />
                <Button className="w-full">
                  Compare Responses
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Responses Column */}
          <Card className="col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">Model Responses</h2>
              </div>
              <div className="space-y-4">
                {['llama-3.3-70b', 'mixtral-8x7b', 'gemma2-9b'].map((model) => (
                  <Card key={model} className="p-4 bg-gray-50">
                    <h3 className="font-medium text-gray-900 mb-2">{model}</h3>
                    <p className="text-gray-600">Response will appear here...</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrics Column */}
          <Card className="col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Metrics</h2>
              </div>
              <div className="space-y-4">
                {['Clarity', 'Accuracy', 'Depth', 'Engagement', 'Helpfulness'].map((metric) => (
                  <div key={metric} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{metric}</span>
                      <span className="text-sm text-gray-500">0/100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full w-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComparisonLayout;