import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { EvaluationItem } from '@/src/types';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (positive: string[], negative: string[]) => void;
  initialPositive?: string[];
  initialNegative?: string[];
  isEditing?: boolean;
}

const POSITIVE_ITEMS: string[] = [
  '事实清楚', '证据确凿', '处理恰当', '定性准确', '依据正确', '程序合法', '文书完整'
];

const NEGATIVE_ITEMS: string[] = [
  '未调查核实，直接否定预警', '认定事实不清，证据不足', '佐证材料不充分', '未准确界定行为性质', '适用依据不正确', '未依法处理或处理不到位', '处置程序不规范', '文书不规范、不完整'
];

const EMPTY_ARRAY: string[] = [];

export default function EvaluationModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialPositive = EMPTY_ARRAY, 
  initialNegative = EMPTY_ARRAY,
  isEditing = false
}: EvaluationModalProps) {
  const [selectedPositive, setSelectedPositive] = React.useState<string[]>(initialPositive);
  const [selectedNegative, setSelectedNegative] = React.useState<string[]>(initialNegative);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedPositive(initialPositive);
      setSelectedNegative(initialNegative);
    }
  }, [isOpen, initialPositive, initialNegative]);

  const handleTogglePositive = (item: string) => {
    setSelectedPositive(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleToggleNegative = (item: string) => {
    setSelectedNegative(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedPositive, selectedNegative);
    setSelectedPositive([]);
    setSelectedNegative([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-0 overflow-hidden rounded-lg">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <DialogTitle className="text-lg font-bold text-gray-800">
            {isEditing ? '修改评价' : '新增评价'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-8 grid grid-cols-2 gap-8">
          {/* Positive Evaluation */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <h3 className="font-bold text-green-600">正向评价</h3>
            </div>
            <div className="grid gap-4">
              {POSITIVE_ITEMS.map((item) => (
                <div key={item} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleTogglePositive(item)}>
                  <Checkbox 
                    id={`pos-${item}`} 
                    checked={selectedPositive.includes(item)}
                    onCheckedChange={() => handleTogglePositive(item)}
                    className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label 
                    htmlFor={`pos-${item}`}
                    className="text-sm text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Negative Evaluation */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
              <div className="w-1 h-4 bg-red-500 rounded-full"></div>
              <h3 className="font-bold text-red-600">反向评价</h3>
            </div>
            <div className="grid gap-4">
              {NEGATIVE_ITEMS.map((item) => (
                <div key={item} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleToggleNegative(item)}>
                  <Checkbox 
                    id={`neg-${item}`} 
                    checked={selectedNegative.includes(item)}
                    onCheckedChange={() => handleToggleNegative(item)}
                    className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  />
                  <Label 
                    htmlFor={`neg-${item}`}
                    className="text-sm text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-center sm:justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-8 border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            取消
          </Button>
          <Button 
            onClick={handleSubmit}
            className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
