const svg = document.getElementById('canvas');
const svgNS = svg.namespaceURI;
const initialState = [
	[4, 0, 0, 5, 0, 0, 0, 4, 0, 3],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 7, 0, 0, 0, 0, 0, 5],
	[0, 0, 0, 0, 0, 0, 1, 0, 2, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 5, 0, 0, 0, 0, 3, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
	[4, 0, 0, 0, 0, 0, 4, 0, 3, 0],
];
const used = Array.from(Array(10), () => Array(10).fill(0));
const bridges = [];
let firstEl, secondEl;
initialize();

function initialize() {
	for (let j = 0; j < 10; j++) {
		for (let i = 0; i < 10; i++) {
			if (initialState[j][i] !== 0) {
				const group = document.createElementNS(svgNS, 'g');
				group.classList.add('node');
				group.setAttribute('data-x', i);
				group.setAttribute('data-y', j);
				svg.appendChild(group);
				const circle = document.createElementNS(svgNS, 'circle');
				circle.classList.add('island');
				circle.setAttribute('cx', i * 100);
				circle.setAttribute('cy', j * 100);
				group.appendChild(circle);
				const label = document.createElementNS(svgNS, 'text');
				label.innerHTML = initialState[j][i];
				label.classList.add('label');
				label.setAttribute('x', i * 100);
				label.setAttribute('y', j * 100);
				group.appendChild(label);
			}
		}
	}

	svg.addEventListener('mousedown', (e) => {
		if(e.target.tagName == 'circle') {
			firstEl = e.target;
		}
	});

	svg.addEventListener('mouseup', (e) => {
		if(e.target.tagName == 'circle') {
			secondEl = e.target;
			if (firstEl != secondEl) {
				maybeConnect(firstEl.parentElement, secondEl.parentElement);
			}
		}
	});
}

function maybeConnect(g1, g2) {
	const x1 = g1.getAttribute('data-x');
	const y1 = g1.getAttribute('data-y');
	const x2 = g2.getAttribute('data-x');
	const y2 = g2.getAttribute('data-y');
	const bridge = document.createElementNS(svgNS, 'line');
	bridge.classList.add('bridge');
	bridge.setAttribute('x1', x1 * 100);
	bridge.setAttribute('y1', y1 * 100);
	bridge.setAttribute('x2', x2 * 100);
	bridge.setAttribute('y2', y2 * 100);
	svg.appendChild(bridge);
	bridges.push([x1, y1, x2, y2]);

	const label1 = g1.querySelectorAll('.label')[0];
	used[y1][x1]++;
	label1.innerHTML = initialState[y1][x1] - used[y1][x1];
	const label2 = g2.querySelectorAll('.label')[0];
	used[y2][x2]++;
	label2.innerHTML = initialState[y2][x2] - used[y2][x2];

}