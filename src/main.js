import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'

// CHANGED: Svelte 5 uses mount() instead of new App()
const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
