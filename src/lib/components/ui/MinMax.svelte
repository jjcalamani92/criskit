



<div class="">
  <Grid bind:items={items} rowHeight={100} let:item {cols} let:index>
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      {index + 1} {item.max.w}
    </div>
  </Grid>
</div>

<script>
// @ts-nocheck

import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";

const id = () => "_" + Math.random().toString(36).substr(2, 9);

const COL = 10;

let items = [
  {
    [COL]: gridHelp.item({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      max: { w: 2, h: 2 },
    }),
    id: id(),
  },

  {
    [COL]: gridHelp.item({
      x: 2,
      y: 0,
      w: 2,
      h: 2,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
  {
    [COL]: gridHelp.item({
      x: 4,
      y: 0,
      w: 2,
      h: 2,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
  {
    [COL]: gridHelp.item({
      x: 6,
      y: 0,
      w: 2,
      h: 2,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
  {
    [COL]: gridHelp.item({
      x: 2,
      y: 0,
      w: 2,
      h: 2,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
  {
    [COL]: gridHelp.item({
      x: 2,
      y: 2,
      w: 2,
      h: 2,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
  {
    [COL]: gridHelp.item({
      x: 4,
      y: 0,
      w: 2,
      h: 4,
      max: { w: 4, h: 5 },
    }),
    id: id(),
  },
];


const cols = [
  [ 1100, 10 ],
];
</script>