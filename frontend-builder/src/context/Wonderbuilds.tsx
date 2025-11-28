import React, { createContext, useContext, useState, ReactNode } from 'react';

// ===================================
// 1. Types and Interfaces
// ===================================

/**
 * Defines the structure for a single component element in the builder.
 * This is the basis for your 'multiple platforms' export.
 */
export interface BuilderElement {
    id: string;
    type: string; // e.g., 'Button', 'Container', 'Text', 'Image'
    content?: string;
    // For 'Tie-Dye' level customization: store dynamic/unique styling
    styles: Record<string, any>; 
    children: BuilderElement[]; 
}

export type ProjectStructure = BuilderElement[];

/**
 * Defines the state and actions available globally in the builder.
 */
interface WonderBuildContextProps {
    projectStructure: ProjectStructure;
    selectedElementId: string | null;
    
    // Actions for the builder:
    addComponent: (itemType: string, parentId: string | null, index: number) => void;
    selectElement: (id: string | null) => void;
    updateElementStyles: (id: string, newStyles: Record<string, any>) => void;
    // Placeholder for recovery actions:
    loadProject: (structure: ProjectStructure) => void; 
}

// ===================================
// 2. Context Setup
// ===================================

const WonderBuildContext = createContext<WonderBuildContextProps | undefined>(undefined);

/**
 * The Provider component that wraps your entire application.
 * It manages the state and logic for the project structure.
 */
export const WonderBuildContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [projectStructure, setProjectStructure] = useState<ProjectStructure>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

    // --- Action Implementations ---

    // Utility function to generate a new element instance
    const createElement = (type: string): BuilderElement => ({
        id: crypto.randomUUID(), // Use a robust ID generator
        type,
        content: type === 'Button' ? 'Click Me' : type,
        styles: { /* default responsive styles go here */ },
        children: [],
    });

    const addComponent = (itemType: string, parentId: string | null, index: number) => {
        const newElement = createElement(itemType);

        setProjectStructure(prevStructure => {
            // NOTE: For a deep, Framer-like implementation, you must write 
            // a recursive function to find the 'parentId' and splice the 
            // 'newElement' at the 'index'.
            
            // Simplified logic: always add to the root structure
            const newStructure = [...prevStructure];
            
            if (index === -1 || index >= newStructure.length) {
                newStructure.push(newElement); // Add to end
            } else {
                newStructure.splice(index, 0, newElement); // Insert at index
            }
            return newStructure;
        });

        // Auto-select the newly added element
        setSelectedElementId(newElement.id);
    };

    const selectElement = (id: string | null) => {
        setSelectedElementId(id);
    };
    
    const updateElementStyles = (id: string, newStyles: Record<string, any>) => {
         // Placeholder: Implement deep-tree traversal logic here
         console.log(`Action: Updating styles for ${id}`, newStyles);
    };

    const loadProject = (structure: ProjectStructure) => {
        setProjectStructure(structure);
        setSelectedElementId(null);
    };

    const contextValue: WonderBuildContextProps = {
        projectStructure,
        selectedElementId,
        addComponent,
        selectElement,
        updateElementStyles,
        loadProject,
    };

    return (
        <WonderBuildContext.Provider value={contextValue}>
            {children}
        </WonderBuildContext.Provider>
    );
};

// ===================================
// 3. Custom Hook (Consumer)
// ===================================

/**
 * Custom hook for consuming the context.
 */
export const useWonderBuildContext = () => {
    const context = useContext(WonderBuildContext);
    if (context === undefined) {
        throw new Error('useWonderBuildContext must be used within a WonderBuildContextProvider');
    }
    return context;
};
      
