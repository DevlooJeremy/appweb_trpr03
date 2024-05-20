import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DetailedQuestion from '../DetailedQuestion.vue'

describe('DetailedQuestion.vue', () => {
  it('Component shows received information', async () => {
    const studentName = "Hugo"
    const category = "Test"
    const questionDetail = "Is this the details of a question?"
    const wrapper = mount(DetailedQuestion, {
        props: { studentName:studentName, category:category, questionDetail:questionDetail }
    })

    const studentNameShowed = wrapper.find('h1[name="studentName"]')
    const categoryNameShowed = wrapper.find('h3[name="categoryName"]')
    const questionDetailShowed = wrapper.find('p[name="questionDetail"]')
    
    expect(studentNameShowed && studentNameShowed.text()).toStrictEqual("Hugo")
    expect(categoryNameShowed && categoryNameShowed.text()).toStrictEqual("Test")
    expect(questionDetailShowed && questionDetailShowed.text()).toStrictEqual("Is this the details of a question?")
    
  })

  it('Pressing delete opens a popup if the question id is valid', async () => {
    const questionId = 1
    const wrapper = mount(DetailedQuestion, {
        props: { questionId:questionId }
    })

    await wrapper.find('div[name="deleteButton"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeTruthy()
  })

  it('Pressing delete does not opens a popup if the question id is not valid', async () => {
    const questionId = 0
    const wrapper = mount(DetailedQuestion, {
        props: { questionId:questionId }
    })

    await wrapper.find('div[name="deleteButton"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeFalsy()
  })
})
