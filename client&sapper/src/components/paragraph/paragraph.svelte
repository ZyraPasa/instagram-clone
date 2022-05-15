<script>
  import { returnedWrapperHelper } from "../../_lib/helpers/wrapperHelper";

  export let customStyle = "";
  export let fontSize = "";
  export let fontFamily = "";
  export let textTransform = "";
  export let fontWeight = "";
  export let letterSpacing = "";
  export let marginBottom = "";
  export let marginTop = "";
  export let marginLeft = "";
  export let marginRight = "";
  export let borderTop = "";
  export let borderLeft = "";
  export let borderBottom = "";
  export let borderRight = "";
  export let textAlign = "";
  export let lineHeight = "";
  export let textShadow = "";
  export let gridTemplateColumns = "";
  export let gridTemplateRows = "";
  export let gridGap = "";
  export let alignItems = "";
  export let alignContent = "";
  export let justifyContent = "";
  export let justifyItems = "";

  let style = `
    ${fontSize && `font-size: ${fontSize};`}
    ${fontFamily && `font-family: ${fontFamily};`}
    ${textTransform && `text-transform: ${textTransform};`}
    ${fontWeight && `font-weight: ${fontWeight};`}
    ${letterSpacing && `letter-spacing: ${letterSpacing};`}
    ${marginTop && `margin-top: ${marginTop};`}
    ${marginBottom && `margin-bottom: ${marginBottom};`}
    ${marginLeft && `margin-left: ${marginLeft};`}
    ${marginRight && `margin-right: ${marginRight};`}
    ${borderTop && `border-top: ${borderTop};`}
    ${borderLeft && `border-left: ${borderLeft};`}
    ${borderBottom && `border-bottom: ${borderBottom};`}
    ${borderRight && `border-right: ${borderRight};`}
    ${textAlign && `text-align: ${textAlign};`}
    ${lineHeight && `line-height: ${lineHeight};`}
    ${textShadow && `text-shadow: ${textShadow};`}
    ${gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
    ${gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
    ${gridGap && `grid-gap: ${gridGap};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${alignContent && `align-content: ${alignContent};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${justifyItems && `justify-items: ${justifyItems};`}
    `;
</script>

<p class="paragraph" style="{style.trim()} {returnedWrapperHelper(customStyle)}">
  <slot />
</p>
