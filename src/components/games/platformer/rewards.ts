import type { RewardDefinition, RewardId } from './types'

export const rewardDefinitions: Record<RewardId, RewardDefinition> = {
  logicBlade: {
    id: 'logicBlade',
    label: 'Logic Blade',
    inventoryLabel: 'Logic Blade',
    description: 'Vũ khí lý luận: bấm J để chém và đánh bại quái tuần tra.',
  },
  methodShield: {
    id: 'methodShield',
    label: 'Method Shield',
    inventoryLabel: 'Method Shield',
    description: 'Khiên phương pháp: chặn 2 lần va chạm trước khi mất HP.',
  },
  historyPulse: {
    id: 'historyPulse',
    label: 'History Pulse',
    inventoryLabel: 'History Pulse',
    description: 'Xung lịch sử: đòn đánh xa hơn để dọn quái bay ở world cuối.',
  },
}

export const getReward = (rewardId: RewardId) => rewardDefinitions[rewardId]
