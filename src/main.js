import { createApp, defineAsyncComponent } from 'vue'
import router from './routes.js';
import store from './store/index.js';
import Basecard from './components/ui/BaseCard.vue';
import Basebutton from './components/ui/BaseButton.vue';
import Basebadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
//import BaseDialog from './components/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.use(store);
app.component('base-card', Basecard);
app.component('base-button', Basebutton);
app.component('base-badge', Basebadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.mount('#app')
