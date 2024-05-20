import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MessagePopup from '../MessagePopup.vue'

describe('MessagePopup.vue', () => {
  it('Popup shows received message', async () => {
    const message = "This is a popup message."
    const wrapper = mount(MessagePopup, {
        props: { message:message }
    })

    const messageShowed = wrapper.find('div[name="message"]')

    expect(messageShowed.text()).toStrictEqual("This is a popup message.")
  })

  it('Popup sends confirmation when confirm button pressed', async () => {
    const wrapper = mount(MessagePopup)

    await wrapper.find('div[name="confirmButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('confirm')
    expect(emittedEvent).toBeTruthy()
  })

  it('Popup closes when cancel button pressed', async () => {
    const wrapper = mount(MessagePopup)

    await wrapper.find('div[name="cancelButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('close')
    expect(emittedEvent).toBeTruthy()
  })
})
