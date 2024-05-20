import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Questions from '../Questions.vue'

describe('Questions.vue', () => {
  it('Component show received categories', async () => {
    const categories = [{"id": 1, "name": "Courtes"}, {"id": 2, "name": "Longues"}, {"id": 3, "name": "Tests"}]
    const wrapper = mount(Questions, {
        props: { categories:categories }
      })

    const categoriesShowed = wrapper.findAll('div[name="categoryName"]')
    
    expect(categoriesShowed && categoriesShowed[0].text()).toStrictEqual("Courtes")
    expect(categoriesShowed && categoriesShowed[1].text()).toStrictEqual("Longues")
    expect(categoriesShowed && categoriesShowed[2].text()).toStrictEqual("Tests")
    
  })

  it('Component show received questions subject and priority', async () => {
    const categories = [{"id": 1, "name": "Tests"}]
    const questions = [{"id": 1, "categoryId": 1, "subject": "Funny", "priority": 5, "isSuper": false}, 
                       {"id": 2, "categoryId": 1, "subject": "Test", "priority": 2, "isSuper": false},
                       {"id": 3, "categoryId": 1, "subject": "Stores", "priority": 1, "isSuper": true}]
    const wrapper = mount(Questions, {
        props: { categories:categories, questions:questions }
      })

    const subjectsShowed = wrapper.findAll('div[name="questionSubject"]')
    const priorityShowed = wrapper.findAll('div[name="questionPriority"]')
    
    expect(subjectsShowed && subjectsShowed[0].text()).toStrictEqual("Sujet: Funny")
    expect(subjectsShowed && subjectsShowed[1].text()).toStrictEqual("Sujet: Test")
    expect(subjectsShowed && subjectsShowed[2].text()).toStrictEqual("Sujet: Stores")
    
    expect(priorityShowed && priorityShowed[0].text()).toStrictEqual("Priorité: 5")
    expect(priorityShowed && priorityShowed[1].text()).toStrictEqual("Priorité: 2")
    expect(priorityShowed && priorityShowed[2].text()).toStrictEqual("Priorité: 1")
    
  })

  it('Super question is golden', async () => {
    const categories = [{"id": 1, "name": "Tests"}]
    const questions = [{"id": 1, "categoryId": 1, "subject": "Test", "priority": 2, "isSuper": false},
                       {"id": 2, "categoryId": 1, "subject": "Stores", "priority": 1, "isSuper": true}]
    const wrapper = mount(Questions, {
        props: { categories:categories, questions:questions }
      })

    const questionsShowed = wrapper.findAll('div[name="question"]')
    
    expect(questionsShowed && questionsShowed[0].classes()).not.toContain('super-question')
    expect(questionsShowed && questionsShowed[1].classes()).toContain('super-question')
    
  })

  it('Pressing delete opens a popup', async () => {
    const categories = [{"id": 1, "name": "Tests"}]
    const wrapper = mount(Questions, {
        props: { categories:categories }
    })

    await wrapper.find('div[name="deleteButton"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeTruthy()
  })

  it('Pressing create category opens a form', async () => {
    const categories = [{"id": 1, "name": "Tests"}]
    const wrapper = mount(Questions, {
        props: { categories:categories }
    })

    await wrapper.find('div[name="addCategory"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('switchPopupState')
    expect(emittedEvent).toBeTruthy()
  })

  it('Pressing a question shows its details', async () => {
    const categories = [{"id": 1, "name": "Tests"}]
    const questions = [{"id": 1, "categoryId": 1, "subject": "Test", "priority": 2, "isSuper": false}]
    const wrapper = mount(Questions, {
        props: { categories:categories, questions:questions }
    })

    await wrapper.find('div[name="question"]').trigger('click')
   
    const emittedEvent = wrapper.emitted('openDetailedQuestion')
    expect(emittedEvent && emittedEvent[0][0]).toStrictEqual(1)
  })
})
