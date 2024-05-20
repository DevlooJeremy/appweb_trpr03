import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Students from '../Students.vue'

describe('Students.vue', () => {
  it('Component show received students', async () => {
    const users = [{"name": "Steve", "role": "teacher"}, {"name": "Hugo", "role": "student"}, {"name": "Jeremy", "role": "student"}]
    const wrapper = mount(Students, {
        props: { students:users }
      })

    const students = wrapper.findAll('div[name="studentName"]')
    
    expect(students && students[0].text()).toStrictEqual("Hugo")
    expect(students && students[1].text()).toStrictEqual("Jeremy")
    
  })

  it('Pressing delete opens a popup', async () => {
    const users = [{"name": "Hugo", "role": "student"}]
    const wrapper = mount(Students, {
        props: { students:users }
    })

    await wrapper.find('div[name="deleteStudent"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeTruthy()
  })

  it('Pressing add student opens a form', async () => {
    const users = [{"name": "Hugo", "role": "student"}]
    const wrapper = mount(Students, {
        props: { students:users }
    })

    await wrapper.find('div[name="addStudent"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeTruthy()
  })
})
