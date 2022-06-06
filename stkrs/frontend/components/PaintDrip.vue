<template>
  <svg class="-tw-mt-px" :class="shadow && 'tw-drop-shadow-md'" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path :fill="color" vector-effect="non-scaling-stroke"
      :d="pathD"
    />
  </svg>
</template>

<script>
export default {
  name: 'PaintDrip',

  props: {
    numDrops: { type: Number, default: 5 },
    color: { type: String, default: '' },

    shadow: { type: Boolean, default: false },
  },

  computed: {
    pathD() {
      let d = 'M 0 0 '
      const xInc = 100 / this.numDrops 
      let xPrev = 0, yPrev = 0
      let x1, x2, y1, y2
      for ( let i = 0; i < this.numDrops; ++i ) {
        x1 = ( (i+1) * xInc ) - xInc/2
        x2 = (i+1) * xInc
        y1 = Math.random() * 100
        y2 = i !== this.numDrops-1 ? (Math.random() * 100) : 0
        
        d += `C ${xPrev+xInc/4},${yPrev} ${xPrev+xInc/4},${y1} ${x1},${y1}`
        d += `C ${x1+xInc/4},${y1} ${x1+xInc/4},${y2} ${x2},${y2} `

        xPrev = x2
        yPrev = y2
      }
      d += 'Z'
      return d
    },
  },
}
</script>