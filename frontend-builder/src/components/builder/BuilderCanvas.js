// frontend-builder/src/components/builder/BuilderCanvas.js

import React, { useRef } from 'react';
// Import the necessary hook and context
import { useWonderBuildContext } from '@/contexts/WonderBuildContext'; 
import { useDragDrop } from '@/hooks/useDragDrop'; 

// Placeholder component for rendering individual elements
// You will create this file: frontend-builder/src/components/builder/ElementWrapper.js
const ElementWrapper = ({ element }) => {
    // This component will recursively render the element and its children
    // and apply the .is-selected class based on the selectedElementId state.
    const { selectedElementId, selectElement } = useWonderBuildContext();
    const isSelected = selectedElementId === element.id;

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent canvas click handler from overriding
        selectElement(element.id);
    };

    return (
        <div 
            id={element.id}
            onClick={handleClick}
            className={`
                canvas-element-wrapper 
                ${isSelected ? 'is-selected' : ''}
                /* Use the element's type to render the actual component */
                element-type-${element.type.toLowerCase()} 
            `}
        >
            {/* // Placeholder: In a real builder, you would use a Component Map here:
                const Component = ComponentMap[element.type] || 'div';
                <Component {...element.styles}>
                    {element.children.map(child => <ElementWrapper key={child.id} element={child} />)}
                </Component> 
            */}
            
            {/* Simple display for testing: */}
            <p style={{ margin: '10px' }}>
                **[{element.type}]** {element.content || 'Container'} 
                {isSelected && <span style={{ color: 'blue', marginLeft: '10px' }}>[Selected]</span>}
            </p>
        </div>
    );
};


const BuilderCanvas = () => {
    // 1. Consume the project state and actions
    const { 
        projectStructure, 
        addComponent, 
        selectElement 
    } = useWonderBuildContext();

    // --- Drop Handler ---
    const handleDrop = (e, droppedItem) => {
        // When an item is dropped, call the context action.
        // For now, we use simple root addition (parentId: null, index: -1)
        addComponent(droppedItem.type, null, -1);
        
        // You would later calculate the insertion index based on e.clientY/e.clientX
    };

    // 2. Consume the drag-and-drop properties
    const { dropProps, isOver } = useDragDrop({ onDrop: handleDrop });

    // Handle clicks on the canvas itself (to deselect any element)
    const handleCanvasClick = () => {
        selectElement(null);
    };

    return (
        <div 
            // 3. Attach the drop props from the hook
            {...dropProps}
            onClick={handleCanvasClick}
            className={`
                builder-canvas 
                ${isOver ? 'drop-zone-highlight' : ''}
            `}
            // Ensure the canvas has a minimum size for dropping
            style={{ minHeight: '80vh' }}
        >
            {/* 4. Render the project structure */}
            {projectStructure.length > 0 ? (
                projectStructure.map(element => (
                    <ElementWrapper 
                        key={element.id} 
                        element={element} 
                    />
                ))
            ) : (
                <div className="text-center text-gray-500 mt-20 p-20">
                    <p>🏗️ Start building! Drag your first component here.</p>
                </div>
            )}
        </div>
    );
};

export default BuilderCanvas;
