import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddStudentForm from '../AddStudentForm.vue'

describe('AddStudentForm.vue', () => {
  it('Sending a form with valid name, password and email adds the user', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="name"]').setValue("Nom valide")
    await wrapper.find('input[name="password"]').setValue('MPvalide')
    await wrapper.find('input[name="email"]').setValue('email@valide.com')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('addStudent')
    expect(emittedEvent && emittedEvent[0][0]).toStrictEqual("Nom valide")
    expect(emittedEvent && emittedEvent[0][1]).toStrictEqual('MPvalide')
    expect(emittedEvent && emittedEvent[0][2]).toStrictEqual('email@valide.com')
    
  })

  it('Pressing cancel button closes the form', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('div[name="cancelButton"]').trigger('click')

    const emittedEvent = wrapper.emitted('close')
    expect(emittedEvent).toBeTruthy()
  })

  it('Sending a form with no name shows empty name error message', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="password"]').setValue('MPvalide')
    await wrapper.find('input[name="email"]').setValue('email@valide.com')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="nameError"]').text()
    expect(nameErrorText).toStrictEqual("Le nom est requis et ne peut pas être vide.")
  })

  it('Sending a form with no password shows empty password error message', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="name"]').setValue("Nom valide")
    await wrapper.find('input[name="email"]').setValue('email@valide.com')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="passwordError"]').text()
    expect(nameErrorText).toStrictEqual("Le mot de passe est requis et ne peut pas être vide.")
  })

  it('Sending a form with invalid password shows short password error message', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="name"]').setValue("Nom valide")
    await wrapper.find('input[name="password"]').setValue('TS')
    await wrapper.find('input[name="email"]').setValue('email@valide.com')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="passwordError"]').text()
    expect(nameErrorText).toStrictEqual("Le mot de passe doit faire 4+ charactères de long.")
  })

  it('Sending a form with no email shows empty email error message', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="name"]').setValue("Nom valide")
    await wrapper.find('input[name="password"]').setValue('MPvalide')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="emailError"]').text()
    expect(nameErrorText).toStrictEqual("L\'adresse courriel est requis et ne peut pas être vide.")
  })

  it('Sending a form with invalid password shows short password error message', async () => {
    const wrapper = mount(AddStudentForm)

    await wrapper.find('input[name="name"]').setValue("Nom valide")
    await wrapper.find('input[name="password"]').setValue('MPvalide')
    await wrapper.find('input[name="email"]').setValue('invalide email')
    await wrapper.find('div[name="addButton"]').trigger('click')

    const nameErrorText = wrapper.find('div[name="emailError"]').text()
    expect(nameErrorText).toStrictEqual("L\'adresse courriel doit avoir un format valide.")
  })
})
