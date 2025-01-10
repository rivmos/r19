import { ISelected } from "@/store/slices/explorerSlice";

export const groupByType = (items: ISelected[]) =>
    items.reduce<{ files: string[]; folders: string[] }>(
        (result, item) => {
            if (item.type === 'file') {
                result.files.push(item.id);
            } else if (item.type === 'folder') {
                result.folders.push(item.id);
            }
            return result;
        },
        { files: [], folders: [] }
    );