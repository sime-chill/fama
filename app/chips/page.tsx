import type { Metadata } from 'next';

import { ChipsClient } from './chips-client';

export const metadata: Metadata = {
  title: 'AI 芯片库｜FAMA',
  description:
    '按 Memory、厂商与架构检索主流 AI 加速器，每个条目均附官方资料。',
};

export default function ChipsPage() {
  return <ChipsClient />;
}
