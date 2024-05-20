import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'

describe('Alert.vue', () => {
  it('Pressing send sends the alert', async () => {
    const wrapper = mount(Alert)

    await wrapper.find('input[name="alertMessage"]').setValue("Alert message")
    await wrapper.find('div[name="sendAlertButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('sendWarning')
    expect(emittedEvent && emittedEvent[0][0]).toStrictEqual("Alert message")
    
  })
})
