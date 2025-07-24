import { useEffect, useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

interface MindMapData {
  galaxies: Node[];
  galaxyNotes: { [key: string]: Node[] };
  galaxyEdges: { [key: string]: Edge[] };
  currentGalaxy: string | null;
  viewMode: 'galaxies' | 'notes';
  lastSaved: number;
}

const STORAGE_KEY = 'galaxy-mindmap-data';
const AUTO_SAVE_DELAY = 2000; // 2 seconds

export const useAutoSave = () => {
  const saveData = useCallback((data: MindMapData) => {
    try {
      const dataWithTimestamp = {
        ...data,
        lastSaved: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithTimestamp));
      console.log('Mind map auto-saved successfully');
    } catch (error) {
      console.error('Failed to save mind map data:', error);
    }
  }, []);

  const loadData = useCallback((): MindMapData | null => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        console.log('Mind map data loaded successfully');
        return parsed;
      }
    } catch (error) {
      console.error('Failed to load mind map data:', error);
    }
    return null;
  }, []);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Mind map data cleared');
    } catch (error) {
      console.error('Failed to clear mind map data:', error);
    }
  }, []);

  // Auto-save with debouncing
  const debouncedSave = useCallback((data: MindMapData) => {
    const timeoutId = setTimeout(() => {
      saveData(data);
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [saveData]);

  return {
    saveData,
    loadData,
    clearData,
    debouncedSave,
    lastSaved: null
  };
};

export const getLastSavedTime = (): string | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.lastSaved) {
        return new Date(parsed.lastSaved).toLocaleString();
      }
    }
  } catch (error) {
    console.error('Failed to get last saved time:', error);
  }
  return null;
};