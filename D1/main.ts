import fs from "node:fs";

const inputText = fs.readFileSync("./input.txt", "utf-8");
const inputLines = inputText.split("\n");

const left = inputLines.map(line => line.split(/\s+/)[0]).filter(Boolean).sort((a, b) => Number(a) - Number(b));
const right = inputLines.map(line => line.split(/\s+/)[1]).filter(Boolean).sort((a, b) => Number(a) - Number(b));

