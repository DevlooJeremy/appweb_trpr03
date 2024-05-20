import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionManager from '../StudentComponent/QuestionManager.vue'

describe('QuestionManagerTest', () => {
    it('QuestionManager displays categories in the select input field', () => {
        const categories = [
            {
                id: 1,
                name: "first test category"
            },
            {
                id: 2,
                name: "second test category"
            }
        ]
        const wrapper = mount(QuestionManager, {props: {categories: categories}})   
        const options = wrapper.findAll('option[name=category]')

        expect(options.length).toBe(categories.length)
        options.forEach((option, index) => {
            expect(option.text()).toBe(categories[index].name)
        })
    })

    it('If subject is not null isSubjectValid returns true', () => {
        const wrapper = mount(QuestionManager)
        const answer = wrapper.vm.isSubjectValid("test")
        expect(answer).toBe(true)
    })

    it('If subject is null isSubjectValid returns false', () => {
        const wrapper = mount(QuestionManager)
        const answer = wrapper.vm.isSubjectValid("")
        expect(answer).toBe(false)
    })

    it('If question is not null isQuestionValid returns true', () => {
        const wrapper = mount(QuestionManager)
        const answer = wrapper.vm.isQuestionValid("question")
        expect(answer).toBe(true)
    })

    it('If question is null isQuestionValid returns false', () => {
        const wrapper = mount(QuestionManager)
        const answer = wrapper.vm.isQuestionValid("")
        expect(answer).toBe(false)
    })

    it('If cateogry is not null isCategoryValid returns true', () => {
        const wrapper = mount(QuestionManager)
        const answer = wrapper.vm.isCategoryValid(1)
        expect(answer).toBe(true)
    })

    it('when questionForm is submitted question is emitted to view', () => {
        const categories = [
            {
                id: 1,
                name: "Question courte"
            },
            {
                id: 2,
                name: "Question longue"
            }
        ]
        const wrapper = mount(QuestionManager, {props: {categories: categories}})   


        wrapper.find('input[name=subject]').setValue("testSubject")
        wrapper.find('textarea[name=question]').setValue("testQuestion")
        wrapper.find('select[name=category]').setValue("2")

        wrapper.find('form').trigger('submit')

        const emittedEvent = wrapper.emitted('addQuestion')
        expect(emittedEvent).toBeTruthy()
    })

})