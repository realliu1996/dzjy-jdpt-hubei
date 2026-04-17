import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Evaluation, WarningStatus } from '@/src/types';
import EvaluationModal from './EvaluationModal';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function EvaluationFlow() {
  const [status, setStatus] = useState<WarningStatus>('办理中');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    {
      id: '1',
      evaluator: '张三',
      department: '技术部',
      time: '2023-04-08 10:30',
      positiveTags: ['事实清楚', '证据确凿', '处理恰当'],
      negativeTags: ['处置程序不规范']
    },
    {
      id: '2',
      evaluator: '李四',
      department: '市场部',
      time: '2023-04-08 11:15',
      positiveTags: ['定性准确', '依据正确'],
      negativeTags: ['未调查核实，直接否定预警', '调查核实事实不清楚']
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

  const toggleStep = (step: number) => {
    setExpandedSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  const handleAddEvaluation = (positive: string[], negative: string[]) => {
    if (editingEvaluation) {
      setEvaluations(evaluations.map(e => 
        e.id === editingEvaluation.id 
          ? { ...e, positiveTags: positive, negativeTags: negative, time: new Date().toLocaleString() + ' (已修改)' } 
          : e
      ));
      setEditingEvaluation(null);
    } else {
      const newEval: Evaluation = {
        id: Math.random().toString(36).substr(2, 9),
        evaluator: '管理员',
        department: '监管科',
        time: new Date().toLocaleString(),
        positiveTags: positive,
        negativeTags: negative
      };
      setEvaluations([newEval, ...evaluations]);
    }
  };

  const handleEdit = (item: Evaluation) => {
    setEditingEvaluation(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvaluations(evaluations.filter(e => e.id !== id));
  };

  const steps = [
    { id: 1, title: '预警信息接收', content: '系统自动接收来自各渠道的预警信息，并进行初步分类。' },
    { id: 2, title: '预警研判', content: '专家组对预警信息进行深度研判，确定预警等级及处置优先级。' },
    { id: 3, title: '任务分办', content: '根据研判结果，将任务分派至对应职能部门进行核查。' },
    { id: 4, title: '核查处置', content: '职能部门对预警事项进行实地核查，并提交处置方案。' },
    { id: 5, title: '结果反馈', content: '处置结果录入系统，并向相关方进行反馈公示。' },
    { id: 6, title: '处置评价', isSpecial: true },
    { id: 7, title: '流程归档', content: '所有流程记录及评价信息自动归档，进入历史库。' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Status Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border-l-4 border-blue-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">预警编号：</span>
            <span className="font-mono font-bold text-gray-900">YJ-20240415-001</span>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">当前状态：</span>
            <Badge className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              status === '已办结' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            )}>
              {status === '已办结' ? <CheckCircle2 size={12} className="mr-1 inline" /> : <Clock size={12} className="mr-1 inline" />}
              {status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 mr-2">模拟状态切换:</span>
          <Button 
            size="sm" 
            variant={status === '办理中' ? 'default' : 'outline'}
            onClick={() => setStatus('办理中')}
            className="h-8 text-xs"
          >
            办理中
          </Button>
          <Button 
            size="sm" 
            variant={status === '已办结' ? 'default' : 'outline'}
            onClick={() => setStatus('已办结')}
            className="h-8 text-xs"
          >
            已办结
          </Button>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id} className="overflow-hidden border-gray-200 shadow-sm transition-all hover:shadow-md">
            <CardHeader 
              className="py-4 px-6 bg-gray-50/50 flex flex-row items-center justify-between cursor-pointer select-none"
              onClick={() => toggleStep(step.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  step.isSpecial ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-200 text-gray-600"
                )}>
                  {step.id < 10 ? `0${step.id}` : step.id}
                </div>
                <CardTitle className={cn(
                  "text-base font-bold",
                  step.isSpecial ? "text-blue-700" : "text-gray-700"
                )}>
                  {step.title}
                </CardTitle>
              </div>
              {expandedSteps.includes(step.id) ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </CardHeader>

            <AnimatePresence>
              {expandedSteps.includes(step.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardContent className="p-6 bg-white">
                    {step.isSpecial ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <Button 
                            onClick={() => setIsModalOpen(true)}
                            disabled={status !== '已办结'}
                            className={cn(
                              "bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all",
                              status !== '已办结' && "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                            )}
                          >
                            <Plus size={18} className="mr-2" />
                            新增评价
                          </Button>
                          {status !== '已办结' && (
                            <div className="flex items-center text-amber-600 text-xs bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100">
                              <AlertCircle size={14} className="mr-1.5" />
                              当前预警信息状态为「已办结」时方可新增评价
                            </div>
                          )}
                        </div>

                        <div className="border rounded-lg overflow-hidden border-gray-100">
                          <Table>
                            <TableHeader className="bg-gray-50">
                              <TableRow>
                                <TableHead className="w-[100px] font-bold text-gray-700">评价人</TableHead>
                                <TableHead className="w-[120px] font-bold text-gray-700">评价部门</TableHead>
                                <TableHead className="w-[180px] font-bold text-gray-700">评价时间</TableHead>
                                <TableHead className="font-bold text-gray-700">正向评价</TableHead>
                                <TableHead className="font-bold text-gray-700">反向评价</TableHead>
                                <TableHead className="w-[120px] text-center font-bold text-gray-700">操作</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {evaluations.length > 0 ? (
                                evaluations.map((item) => (
                                  <TableRow key={item.id} className="hover:bg-gray-50/50">
                                    <TableCell className="font-medium">{item.evaluator}</TableCell>
                                    <TableCell className="text-gray-600">{item.department}</TableCell>
                                    <TableCell className="text-gray-500 text-xs font-mono">{item.time}</TableCell>
                                    <TableCell>
                                      <div className="flex flex-wrap gap-1.5">
                                        {item.positiveTags.map(tag => (
                                          <Badge key={tag} variant="outline" className="bg-green-50 text-green-700 border-green-100 font-normal py-0.5 px-2">
                                            {tag}
                                          </Badge>
                                        ))}
                                        {item.positiveTags.length === 0 && <span className="text-gray-300 text-xs">无</span>}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex flex-wrap gap-1.5">
                                        {item.negativeTags.map(tag => (
                                          <Badge key={tag} variant="outline" className="bg-red-50 text-red-700 border-red-100 font-normal py-0.5 px-2">
                                            {tag}
                                          </Badge>
                                        ))}
                                        {item.negativeTags.length === 0 && <span className="text-gray-300 text-xs">无</span>}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center justify-center space-x-2">
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                          onClick={() => handleEdit(item)}
                                        >
                                          <Edit2 size={14} />
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                          onClick={() => handleDelete(item.id)}
                                        >
                                          <Trash2 size={14} />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={6} className="h-32 text-center text-gray-400 text-sm">
                                    暂无评价数据
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 leading-relaxed">
                        {step.content}
                        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 italic">
                          此处展示该环节的具体业务表单或核查记录详情
                        </div>
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>

      <EvaluationModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingEvaluation(null);
        }} 
        onSubmit={handleAddEvaluation}
        initialPositive={editingEvaluation?.positiveTags}
        initialNegative={editingEvaluation?.negativeTags}
        isEditing={!!editingEvaluation}
      />
    </div>
  );
}
