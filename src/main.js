import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)

app.use(router)

app.use(
  createAuth0({
    domain: 'jfrymann.us.auth0.com',
    clientId: 'ib8jfIHHXH84LGii9NmQ8SwihhZCbCzf',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'http://localhost:3001/', // The Audience from your Auth0 API
    }
  })
);

app.mount('#app')
