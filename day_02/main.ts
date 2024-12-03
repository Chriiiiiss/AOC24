import fs from "node:fs";
import { INodeSystemError } from "./interface";

async function main(fileUrl: string) {
    try {
        const inputFile = fs.readFileSync(fileUrl, "utf-8");
        console.log(inputFile);
    } catch (error) {
        if (error instanceof Error) {
            const nodeError: INodeSystemError = error as INodeSystemError;
            switch (nodeError.code) {
                case "ENOENT":
                    console.error(`[Error: ${nodeError.code}] File not found using: ${fileUrl}`);
                    break;
            
                default:
                    console.error(`Uhoo, dunno what happened here but it smell bad`);
                    console.error(nodeError);
                    break;
            }
        }
    }
}

main(process.argv[2])