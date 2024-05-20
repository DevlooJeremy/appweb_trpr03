import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddCategoryForm from '../AddCategoryForm.vue'

describe('AddCategoryForm.vue', () => {
  it('Sending a form with valid name adds the category', async () => {
    const wrapper = mount(AddCategoryForm)

    await wrapper.find('input[name="name"]').setValue("Nom de category")
    await wrapper.find('div[name="addButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('addCategory')
    expect(emittedEvent && emittedEvent[0][0]).toStrictEqual("Nom de category")
    
  })

  it('Pressing cancel button closes the form', async () => {
    const wrapper = mount(AddCategoryForm)

    await wrapper.find('div[name="cancelButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('close')
    expect(emittedEvent).toBeTruthy()
  })

  it('Sending a form with no name shows empty name error message', async () => {
    const wrapper = mount(AddCategoryForm)

    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="nameError"]').text()
    expect(nameErrorText).toStrictEqual("Le nom est requis et ne peut pas être vide.")
  })
})
