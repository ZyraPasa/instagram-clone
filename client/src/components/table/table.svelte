<script>
  import Button from "../button/button.svelte";
  import { createEventDispatcher } from "svelte";
  export let dataFilter;
  export let data;
  export let title;
  export let addButtonDisabled = true;
  export let removeButtonDisabled = false;
  export let action = true;
  export let showIndex = true;

  const dispatch = createEventDispatcher();
  const remove = (id) => dispatch("remove", { id });
  const update = (id) => dispatch("update", { id });
</script>

<div class="table-box">
  <div class="table-head">
    <h4>{title}</h4>
    {#if addButtonDisabled}
      <Button text="<span class='fas fa-plus'/>" size="small" on:click />
    {/if}
  </div>
  <table>
    <thead>
      <tr>
        {#if showIndex}
          <th>Index</th>
        {/if}
        {#each dataFilter as filter}
          <th>{filter.display}</th>
        {/each}
        {#if action}
          <th>Action</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each data as property, i}
        <tr>
          {#if showIndex}
            <td data-title="Index">{i + 1}</td>
          {/if}
          {#each dataFilter as filter}
            <td data-title={filter.display}>{property[filter.column]}</td>
          {/each}
          {#if action}
            <td data-title="Action">
              <div>
                <Button
                  text="<span class='fas fa-times' />"
                  size="small"
                  disabled={removeButtonDisabled}
                  on:click={() => {
                    remove(property.id);
                  }}
                />
                <Button text="<span class='fas fa-pencil-alt'/>" size="small" on:click={() => update(property.id)} />
              </div>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .table-box {
    background-color: #191a1b;
    margin-top: 1em;
    padding: 1em;
    display: grid;
    border-radius: 1em;
    overflow-x: auto;
    color: gray;
    box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);
    .table-head {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 1em;
      align-items: center;
    }
    table {
      margin-top: 1em;
      color: gray;
      border-collapse: collapse;
      thead {
        tr {
          text-transform: uppercase;
        }
      }
      tbody {
        tr {
          text-align: center;
          td {
            border-top: 1px solid lightgray;
            position: relative;
          }
        }
      }
    }
    th,
    td {
      padding: 12px 7px;
    }
  }

  @media only screen and (max-width: 1280px) {
    .table-box {
      h4 {
        font-size: 13px;
      }
      table {
        thead {
          display: none;
        }
        tbody {
          tr {
            border-top: 1px solid #45484d;
            td {
              display: grid;
              grid-auto-flow: column;
              justify-content: space-between;
              align-items: center;
              grid-gap: 1em;
              text-align: start;
              border: none;
              &::before {
                position: relative;
                top: 0;
                left: 0;
                padding: 12px 7px;
                content: attr(data-title);
              }
            }
          }
        }
      }
    }
  }
</style>
