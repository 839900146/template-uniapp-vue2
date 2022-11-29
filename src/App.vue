<script lang="ts">
import Vue from 'vue';
import { update } from '@/utils/update';
export default Vue.extend({
    mpType: 'app',
    onLaunch() {
    },
    onShow() {
        update()
    },
    onHide() {
    }
});
</script>

<style>
/*每个页面公共css */
</style>
