import { useRef, useState } from 'react';

/**
 * useDragDrop - React hook for drag-and-drop functionality
 * Usage:
 *   const { dragProps, dropProps, isDragging, isOver } = useDragDrop({ onDrop })
 */
export function useDragDrop({ onDrop }) {
	const dragRef = useRef(null);
	const dropRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isOver, setIsOver] = useState(false);

	const dragProps = {
		ref: dragRef,
		draggable: true,
		onDragStart: () => setIsDragging(true),
		onDragEnd: () => setIsDragging(false),
	};

	const dropProps = {
		ref: dropRef,
		onDragOver: (e) => {
			e.preventDefault();
			setIsOver(true);
		},
		onDragLeave: () => setIsOver(false),
		onDrop: (e) => {
			e.preventDefault();
			setIsOver(false);
			if (onDrop) onDrop(e);
		},
	};

	return { dragProps, dropProps, isDragging, isOver };
}
