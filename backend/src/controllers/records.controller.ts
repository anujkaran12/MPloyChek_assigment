import { Request, Response } from 'express';

const allRecords = [
  { id: 'REC-1001', title: 'Payroll eligibility review', region: 'West', sensitivity: 'General', owner: 'Operations' },
  { id: 'REC-1002', title: 'Vendor onboarding exception', region: 'North', sensitivity: 'Admin', owner: 'Risk' },
  { id: 'REC-1003', title: 'Device compliance attestation', region: 'South', sensitivity: 'General', owner: 'IT Services' },
  { id: 'REC-1004', title: 'Quarterly audit evidence', region: 'East', sensitivity: 'Admin', owner: 'Audit' },
  { id: 'REC-1005', title: 'Customer support SLA sample', region: 'Central', sensitivity: 'General', owner: 'Customer Ops' }
];

export function getRecords(req: Request, res: Response): void {
  const isAdmin = req.authUser?.role === 'Admin';
  const records = isAdmin ? allRecords : allRecords.filter((record) => record.sensitivity === 'General');

  res.json({
    accessLevel: isAdmin ? 'Full organization access' : 'General records only',
    records
  });
}
