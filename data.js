export const simulationData = {
    ants: []
};

function cloneRules(rules) {
    return JSON.parse(JSON.stringify(rules));
}


export function recordAntBirth(ant, tick) {
    simulationData.ants.push({
        tick,

        genome: {
            mean: ant.genome.mean,
            variance: ant.genome.variance
        },

        rules: cloneRules(ant.rules),

        parentIds: ant.parentIds || [],

        stateCount: Object.keys(ant.rules).length
    });

    console.log(`Ant born at tick ${tick}`  + (ant.parentIds ? ` with parents ${ant.parentIds.join(', ')}` : '') + ` and genome (mean: ${ant.genome.mean.toFixed(3)}, variance: ${ant.genome.variance.toFixed(3)})`);
}

export function exportSimulationData(tick) {
    const dataStr = JSON.stringify(simulationData, null, 2);

    const blob = new Blob([dataStr], {
        type: 'application/json'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `simulation_data_tick_${tick}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    console.log(`Exported simulation data at tick ${tick}`);
}