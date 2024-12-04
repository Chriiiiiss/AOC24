import fs from "node:fs";
import { INodeSystemError } from "./interface";

async function main(fileUrl: string) {
    try {
        const inputFile = fs.readFileSync(fileUrl, "utf-8");
        const inputLines = inputFile.split('\n');
        let safeLine = 0

        for (let lineIndex = 0; lineIndex < inputLines.length; lineIndex++) {
            const element: string = inputLines[lineIndex].replaceAll(" ", "");
            const firstDigit = Number(element[0])
            const secondDigit = Number(element[1])
            let isUnsafe = 0


            if (isSafeEarlyCheck(firstDigit, secondDigit)) {
                const isAscendingLine: boolean = isAscending(firstDigit, secondDigit)
    
                for (let stringIndex = 0; stringIndex < element.length - 1; stringIndex++) {
                    const leftDigit = Number(element[stringIndex]);
                    const rightDigit = Number(element[stringIndex + 1]);
                    console.log("left: ",leftDigit," right: ", rightDigit)
                    const diff = Math.abs(leftDigit - rightDigit)
                    const isAscendingDigit = isAscending(leftDigit, rightDigit);
    
                    if ((isAscendingDigit && !isAscendingLine) || (!isAscendingDigit && isAscendingLine) || isUnsafeDiff(diff)) {
                        console.log("Found unsafe pattern - incrementing isUnsafe");
                        isUnsafe++;
                    }
                }
                if (!isUnsafe) {
                    console.log(`Line{${element}} is safe - incrementing safeLine`);
                    safeLine++;
                } else {
                    console.log(`Line{${element}} is unSafe`)
                }
            }

        }

        console.log(`There is : ${safeLine} number of safe line`)
    } catch (error) {
        if (error instanceof Error) {
            checkError(error);
        }
    }
}

function isAscending(firstDigit: number, secondDigit: number): boolean {
    if (firstDigit - secondDigit < 0) return true
    return false
}

function isUnsafeDiff(diff: number) {
    if (diff < 1 || Math.abs(diff) > 3 ) {
        diff < 1 ? console.log("Number is even") : console.log(`Diff is too big because it's ${diff}`)
        return true;
    }
    return false;
}

function isSafeEarlyCheck(firstDigit: number, secondDigit: number): boolean {
    if (Number.isNaN(firstDigit) || Number.isNaN(secondDigit)) {
        console.log("NaN check failed");
        return false;
    }
    
    const diff = Math.abs(firstDigit - secondDigit)
    console.log(`Difference between digits: ${firstDigit} and ${secondDigit} in absolute is ${diff}`);
    if (isUnsafeDiff(diff)) return false;


    console.log("All early checks passed");
    return true;
}

function checkLine(line: string, isAscending: boolean) {

}


function checkError(error: unknown) {
    const nodeError: INodeSystemError = error as INodeSystemError;
            switch (nodeError.code) {
                case "ENOENT":
                    console.error(`[Error: ${nodeError.code}] File not found`);
                    break;
            
                default:
                    console.error(`Uhoo, dunno what happened here but it smell bad`);
                    console.error(nodeError);
                    break;
            }
}

main(process.argv[2])