import { describe, expect, it } from 'vitest';
import { evaluate, inferCsv, sampleCsv } from '../lib/performance';
describe('shared demonstration evaluation', () => {
  it('uses the same weighted inputs and explicit thresholds', () => {
    expect(evaluate({ productivity: 90, quality: 88, attendance: 96, collaboration: 85 }).score).toBe(89.3);
    for (const [score, label] of [[85,'Exceptional'],[70,'High performer'],[50,'Developing'],[49,'Needs support']] as const) {
      expect(evaluate({ productivity: score, quality: score, attendance: score, collaboration: score }).evaluation).toBe(label);
    }
  });
  it('processes the sample dataset', () => { expect(inferCsv(sampleCsv)).toHaveLength(5); });
  it('rejects missing columns', () => { expect(() => inferCsv('employee_id,quality\nA,80')).toThrow('Required columns'); });
  it('rejects blank scores', () => { expect(() => inferCsv(sampleCsv.replace('92,88,96,85', ',88,96,85'))).toThrow('must be a number'); });
  it('rejects duplicate employee IDs', () => { expect(() => inferCsv(sampleCsv.replace('EMP-002','EMP-001'))).toThrow('duplicated'); });
  it('rejects out-of-range inputs', () => { expect(() => inferCsv(sampleCsv.replace('92,88,96,85', '101,88,96,85'))).toThrow('must be a number'); });
});