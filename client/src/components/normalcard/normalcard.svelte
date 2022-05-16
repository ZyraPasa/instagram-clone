<script>
  import { returnedWrapperHelper } from "../../_lib/helpers/wrapperHelper";
  export let customStyle = "";
</script>

<div class="card" style={returnedWrapperHelper(customStyle)}>
  <slot />
</div>

