const countMap = (array) => {
    const counts = new Map();
    for (let i = 0; i < array.length; i++) {
        const num = array[i];
        counts.set(num, counts.get(num) ? counts.get(num) + 1 : 1);
    }
    return counts;
}

export const deduplicator = (input, reruns) => {
    const featureLines = input.split('\n');
    const output = featureLines.map(line => {
        const elements = line.trim().split(':')
        const feature = elements[0];
        const scenarios = elements.slice(1);
        const scenarioCounts = countMap(scenarios);
        const buggyScenarios = [];
        for (let [k, v] of scenarioCounts) {
            if (v > reruns) {
                buggyScenarios.push(k);
            }
        }
        if (buggyScenarios.length === 0) {
            return '';
        }
        const deduplicated = [...new Set(buggyScenarios)];
        return `${feature}:${deduplicated.join(':')}`
    }).filter(line => {
        return line.length;
    })
    return output.join('\r\n');
}

if (typeof(window) !== 'undefined') {
    window.deduplicator = deduplicator;
}
