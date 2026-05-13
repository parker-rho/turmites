// The Genome class is simply a normally distributed random variable from which the 
// colors used in the rules of the ant will be sampled.
export class Genome {
    constructor(
        mean = 0, 
        variance = 2
    ) {
        this.mean = mean;
        this.variance = variance;
    }
}

// Helper function to generate the possible move options based on user selections
export function generateMoveOptions() {
    const moveRelativeCheck = document.getElementById('moveRelativeCheck');
    const moveAbsoluteCheck = document.getElementById('moveAbsoluteCheck');
    const moveRandomCheck = document.getElementById('moveRandomCheck');

    const useRelative = moveRelativeCheck ? moveRelativeCheck.checked : true;
    const useAbsolute = moveAbsoluteCheck ? moveAbsoluteCheck.checked : false;
    const useRandom = moveRandomCheck ? moveRandomCheck.checked : false;

    let moveOptions = ['S']; // 'S' is always available
    if (useRelative) {
        moveOptions.push('L', 'R', 'N', 'U');
    }
    if (useAbsolute) {
        moveOptions.push('^', '>', 'v', '<');
    }
    if (useRandom) {
        moveOptions.push('?');
    }
    if (moveOptions.length === 0) moveOptions.push('N'); // Fallback if all are somehow unchecked

    return moveOptions;
}

// Use the methods we learned in class to sample from a normal distribution.
function uniformNormalSample(mean, variance) {
    const theta = Math.random();
    const U = Math.random();
    const R = Math.sqrt(2 * Math.log(1/(1 - U)));

    const X = R * Math.cos(2 * Math.PI * theta);
    
    return Math.sqrt(variance) * X + mean;
}

// This function generates a new ant with rules based on the genomes of its parents. 
// The child will inherit a genome which is the average of the parent's genomes.
export function generateEvolvingAnt(numStates, numColors, p1, p2) {
    const antSpecificRules = {};
    const moveOptions = generateMoveOptions();

    const genome = new Genome((p1.mean + p2.mean)/2, (p1.variance + p2.variance)/4);

    for (let s = 0; s < numStates; s++) {
        antSpecificRules[s] = [];
        for (let c = 0; c < numColors; c++) {
            let writeColor = Math.floor(uniformNormalSample(genome.mean, genome.variance));
            writeColor = ((writeColor % numColors) + numColors) % numColors; // normalize to [0, numColors-1]
            console.log(`Ant ${s}, Color ${c}: Write Color = ${writeColor}`);
            const moveIndex = Math.floor(Math.random() * moveOptions.length);
            const move = moveOptions[moveIndex];
            const nextState = Math.floor(Math.random() * numStates);
            antSpecificRules[s].push({ writeColor, move, nextState });
        }
    }

    return antSpecificRules;
}