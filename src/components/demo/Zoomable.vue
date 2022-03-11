<template>
  <div class="rect-container">
    <div 
      id="rect"
      ref="rect"
      :draggable="isDraggable"
      :class="[zoomRectCursor]"
      :style="{ height: `${rectHeight}px`, width: `${rectWidth}px`, left: `${rectPositionX}px`, top: `${rectPositionY}px` }"
      @mousedown="startZoomRect"
      @mousemove="onMouseMove"
      @dragstart="onDragStart"
      @dragend="onDragEnd">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component({})
export default class VariableRectangle extends Vue {
  @Prop({ default: 'false' })
  isDraggable?: string

  @Prop({ default: 10 })
  minWidth?: number

  @Prop({ default: 10 })
  minHeight?: number

  @Prop()
  maxWidth?: number

  @Prop()
  maxHeight?: number

  private rectHeight = 0
  private rectWidth = 0
  private rectPositionX = 0
  private rectPositionY = 0
  private zoomRectCursor = ''
  private zoomStartX = 0
  private zoomStartY = 0
  private isZooming = false
  private zoomMode = ''
  private dragStartX = 0
  private dragStartY = 0

  private readonly MIN_RECT_HEIGHT = 100
  private readonly MIN_RECT_WIDTH = 100

  @Watch('isZooming', { immediate: true })
  onIsZoomingChange(newValue: boolean): void {
    if (newValue) {
      window.addEventListener('mouseup', this.endZoomRect, true)
      window.addEventListener('mousemove', this.onRectZooming, true)
    } else {
      window.removeEventListener('mouseup', this.endZoomRect, true)
      window.removeEventListener('mousemove', this.onRectZooming, true)
    }
  }

  created(): void {
    this.rectHeight = 200
    this.rectWidth = 200
    this.rectPositionX = 100
    this.rectPositionY = 100
    this.setBoundaryCoordinate()
  }

  startZoomRect(e: MouseEvent): void {
    this.zoomStartX = e.clientX
    this.zoomStartY = e.clientY
    if (this.zoomRectCursor) {
      this.isZooming = true
    }

    console.log('mouseDown')
  }

  onMouseMove(e: MouseEvent): void {
    const mouseX = e.offsetX
    const mouseY = e.offsetY
    const borderWidth = 5
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rectHeight = this.$refs.rect.clientHeight
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rectWidth = this.$refs.rect.clientWidth

    // 切换缩放光标样式
    if (mouseX <= borderWidth && mouseY <= borderWidth) {
      this.zoomRectCursor = 'zoom-rect-top-left'
      this.zoomMode = 'top-left'
    } else if (mouseX > borderWidth && mouseX < (rectWidth - borderWidth) && mouseY < borderWidth) {
      this.zoomRectCursor = 'zoom-rect-top'
      this.zoomMode = 'top'
    } else if (mouseX >= (rectWidth - borderWidth) && mouseY <= borderWidth) {
      this.zoomRectCursor = 'zoom-rect-top-right'
      this.zoomMode = 'top-right'
    } else if (mouseX <= borderWidth && mouseY > borderWidth && mouseY < (rectHeight - borderWidth)) {
      this.zoomRectCursor = 'zoom-rect-left'
      this.zoomMode = 'left'
    } else if (mouseX >= (rectWidth - borderWidth) && mouseY > borderWidth && mouseY < (rectHeight - borderWidth)) {
      this.zoomRectCursor = 'zoom-rect-right'
      this.zoomMode = 'right'
    } else if (mouseX <= borderWidth && mouseY >= (rectHeight - borderWidth)) {
      this.zoomRectCursor = 'zoom-rect-bottom-left'
      this.zoomMode = 'bottom-left'
    } else if (mouseX > borderWidth && mouseX < (rectWidth - borderWidth) && mouseY >= (rectHeight - borderWidth)) {
      this.zoomRectCursor = 'zoom-rect-bottom'
      this.zoomMode = 'bottom'
    } else if (mouseX >= (rectWidth - borderWidth) && mouseY >= (rectHeight - borderWidth)) {
      this.zoomRectCursor = 'zoom-rect-bottom-right'
      this.zoomMode = 'bottom-right'
    } else {
      this.zoomRectCursor = ''
      this.zoomMode = ''
    }
  }

