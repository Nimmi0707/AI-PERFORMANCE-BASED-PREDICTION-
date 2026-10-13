import Papa from 'papaparse';

export const featureDefinitions = [
  { key: 'productivity', label: 'Productivity score', weight: 0.35 },
  { key: 'quality', label: 'Work quality', weight: 0.30 },
  { key: 'attendance', label: 'Attendance rate', weight: 0.15 },
  { key: 'collaboration', label: 'Collaboration score', weight: 0.20 },
] as const;
export type Features = Record<(typeof featureDefinitions)[number]['key'], number>;
export function evaluate(features: Features) {
  const score = Math.round(featureDefinitions.reduce((sum, f) => sum + features[f.key] * f.weight, 0) * 10) / 10;
  const evaluation = score >= 85 ? 'Exceptional' : score >= 70 ? 'High performer' : score >= 50 ? 'Developing' : 'Needs support';
  const distance = Math.min(...[50, 70, 85].map(t => Math.abs(score - t)));
  const confidence = Math.round(Math.min(97, 55 + distance * 2));
  return { score, evaluation, confidence };
}
export const sampleCsv = 'employee_id,department,productivity,quality,attendance,collaboration\nEMP-001,Engineering,92,88,96,85\nEMP-002,Marketing,78,82,94,90\nEMP-003,Finance,65,72,90,70\nEMP-004,Operations,45,52,80,60\nEMP-005,Engineering,96,94,98,92';
export type BatchRow = { employee_id: string; department: string; score: number; evaluation: string; confidence: number };
export function inferCsv(text: string): BatchRow[] {
  const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: 'greedy', transformHeader: h => h.trim().toLowerCase() });
  if (parsed.errors.length) throw new Error(`Invalid CSV: ${parsed.errors[0]?.message}`);
  const required = ['employee_id', ...featureDefinitions.map(f => f.key)];
  if (required.some(k => !parsed.meta.fields?.includes(k))) throw new Error(`Required columns: ${required.join(', ')}`);
  if (!parsed.data.length) throw new Error('The CSV contains no employee records.');
  if (parsed.data.length > 10000) throw new Error('Please upload 10,000 records or fewer.');
  const ids = new Set<string>();
  return parsed.data.map((row, i) => {
    const id = row['employee_id']?.trim();
    if (!id || ids.has(id)) throw new Error(`Row ${i + 2}: employee ID is missing or duplicated.`);
    ids.add(id);
    const features: Features = { productivity: 0, quality: 0, attendance: 0, collaboration: 0 };
    for (const f of featureDefinitions) {
      const raw = row[f.key]?.trim();
      const value = Number(raw);
      if (!raw || !Number.isFinite(value) || value < 0 || value > 100) throw new Error(`Row ${i + 2}: ${f.key} must be a number from 0 to 100.`);
      features[f.key] = value;
    }
    return { employee_id: id, department: row['department']?.trim() || 'Unspecified', ...evaluate(features) };
  });
}
export function downloadCsv(filename: string, content: string | BatchRow[]) {
  const csv = typeof content === 'string' ? content : Papa.unparse(content, { escapeFormulae: true });
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}