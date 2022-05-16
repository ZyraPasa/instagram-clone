<script>
  export let animatedText;
</script>

<div class="animated-text">
  <ul>
    {animatedText.title}
    <li class="text-1"><p>{animatedText.text1}</p></li>
    <li class="text-2"><p>{animatedText.text2}</p></li>
    <li class="text-3"><p>{animatedText.text3}</p></li>
    <li class="text-4"><p>{animatedText.text4}</p></li>
    <li class="text-5"><p>{animatedText.text5}</p></li>
    <div class="border" />
  </ul>
</div>

<style lang="scss">
  .animated-text {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 8px;
    color: white;
    font-size: 1.8em;
    box-sizing: border-box;
    ul {
      height: 100%;
      margin: 0 auto;
      padding: 0;
      list-style: none;
      display: flex; /* No Grid */
      justify-content: center;
      align-items: center;
      position: relative;
      .text-1 {
        animation-name: mymove1;
      }
      .text-2 {
        animation-name: mymove2;
      }
      .text-3 {
        animation-name: mymove3;
      }
      .text-4 {
        animation-name: mymove4;
      }
      .text-5 {
        animation-name: mymove5;
      }
      li {
        position: relative;
        width: 0;
        overflow: hidden;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 10s;
        animation-delay: 0.2s;
        text-align: center;
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          background: white;
          width: 1px;
          height: 1.2em;
          content: "";
        }
        p {
          margin: 0 4px;
          white-space: nowrap;
        }
        @keyframes mymove1 {
          0% {
            width: 0;
          }
          5% {
            width: 100%;
          }
          15% {
            width: 100%;
          }
          20% {
            width: 0;
          }
        }

        @keyframes mymove2 {
          20% {
            width: 0;
          }
          25% {
            width: 100%;
          }
          35% {
            width: 100%;
          }
          40% {
            width: 0;
          }
        }

        @keyframes mymove3 {
          40% {
            width: 0;
          }
          45% {
            width: 100%;
          }
          55% {
            width: 100%;
          }
          60% {
            width: 0;
          }
        }

        @keyframes mymove4 {
          60% {
            width: 0;
          }
          65% {
            width: 100%;
          }
          75% {
            width: 100%;
          }
          80% {
            width: 0;
          }
        }

        @keyframes mymove5 {
          80% {
            width: 0;
          }
          85% {
            width: 100%;
          }
          95% {
            width: 100%;
          }
          100% {
            width: 0;
          }
        }
      }
    }
  }
</style>
