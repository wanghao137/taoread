import { describe, expect, it } from 'vitest'
import { _acceptPromptEvent, canInstall, isIOS, isStandalone, promptInstall, type BeforeInstallPromptEvent } from '../src/lib/installPrompt'

function fakePromptEvent(outcome: 'accepted' | 'dismissed') {
  return {
    preventDefault: () => undefined,
    prompt: async () => undefined,
    userChoice: Promise.resolve({ outcome }),
  }
}

describe('installPrompt', () => {
  it('未捕获 beforeinstallprompt 时不可安装', async () => {
    expect(canInstall()).toBe(false)
    expect(await promptInstall()).toBe('unavailable')
  })

  it('捕获事件后可安装，prompt 后恢复不可安装', async () => {
    _acceptPromptEvent(fakePromptEvent('accepted') as unknown as BeforeInstallPromptEvent)
    expect(canInstall()).toBe(true)
    expect(await promptInstall()).toBe('accepted')
    expect(canInstall()).toBe(false)
  })

  it('isStandalone 识别独立窗口模式', () => {
    expect(typeof isStandalone()).toBe('boolean')
    expect(typeof isIOS()).toBe('boolean')
  })
})
