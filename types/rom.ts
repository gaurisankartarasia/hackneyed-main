export interface Build {
    id: string;
    version: string;
    downloadLinks?: { label: string; url: string }[];
    changelog: string;
    size: string;
    createdAt: number;
    buildType: string;
    androidVersion: string;
    customFields?: Record<string, string>;
    warnings?: { content: string }[];
  }
  
  export interface ROM {
    id: string;
    name: string;
    version: string;
    logoUrl: string;
    createdBy: string;
  }
  
  export interface Device {
    codename: string;
    availableDevices: string[];
    imageUrl: string;
  }
  