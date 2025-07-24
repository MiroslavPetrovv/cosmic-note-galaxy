import React, { useCallback, useState, useRef, useEffect } from 'react';
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
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { NoteNode } from './NoteNode';
import { GalaxyNode } from './GalaxyNode';
import { ThemeToggle } from './ThemeToggle';
import { Toolbar } from './Toolbar';
import { EditSidebar } from './EditSidebar';
import { ReadSidebar } from './ReadSidebar';
import { SearchBar } from './SearchBar';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/hooks/useAutoSave';
import { getDefaultGalaxies, getDefaultGalaxyNotes, updateGalaxyNoteCounts } from '@/utils/storage';

const nodeTypes = {
  note: NoteNode,
  galaxy: GalaxyNode,
};


export const MindMap = () => {
  // Auto-save hook
  const { saveData, loadData, debouncedSave } = useAutoSave();
  
  // Dynamic state management
  const [viewMode, setViewMode] = useState<'galaxies' | 'notes'>('galaxies');
  const [currentGalaxy, setCurrentGalaxy] = useState<string | null>(null);
  const [galaxies, setGalaxies] = useState<Node[]>(getDefaultGalaxies());
  const [galaxyNotes, setGalaxyNotes] = useState<{[key: string]: Node[]}>(getDefaultGalaxyNotes());
  const [nodes, setNodes, onNodesChange] = useNodesState(getDefaultGalaxies());
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [galaxyEdges, setGalaxyEdges] = useState<{[key: string]: Edge[]}>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isReadSidebarOpen, setIsReadSidebarOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [readingNote, setReadingNote] = useState<any>(null);
  const [linkingMode, setLinkingMode] = useState(false);
  const [linkingFrom, setLinkingFrom] = useState<string | null>(null);
  const nodeIdRef = useRef(100);
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadData();
    if (savedData) {
      setGalaxies(savedData.galaxies);
      setGalaxyNotes(savedData.galaxyNotes);
      setGalaxyEdges(savedData.galaxyEdges);
      setViewMode(savedData.viewMode);
      setCurrentGalaxy(savedData.currentGalaxy);
      
      // Set initial view based on saved state
      if (savedData.viewMode === 'galaxies') {
        setNodes(savedData.galaxies);
        setEdges([]);
      } else if (savedData.currentGalaxy && savedData.galaxyNotes[savedData.currentGalaxy]) {
        setNodes(savedData.galaxyNotes[savedData.currentGalaxy]);
        setEdges(savedData.galaxyEdges[savedData.currentGalaxy] || []);
      }
      
      toast({
        title: "Mind Map Restored",
        description: "Your previous work has been loaded successfully.",
      });
    }
  }, [loadData, setNodes, setEdges, toast]);

  // Auto-save when data changes
  useEffect(() => {
    const currentData = {
      galaxies: updateGalaxyNoteCounts(galaxies, galaxyNotes),
      galaxyNotes,
      galaxyEdges,
      currentGalaxy,
      viewMode,
      lastSaved: Date.now()
    };

    const clearSaveTimeout = debouncedSave(currentData);
    return clearSaveTimeout;
  }, [galaxies, galaxyNotes, galaxyEdges, currentGalaxy, viewMode, debouncedSave]);

  // Auto-save current galaxy notes when switching views
  useEffect(() => {
    if (currentGalaxy && viewMode === 'notes') {
      setGalaxyNotes(prev => ({
        ...prev,
        [currentGalaxy]: nodes.filter(node => node.type === 'note')
      }));
    }
  }, [nodes, currentGalaxy, viewMode]);

  // Auto-save current galaxy edges
  useEffect(() => {
    if (currentGalaxy && viewMode === 'notes') {
      setGalaxyEdges(prev => ({
        ...prev,
        [currentGalaxy]: edges
      }));
    }
  }, [edges, currentGalaxy, viewMode]);

  // Enhanced node data with action handlers
  const enhanceNodeData = useCallback((node: Node) => {
    if (node.type === 'note') {
      return {
        ...node,
        data: {
          ...node.data,
          onEdit: (noteId: string) => {
            const nodeData = {
              id: node.id,
              title: node.data.title,
              content: node.data.content,
              theme: node.data.theme
            };
            setEditingNote(nodeData);
            setIsEditSidebarOpen(true);
          },
          onRead: (noteId: string) => {
            const nodeData = {
              id: node.id,
              title: node.data.title,
              content: node.data.content,
              theme: node.data.theme
            };
            setReadingNote(nodeData);
            setIsReadSidebarOpen(true);
          },
          onLink: (noteId: string) => {
            if (linkingMode && linkingFrom && linkingFrom !== noteId) {
              // Create connection
              const newEdge = {
                id: `edge-${linkingFrom}-${noteId}`,
                source: linkingFrom,
                target: noteId,
                type: 'smoothstep',
                style: { stroke: 'hsl(var(--galaxy-connection))', strokeWidth: 2 },
                animated: true,
              };
              setEdges((eds) => addEdge(newEdge, eds));
              setLinkingMode(false);
              setLinkingFrom(null);
              toast({
                title: "Notes Connected",
                description: "Successfully linked your notes together.",
              });
            } else {
              setLinkingMode(true);
              setLinkingFrom(noteId);
              toast({
                title: "Link Mode Active",
                description: "Click another note to create a connection.",
              });
            }
          },
        },
      };
    }
    return node;
  }, [linkingMode, linkingFrom, setEdges, toast]);

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

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'galaxy' && viewMode === 'galaxies') {
      // Zoom into galaxy
      const galaxyNotesList = galaxyNotes[node.id] || [];
      setCurrentGalaxy(node.id);
      setViewMode('notes');
      setNodes(galaxyNotesList);
      // Restore edges for this galaxy if they exist
      const savedEdges = galaxyEdges[node.id] || [];
      setEdges(savedEdges);
      toast({
        title: `Entered ${node.data.name} Galaxy`,
        description: `Now viewing ${galaxyNotesList.length} notes in this galaxy.`,
      });
    }
  }, [viewMode, setNodes, setEdges, galaxyNotes, galaxyEdges, toast]);

  const addNewNote = useCallback(() => {
    if (viewMode === 'galaxies') {
      toast({
        title: "Navigate to a Galaxy",
        description: "Click on a galaxy to add notes to it.",
      });
      return;
    }

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
        galaxy: currentGalaxy || 'Unknown',
      },
    };

    setNodes((nds) => [...nds, newNode]);
    toast({
      title: "Note Created",
      description: "A new note has been added to your galaxy.",
    });
  }, [viewMode, currentGalaxy, setNodes, toast]);

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

  const navigateToGalaxies = useCallback(() => {
    // Save current galaxy edges before leaving
    if (currentGalaxy && edges.length > 0) {
      setGalaxyEdges(prev => ({
        ...prev,
        [currentGalaxy]: edges
      }));
    }
    
    setViewMode('galaxies');
    setCurrentGalaxy(null);
    setNodes(galaxies);
    setEdges([]);
    setLinkingMode(false);
    setLinkingFrom(null);
    toast({
      title: "Zoomed Out",
      description: "Now viewing all galaxies.",
    });
  }, [setNodes, setEdges, currentGalaxy, edges, galaxies, toast]);

  const handleSearch = useCallback((query: string) => {
    const results: any[] = [];
    
    // Search through all galaxy notes
    Object.entries(galaxyNotes).forEach(([galaxyId, notes]) => {
      const galaxyName = galaxies.find(g => g.id === galaxyId)?.data.name || 'Unknown';
      notes.forEach(note => {
        const title = String(note.data.title || '');
        const content = String(note.data.content || '');
        if (
          title.toLowerCase().includes(query.toLowerCase()) ||
          content.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            id: note.id,
            title: note.data.title,
            content: note.data.content,
            galaxy: galaxyName,
            theme: note.data.theme,
            galaxyId,
          });
        }
      });
    });
    
    return results;
  }, [galaxyNotes, galaxies]);

  const navigateToNote = useCallback((noteId: string) => {
    const result = handleSearch('').find(r => r.id === noteId);
    if (result) {
      // Navigate to the galaxy containing the note
      const galaxyNotesList = galaxyNotes[result.galaxyId as keyof typeof galaxyNotes] || [];
      setCurrentGalaxy(result.galaxyId);
      setViewMode('notes');
      setNodes(galaxyNotesList);
      setEdges([]);
      
      // Focus on the specific note
      setTimeout(() => {
        const noteElement = document.querySelector(`[data-id="${noteId}"]`);
        if (noteElement) {
          noteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      toast({
        title: "Note Found",
        description: `Navigated to "${result.title}" in ${result.galaxy} galaxy.`,
      });
    }
  }, [handleSearch, setNodes, setEdges, toast]);

  const handleSaveNote = useCallback((noteId: string, title: string, content: string) => {
    setNodes((nds) => nds.map(node => 
      node.id === noteId 
        ? { ...node, data: { ...node.data, title, content } }
        : node
    ));
    toast({
      title: "Note Saved",
      description: "Your changes have been saved.",
    });
  }, [setNodes, toast]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Enhanced nodes with action handlers
  const enhancedNodes = nodes.map(enhanceNodeData);

  return (
    <div className={`h-screen w-full transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <ReactFlow
        nodes={enhancedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
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

        <Panel position="top-left" className="flex flex-col gap-2 max-w-sm">
          <Toolbar 
            onAddNote={addNewNote}
            onDeleteSelected={deleteSelectedNodes}
            onNavigateToGalaxies={viewMode === 'notes' ? navigateToGalaxies : undefined}
            viewMode={viewMode}
            currentGalaxy={currentGalaxy}
            linkingMode={linkingMode}
            onCancelLinking={() => {
              setLinkingMode(false);
              setLinkingFrom(null);
            }}
          />
          <SearchBar 
            onSearch={handleSearch}
            onNavigateToNote={navigateToNote}
          />
        </Panel>

        <Panel position="top-right">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </Panel>

        <Panel position="bottom-center" className="text-center max-w-2xl">
          <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-galaxy-node-border shadow-galaxy-node">
            <p className="text-sm text-muted-foreground">
              <strong>Galaxy Mind Map</strong>
              <br />
              {viewMode === 'galaxies' 
                ? 'Click galaxies to explore • Search to find notes'
                : `${currentGalaxy ? galaxies.find(g => g.id === currentGalaxy)?.data.name : 'Notes'} Galaxy • Hover notes for actions • Link mode: ${linkingMode ? 'ON' : 'OFF'}`
              }
            </p>
          </div>
        </Panel>
      </ReactFlow>

      <EditSidebar
        isOpen={isEditSidebarOpen}
        onClose={() => {
          setIsEditSidebarOpen(false);
          setEditingNote(null);
        }}
        noteData={editingNote}
        onSave={handleSaveNote}
      />

      <ReadSidebar
        isOpen={isReadSidebarOpen}
        onClose={() => {
          setIsReadSidebarOpen(false);
          setReadingNote(null);
        }}
        noteData={readingNote}
        onEdit={(noteId) => {
          setIsReadSidebarOpen(false);
          setEditingNote(readingNote);
          setIsEditSidebarOpen(true);
        }}
        onLink={(noteId) => {
          setIsReadSidebarOpen(false);
          if (linkingMode && linkingFrom && linkingFrom !== noteId) {
            const newEdge = {
              id: `edge-${linkingFrom}-${noteId}`,
              source: linkingFrom,
              target: noteId,
              type: 'smoothstep',
              style: { stroke: 'hsl(var(--galaxy-connection))', strokeWidth: 2 },
              animated: true,
            };
            setEdges((eds) => addEdge(newEdge, eds));
            setLinkingMode(false);
            setLinkingFrom(null);
            toast({
              title: "Notes Connected",
              description: "Successfully linked your notes together.",
            });
          } else {
            setLinkingMode(true);
            setLinkingFrom(noteId);
            toast({
              title: "Link Mode Active",
              description: "Click another note to create a connection.",
            });
          }
        }}
      />
    </div>
  );
};