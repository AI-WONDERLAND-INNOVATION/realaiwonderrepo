import React, { useState, useEffect } from 'react';
import { useWonderBuildContext, BuilderElement } from '@/contexts/WonderBuildContext'; 

// Utility function to recursively find an element by ID
const findElementById = (elements: BuilderElement[], id: string): BuilderElement | undefined => {
    for (const element of elements) {
        if (element.id === id) return element;
        if (element.children.length) {
            const foundChild = findElementById(element.children, id);
            if (foundChild) return foundChild;
        }
    }
    return undefined;
};

/**
 * @file PropertiesPanel.tsx
 * @description Displays the editable properties (styles, content) of the currently selected element.
 */
const PropertiesPanel: React.FC = () => {
    const { 
        projectStructure, 
        selectedElementId, 
        updateElementStyles 
    } = useWonderBuildContext();

    // Find the currently selected element
    const selectedElement = selectedElementId 
        ? findElementById(projectStructure, selectedElementId) 
        : undefined;

    // Local state to manage form inputs (Content and Styles)
    const [localContent, setLocalContent] = useState('');
    const [localStyles, setLocalStyles] = useState<Record<string, string>>({});

    // 1. Update local state when a new element is selected
    useEffect(() => {
        if (selectedElement) {
            setLocalContent(selectedElement.content || '');
            // Convert styles object to a local string/state format for form input
            setLocalStyles(selectedElement.styles || {});
        } else {
            setLocalContent('');
            setLocalStyles({});
        }
    }, [selectedElement]);

    // 2. Handle changes to the content input
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setLocalContent(newContent);
        
        // **TODO:** Implement updateElementContent function in WonderBuildContext
        // For now, let's focus on styles/content update via one mechanism:
        // updateElementStyles(selectedElementId!, { ...localStyles, content: newContent });
    };

    // 3. Handle changes to the style inputs (e.g., Background Color)
    const handleStyleChange = (key: string, value: string) => {
        const newStyles = { ...localStyles, [key]: value };
        setLocalStyles(newStyles);
        
        if (selectedElementId) {
            // Call the context action to update the element's styles in the global state
            updateElementStyles(selectedElementId, newStyles);
        }
    };

    // --- Render Logic ---

    if (!selectedElement) {
        return (
            <div style={styles.panelContainer}>
                <h3 style={styles.header}>Properties Panel</h3>
                <div style={styles.noSelection}>
                    Click an element on the canvas to view and edit its properties.
                </div>
            </div>
        );
    }

    return (
        <div style={styles.panelContainer}>
            <h3 style={styles.header}>Properties: {selectedElement.type}</h3>
            <p style={styles.elementId}>ID: {selectedElement.id}</p>

            {/* --- 4. Content Editor (Visible for Text/Button types) --- */}
            {(selectedElement.type === 'Text' || selectedElement.type === 'Button' || selectedElement.type === 'Header') && (
                <div style={styles.section}>
                    <label style={styles.label}>Content / Text</label>
                    <textarea
                        value={localContent}
                        onChange={handleContentChange}
                        style={styles.inputArea}
                        rows={3}
                    />
                </div>
            )}

            {/* --- 5. Style Editor (Tie-Dye Customization Focus) --- */}
            <div style={styles.section}>
                <h4 style={styles.sectionHeader}>Layout & Style</h4>
                
                {/* Example 1: Background Color */}
                <label style={styles.label}>Background Color</label>
                <input
                    type="color"
                    value={localStyles.backgroundColor || '#ffffff'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    style={styles.colorInput}
                />
                
                {/* Example 2: Padding (Tie-Dye complexity requires many inputs here) */}
                <label style={styles.label}>Padding (e.g., "16px 20px")</label>
                <input
                    type="text"
                    value={localStyles.padding || ''}
                    onChange={(e) => handleStyleChange('padding', e.target.value)}
                    style={styles.textInput}
                    placeholder="10px"
                />
                
                {/* Placeholder for the AI Styling Integration */}
                <button 
                    onClick={() => console.log('Call AI service to suggest styles!')} 
                    style={styles.aiButton}
                >
                    🎨 Tie-Dye Suggestion (AI)
                </button>
            </div>
        </div>
    );
};

export default PropertiesPanel;

// --- Basic Inline Styles (Reflects a typical builder sidebar look) ---
const styles = {
    panelContainer: {
        width: '300px',
        height: '100%',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderLeft: '1px solid #e0e0e0',
        overflowY: 'auto' as const,
    },
    header: {
        fontSize: '1.4rem',
        marginBottom: '15px',
        color: '#333',
    },
    elementId: {
        fontSize: '0.75rem',
        color: '#888',
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    },
    noSelection: {
        textAlign: 'center' as const,
        color: '#6b7280',
        padding: '50px 0',
        border: '1px dashed #ddd',
        borderRadius: '8px',
    },
    section: {
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee',
    },
    sectionHeader: {
        fontSize: '1rem',
        marginBottom: '10px',
        color: '#3b82f6',
        fontWeight: 'bold' as const,
    },
    label: {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600' as const,
        marginBottom: '5px',
        marginTop: '10px',
        color: '#555',
    },
    inputArea: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box' as const,
        resize: 'vertical' as const,
    },
    textInput: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box' as const,
    },
    colorInput: {
        width: '100%',
        height: '40px',
        padding: '3px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box' as const,
    },
    aiButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold' as const,
        marginTop: '15px',
        transition: 'background-color 0.2s',
    }
};
      
