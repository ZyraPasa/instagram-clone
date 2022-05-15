<script>
  export let width = "";
  export let height = "";
  export let maxWidth = "";
  export let maxHeight = "";
  export let gridTemplateColumns = "";
  export let gridTemplateRows = "";
  export let gridAutoFlow = "";
  export let gridGap = "";
  export let columnGap = "";
  export let rowGap = "";
  export let justifyItems = "";
  export let alignItems = "";
  export let justifyContent = "";
  export let alignContent = "";
  export let margin = "";
  export let marginTop = "";
  export let marginBottom = "";
  export let marginLeft = "";
  export let marginRight = "";
  export let padding = "";
  export let border = "";
  export let borderTop = "";
  export let borderLeft = "";
  export let borderBottom = "";
  export let borderRight = "";
  export let textAlign = "";
  export let position = "";

  let style = `
    ${width && `width: ${width};`}
    ${height && `height: ${height};`}
    ${maxWidth && `max-width: ${maxWidth};`}
    ${maxHeight && `max-height: ${maxHeight};`}
    ${gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
    ${gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
    ${gridAutoFlow && `grid-auto-flow: ${gridAutoFlow};`}
    ${gridGap && `grid-gap: ${gridGap};`}
    ${columnGap && `column-gap: ${columnGap};`}
    ${rowGap && `row-gap: ${rowGap};`}
    ${justifyItems && `justify-items: ${justifyItems};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${alignContent && `align-content: ${alignContent};`}
    ${margin && `margin: ${margin};`}
    ${padding && `padding: ${padding};`}
    ${border && `border: ${border};`}
    ${borderTop && `border-top: ${borderTop};`}
    ${borderLeft && `border-left: ${borderLeft};`}
    ${borderBottom && `border-bottom: ${borderBottom};`}
    ${borderRight && `border-right: ${borderRight};`}
    ${textAlign && `text-align: ${textAlign};`}
    ${position && `position: ${position};`}
        ${marginTop && `margin-top: ${marginTop};`}
        ${marginBottom && `margin-bottom: ${marginBottom};`}
        ${marginLeft && `margin-left: ${marginLeft};`}
        ${marginRight && `margin-top: ${marginRight};`}
    `;
</script>

<div class="grid-wrapper" style={style.trim()}>
  <slot />
</div>

<style lang="scss">
  .grid-wrapper {
    display: grid;
  }
</style>
