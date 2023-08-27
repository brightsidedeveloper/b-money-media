import { revalidatePath } from "next/cache";


export async function revalidate(path: string) {
    try {

        revalidatePath(path)
    } catch (err: any) {
        console.error(`Failed to revalidate: ${err.message}`);
        throw new Error(`Failed to revalidate: ${err.message}`);
    }
}