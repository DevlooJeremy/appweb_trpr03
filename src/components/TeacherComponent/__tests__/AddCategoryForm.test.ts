import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddCategoryForm from '../AddCategoryForm.vue'
import { text } from 'stream/consumers'
import { createTestingPinia } from '@pinia/testing'

describe('AddCategoryForm.vue', () => {
  it('Sending a form with valid name adds the category', async () => {
    createTestingPinia()
    const wrapper = mount(AddCategoryForm)
    const spyAddFunction = vi.spyOn(AddCategoryForm, 'addCategory')

    /*await wrapper.find('div[text="Ajouter"]').trigger('click')

    const emittedEvent = wrapper.emitted('close')
    expect(spyAddFunction).toHaveBeenCalled()
    expect(emittedEvent)*/
    
  })

  it("Sur le clic d'une couleur, doit émettre l'événement clickColor", async () => {
    const colors = ['bleu', 'blanc rouge']
    const wrapper = mount(ColorAdderList, {
      props: { colors }
    })

    await wrapper.findAll('li')[0].trigger('click')

    const emittedEvent = wrapper.emitted('clickColor')
    expect(emittedEvent && emittedEvent[0]).toStrictEqual([colors[0]])
  })

  it("Sur modification du prop colors, un message doit s'afficher dans la console", async () => {
    const spyConsole = vi.spyOn(console, 'log')

    const colors = ['bleu', 'blanc rouge']
    const wrapper = mount(ColorAdderList, {
      props: { colors }
    })

    await wrapper.setProps({ colors: [...colors, 'jaune'] })

    expect(spyConsole).toHaveBeenCalledWith(
      'Le prop colors de ColorAdderList a été modifié.',
      expect.anything(),
      expect.anything()
    )

    // Nettoyer le mock après le test
    spyConsole.mockRestore()
  })
})
