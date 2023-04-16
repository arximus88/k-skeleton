export function dragScroll(node: HTMLElement): { destroy: () => void } {
	let isMouseDown = false;
	let startX: number | undefined;

	const onMouseDown = (event: MouseEvent) => {
		isMouseDown = true;
		startX = event.clientX;
	};

	const onMouseMove = (event: MouseEvent) => {
		if (!isMouseDown) return;
		const dx = startX! - event.clientX;
		node.scrollLeft += dx;
		startX = event.clientX;
	};

	const onMouseUp = () => {
		isMouseDown = false;
	};

	node.addEventListener('mousedown', onMouseDown);
	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseup', onMouseUp);

	return {
		destroy() {
			node.removeEventListener('mousedown', onMouseDown);
			node.removeEventListener('mousemove', onMouseMove);
			node.removeEventListener('mouseup', onMouseUp);
		}
	};
}
