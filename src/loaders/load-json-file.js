import { readFile } from "node:fs/promises";


export async function loadJSONFile(filePath) {
    try {
    const fileContent = await readFile(filePath, "utf-8");
        try {
            return { ok: true, value: JSON.parse(fileContent) };
        } catch (error) {
            return { ok: false, error: `Error parsing JSON file: ${error.message} - ${filePath}` };
        }
    } catch (error) {
        return { ok: false, error: `Error reading JSON file: ${error.message} - ${filePath}` };
    }
}