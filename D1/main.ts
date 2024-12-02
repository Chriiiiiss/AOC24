import fs from "node:fs";

const inputText = fs.readFileSync("./input.txt", "utf-8");
const inputLines = inputText.split("\n");

const left = inputLines.map(line => line.split(/\s+/)[0]).filter(Boolean);
const right = inputLines.map(line => line.split(/\s+/)[1]).filter(Boolean);
