import fs from "node:fs";

const inputText = fs.readFileSync("./input.txt", "utf-8");
const inputLines = inputText.split("\n");



function getTotalDistance(inputLines: string[]): number {
    const left = inputLines.map(line => line.split(/\s+/)[0]).filter(Boolean).sort((a, b) => Number(a) - Number(b));
const right = inputLines.map(line => line.split(/\s+/)[1]).filter(Boolean).sort((a, b) => Number(a) - Number(b));

    const totalDistance = left.reduce((acc, curr, index) => acc + computeDistance(Number(curr), Number(right[index])), 0);
    return totalDistance;
}

function computeDistance(left: number, right: number) {
    if (left > right) return left - right;
    if (left < right) return right - left;
    return 0
}


function computeSimilarityScore(inputLines: string[]): number {
    const left = inputLines.map(line => line.split(/\s+/)[0]).filter(Boolean);
    const right = inputLines.map(line => line.split(/\s+/)[1]).filter(Boolean);
    let score = 0;

    for (const leftItem of left) {
        const rightOccurence = right.filter(item => item === leftItem).length;
        score += Number(leftItem) * rightOccurence;
    }

    return score;
}