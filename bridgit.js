const svg = document.getElementById('canvas');
const svgNS = svg.namespaceURI;
const map = [
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
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
		if (map[j][i] !== 0) {
			const circle = document.createElementNS(svgNS, 'circle');
			circle.classList.add('island');
			circle.setAttribute('cx', i * 100);
			circle.setAttribute('cy', j * 100);
			svg.appendChild(circle);
			const label = document.createElementNS(svgNS, 'text');
			label.innerHTML = map[j][i];
			label.classList.add('label');
			label.setAttribute('x', i * 100);
			label.setAttribute('y', j * 100);
			svg.appendChild(label);
		}
	}
}
