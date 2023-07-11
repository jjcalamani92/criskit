
/**
 * @param {{ dispatchEvent: (arg0: CustomEvent<any>) => void; addEventListener: (arg0: string, arg1: { (): void; (): void; }) => void; removeEventListener: (arg0: string, arg1: { (): void; (): void; }) => void; }} node
 * @param {number | undefined} duration
 */
export function longpress(node, duration) {
	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let timer;

	const handleMousedown = () => {
		timer = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	};

	const handleMouseup = () => {
		clearTimeout(timer);
	};

	node.addEventListener('mousedown', handleMousedown);
	node.addEventListener('mouseup', handleMouseup);

	return {
		/**
		 * @param {any} newDuration
		 */
		update(newDuration) {
			duration = newDuration;
		},
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
			node.removeEventListener('mouseup', handleMouseup);
		}
	};
}
