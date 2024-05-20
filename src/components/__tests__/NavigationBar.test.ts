import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationBar from '../NavigationBar.vue' // Ajustez le chemin selon votre structure
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ClassView from '@/views/ClassView.vue';
import ProfileView from '@/views/ProfileView.vue';
import LoginView from '@/views/LoginView.vue';

describe('NavigationBar', () => {

  const routes: Array<RouteRecordRaw> = [
    { path: '/class', name: 'Class', component: ClassView },
    { path: '/profile', name: 'Profile', component: ProfileView },
    { path: '/login', name: 'Login', component: LoginView }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  });

  it('utilisateur non connecté', () => {
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      },
      props: {
        isLoggedIn: false
      }
    })

    expect(wrapper.text()).toContain('Connexion')
  })

  it('utilisateur connecté', async () => {
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      },
      props: {
        isLoggedIn: true
      }
    })

    await router.isReady()

    expect(wrapper.text()).toContain('Se déconnecter');
    expect(wrapper.text()).toContain('Profile')
  })
})
