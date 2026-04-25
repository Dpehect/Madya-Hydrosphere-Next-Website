"use client";
import React from 'react';
import ReactFlow, { 
  Background, 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from "framer-motion";
const initialNodes = [
  { id: '1', type: 'input', data: { label: 'MAZ Çekirdek' }, position: { x: 250, y: 5 }, style: { background: '#00f3ff', color: '#000', border: 'none', borderRadius: '15px', padding: '10px', fontSize: '10px', fontWeight: 'bold' } },
  { id: '2', data: { label: 'Bölge S-1' }, position: { x: 100, y: 100 }, style: { background: '#111', color: '#fff', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '10px', fontSize: '8px' } },
  { id: '3', data: { label: 'Bölge S-2' }, position: { x: 400, y: 100 }, style: { background: '#111', color: '#fff', border: '1px solid rgba(0,243,255,0.3)', borderRadius: '10px', fontSize: '8px' } },
  { id: '4', type: 'output', data: { label: 'Aktif Akış Onayı' }, position: { x: 250, y: 200 }, style: { background: 'rgba(0,243,255,0.1)', color: '#00f3ff', border: '1px solid #00f3ff', borderRadius: '10px', fontSize: '8px' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#00f3ff' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#00f3ff' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#00f3ff' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#00f3ff' } },
];
export default function NeuralMap() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[300px] glass rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 mt-8"
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        style={{ background: 'transparent' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#00f3ff" gap={20} size={1} opacity={0.05} />
      </ReactFlow>
    </motion.div>
  );
}
