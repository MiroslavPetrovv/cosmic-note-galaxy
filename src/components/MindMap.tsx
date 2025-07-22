import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  ConnectionMode,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { NoteNode } from './NoteNode';
import { ThemeToggle } from './ThemeToggle';
import { Toolbar } from './Toolbar';
import { useToast } from '@/hooks/use-toast';

const nodeTypes = {
  note: NoteNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'note',
    position: { x: 250, y: 250 },
    data: { 
      title: 'Welcome to Galaxy Mind',
      content: 'This is your first note. Double-click to edit, drag to move, and connect to other notes.',
      theme: 'royal'
    },
  },
  {
    id: '2',
    type: 'note',
    position: { x: 550, y: 100 },
    data: { 
      title: 'Ideas',
      content: 'Collect your thoughts and ideas here. Link them together to see connections.',
      theme: 'cosmic'
    },
  },
  {
    id: '3',
    type: 'note',
    position: { x: 100, y: 400 },
    data: { 
      title: 'Projects',
      content: 'Track your projects and their relationships.',
      theme: 'stellar'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--galaxy-connection))', strokeWidth: 2 },
    animated: true,
  },
];

export const MindMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const nodeIdRef = useRef(4);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        style: { stroke: 'hsl(var(--galaxy-connection))', strokeWidth: 2 },
        animated: true,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      toast({
        title: "Notes Connected",
        description: "Successfully linked your notes together.",
      });
    },
    [setEdges, toast]
  );

  const addNewNote = useCallback(() => {
    const newId = String(nodeIdRef.current++);
    const themes = ['royal', 'cosmic', 'stellar', 'nebula'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    const newNode: Node = {
      id: newId,
      type: 'note',
      position: {
        x: Math.random() * 500 + 200,
        y: Math.random() * 400 + 100,
      },
      data: {
        title: 'New Note',
        content: 'Start writing your thoughts...',
        theme: randomTheme,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    toast({
      title: "Note Created",
      description: "A new note has been added to your galaxy.",
    });
  }, [setNodes, toast]);

  const deleteSelectedNodes = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => 
      !nodes.some(node => 
        node.selected && (edge.source === node.id || edge.target === node.id)
      )
    ));
    toast({
      title: "Notes Deleted",
      description: "Selected notes have been removed from your galaxy.",
    });
  }, [setNodes, setEdges, nodes, toast]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`h-screen w-full transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-gradient-galaxy"
        style={{
          background: 'var(--gradient-galaxy)',
        }}
      >
        <Background 
          variant={"dots" as any}
          gap={40} 
          size={2}
          color="hsl(var(--galaxy-glow) / 0.3)"
          style={{
            backgroundColor: 'transparent',
          }}
        />
        
        <Controls 
          className="!bg-card !border-galaxy-node-border !shadow-galaxy-node"
          showInteractive={false}
        />

        <Panel position="top-left" className="flex gap-2">
          <Toolbar 
            onAddNote={addNewNote}
            onDeleteSelected={deleteSelectedNodes}
          />
        </Panel>

        <Panel position="top-right">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </Panel>

        <Panel position="bottom-center" className="text-center">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-galaxy-node-border shadow-galaxy-node">
            <p className="text-sm text-muted-foreground">
              <strong>Galaxy Mind Map</strong> • Drag to pan • Scroll to zoom • Double-click notes to edit • Drag from node edges to connect
            </p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};