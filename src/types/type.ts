export type Room = {
    name : string,
    type : string,
    approxAreaSqFt : string,
    dimensions? : string,
    notes : string
}

export type AiGeneratedImage = {
    $collectionId: string;
    $createdAt: string; // ISO timestamp
    $databaseId: string;
    $id: string;
    $permissions: string[]; // e.g. ['read("user:...")']
    $sequence: number;
    $updatedAt: string; // ISO timestamp
    extract_room_id: string;
    image_base64: string;
    mediaType: string; // e.g. "image/png"
    save: boolean;
    text: string;
};

export type ExtractRoom =  {
  $collectionId: string;
  $createdAt: string;  // ISO date string
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $sequence: number;
  $updatedAt: string;  // ISO date string
  home_title: string;
  img_name?: string;
  img_url: string; // can be base64 data URI or external URL
  user_id: string;

  extracted_rooms?: Room[];
  generated_rooms_images?: AiGeneratedImage[];
}

export interface ExtractRoomResult {
  $collectionId: string;
  $createdAt: string; // ISO date
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $sequence: number;
  $updatedAt: string; // ISO date


  home_description: string;
  home_title: string;
  img_url: string; // base64 or URL
  user_id: string;
}