  endZoomRect(): void {
    this.isZooming = false
    this.setBoundaryCoordinate()
  }

  onRectZooming(e: MouseEvent): void {
    e.stopPropagation()
    e.preventDefault()
    console.log('move ', this.zoomMode)
    if (!this.isZooming) {
      return
    }

    const zoomEndX = e.clientX
    const zoomEndY = e.clientY
    const offsetX = zoomEndX - this.zoomStartX
    const offsetY = zoomEndY - this.zoomStartY
    this.zoomStartX = zoomEndX
    this.zoomStartY = zoomEndY
    
    const positiveOffsetX = this.isWidthVaild(this.rectWidth + offsetX) ? offsetX : 0
    const positiveOffsetY = this.isHeightValid(this.rectHeight + offsetY) ? offsetY : 0
    const negativeOffsetX = this.isWidthVaild(this.rectWidth + (-1 * offsetX)) ? (-1 * offsetX) : 0 
    const negativeOffsetY = this.isHeightValid(this.rectHeight + (-1 * offsetY)) ? (-1 * offsetY) : 0

    // 根据缩放模式进行缩放
    switch (this.zoomMode) {
    case 'top-left':
      this.rectPositionX += positiveOffsetX
      this.rectPositionY += positiveOffsetY
      this.rectHeight += negativeOffsetY
      this.rectWidth += negativeOffsetX
      break
    case 'top':
      this.rectPositionY += positiveOffsetY
      this.rectHeight += negativeOffsetY
      break
    case 'top-right':
      this.rectPositionY += positiveOffsetY
      this.rectHeight += negativeOffsetY
      this.rectWidth += positiveOffsetX
      break
    case 'left':
      this.rectPositionX += positiveOffsetX
      this.rectWidth += negativeOffsetX
      break
    case 'right':
      this.rectWidth += positiveOffsetX
      break
    case 'bottom-left':
      this.rectPositionX += positiveOffsetX
      this.rectHeight += positiveOffsetY
      this.rectWidth += negativeOffsetX
      break
    case 'bottom':
      this.rectHeight += positiveOffsetY
      break
    case 'bottom-right':
      this.rectHeight += positiveOffsetY
      this.rectWidth += positiveOffsetX
      break
    default:
      break
    }
  }

  // 判断宽度是否在限定范围
  isWidthVaild(width: number): boolean {
    return width >= (this.minWidth || 10) && (!this.maxWidth || this.rectWidth <= this.maxWidth)
  }

  // 判断高度是否在限定范围
  isHeightValid(height: number): boolean {
    return height >= (this.minHeight || 10) && (!this.maxHeight || this.rectHeight <= this.maxHeight)
  }

  setBoundaryCoordinate(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rect = this.$refs.rect.getBoundingClientRect()
  }

  onDragStart(e: DragEvent): void {
    this.dragStartX = e.clientX
    this.dragStartY = e.clientY
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
    }
    document.body.addEventListener('dragover', this.onDragging, true)
  }

  onDragEnd(e: DragEvent): void {
    const offsetX = e.clientX - this.dragStartX
    const offsetY = e.clientY - this.dragStartY
    this.rectPositionX += offsetX
    this.rectPositionY += offsetY
    document.body.removeEventListener('dragover', this.onDragging, true)
  }

  onDragging(e: DragEvent): void {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
    }
  }
}
</script>
<style scoped>
  .rect-container {
    position: relative;
  }

  #rect {
    position: fixed;
    background-color: azure;
    border: 1px solid black;
  }

  .zoom-rect-top {
    cursor:n-resize !important
  }

  .zoom-rect-top-left {
    cursor:nw-resize !important
  }

  .zoom-rect-top-right {
    cursor:ne-resize !important
  }

  .zoom-rect-right {
    cursor:e-resize !important
  }

  .zoom-rect-bottom {
    cursor:s-resize !important
  }

  .zoom-rect-bottom-left {
    cursor:sw-resize !important
  }

  .zoom-rect-bottom-right {
    cursor:se-resize !important
  }

  .zoom-rect-left {
    cursor:w-resize !important
  }
</style>