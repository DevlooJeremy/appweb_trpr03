import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentQuestions from '../StudentComponent/StudentQuestions.vue'

describe('StudentQuestionTest', () => {

    it('StudentQuestions displays every questions received in props', () => {

        const questions = [
            {
                id: 1,
                question: "first test question",
                isSuper: false
            },
            {
                id: 2,
                question: "second test question",
                isSuper: false
            }
        ]

        const wrapper = mount(StudentQuestions, {
            props: {
                questions: questions
            }
        })

        expect(wrapper.findAll('li[name=questions]').length).toBe(questions.length)
    })

    it('If question is Super li contains super class', () => {
        const questions = [
            {
                id: 1,
                question: "first test question",
                isSuper: true
            }
        ]

        const wrapper = mount(StudentQuestions, {
            props: {
                questions: questions
            }
        })

        const div = wrapper.find('li[name=questions] div')
        expect(div.classes()).toContain('super')
    })
})