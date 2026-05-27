export interface AccessRecord {
  id: string;
  title: string;
  region: string;
  sensitivity: 'Admin' | 'General';
  owner: string;
}

export interface RecordsResponse {
  accessLevel: string;
  records: AccessRecord[];
}
