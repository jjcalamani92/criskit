<script>
// @ts-nocheck

  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
  const items = [
    {
      6: gridHelp.item({
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        draggable: false,
        max: { w: 2 },
      }),
      id: 1,
      data: {
        name: 'Holas'
      }
    },
    {
      6: gridHelp.item({
        x: 2,
        y: 0,
        w: 2,
        h: 2,
        draggable: false,
        max: { w: 2 },
      }),
      id: 2,
      data: {
        name: 'Hola'
      }
    },
    {
      6: gridHelp.item({
        x: 4,
        y: 0,
        w: 2,
        h: 2,
        draggable: false,
        max: { w: 2 },
      }),
      id: 3,
      data: {
        name: 'Hola'
      }
    },
    
    
  ];
  
  const cols = [[1200, 6]];
  </script>
  <Grid gap={[10, 5]} {items} {cols} rowHeight={150} let:item let:dataItem>
    <div>{dataItem.data.name}</div>
  </Grid>