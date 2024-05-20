import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Timer from '../Timer.vue'

describe('Timer.vue', () => {
  it('Timer starts when start button pressed and does not send time if not set', async () => {
    const wrapper = mount(Timer)

    await wrapper.find('div[name="startButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('startTimer')
    expect(emittedEvent).toBeTruthy()
  })

  it('Timer starts when start button pressed and sends time if set', async () => {
    const wrapper = mount(Timer)

    await wrapper.find('input[name="minutes"]').setValue(2)
    await wrapper.find('input[name="seconds"]').setValue(33)
    await wrapper.find('div[name="startButton"]').trigger('click')

    const emittedEvent1 = wrapper.emitted('startTimer')
    const emittedEvent2 = wrapper.emitted('setTime')
    expect(emittedEvent1).toBeTruthy()
    expect(emittedEvent2 && emittedEvent2[0][0]).toStrictEqual(2*60 + 33)
  })

  it('Timer stops if stop button pressed', async () => {
    const wrapper = mount(Timer)

    await wrapper.find('div[name="stopButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('stopTimer')
    expect(emittedEvent).toBeTruthy()
  })

  it('Timer resets if reset button pressed', async () => {
    const wrapper = mount(Timer)

    await wrapper.find('div[name="resetButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('resetTimer')
    expect(emittedEvent).toBeTruthy()
  })
})
