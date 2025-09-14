export type Room = {
    name : string,
    type : string,
    approxAreaSqFt : number,
    dimensions? : string,
    notes : string
}

export type ExtractRoom =  {
  $collectionId: string;
  $createdAt: string;  // ISO date string
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $sequence: number;
  $updatedAt: string;  // ISO date string
  home_title: string;
  img_name: string;
  img_url: string; // can be base64 data URI or external URL
  user_id: string;
}
