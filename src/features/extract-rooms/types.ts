import { Models } from "node-appwrite";

export type extract_rooms = Models.Document & {
    img_url : string;
    img_name : string;
}