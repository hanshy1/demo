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

  @Prop({ default: 0 })
  minWidth?: number

  @Prop({ default: 0 })
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

  // 判断宽度是否在限定范围
  get isWidthVaild(): boolean {
    return this.rectWidth >= (this.minWidth || 0) && (!this.maxWidth || this.rectWidth < this.maxWidth)
  }

  // 判断高度是否在限定范围
  get isHeightValid(): boolean {
    return this.rectHeight >= (this.minHeight || 0) && (!this.maxHeight || this.rectHeight < this.maxHeight)
  }

  @Watch('isZooming', { immediate: true })
  onIsZoomingChange(newValue: boolean): void {
    if (newValue) {
      window.addEventListener('mouseup', this.onRectZooming, true)
      window.addEventListener('mousemove', this.endZoomRect, true)
    } else {
      window.removeEventListener('mouseup', this.onRectZooming, true)
      window.removeEventListener('mousemove', this.endZoomRect, true)
    }
  }

  created(): void {
    this.rectHeight = 200
    this.rectWidth = 200
    this.rectPositionX = 100
    this.rectPositionY = 100
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

  onRectZooming(): void {
    this.isZooming = false
  }

  endZoomRect(e: MouseEvent): void {
    e.stopPropagation()
    e.preventDefault()
    if (!this.isZooming) {
      return
    }

    const zoomEndX = e.clientX
    const zoomEndY = e.clientY
    const offsetX = zoomEndX - this.zoomStartX
    const offsetY = zoomEndY - this.zoomStartY
    this.zoomStartX = zoomEndX
    this.zoomStartY = zoomEndY

    // 根据缩放模式进行缩放
    switch (this.zoomMode) {
    case 'top-left':
      this.rectPositionX += this.isWidthVaild ? offsetX : 0
      this.rectPositionY += this.isHeightValid ? offsetY : 0
      this.rectHeight += this.isHeightValid ? (-1 * offsetY) : 0
      this.rectWidth += this.isWidthVaild ? (-1 * offsetX) : 0
      break
    case 'top':
      this.rectPositionY += this.isHeightValid ? offsetY : 0
      this.rectHeight += this.isHeightValid ? (-1 * offsetY) : 0
      break
    case 'top-right':
      this.rectPositionY += this.isHeightValid ? offsetY : 0
      this.rectHeight += this.isHeightValid ? (-1 * offsetY) : 0
      this.rectWidth += this.isWidthVaild ? offsetX : 0
      break
    case 'left':
      this.rectPositionX += this.isWidthVaild ? offsetX : 0
      this.rectWidth += this.isWidthVaild ? (-1 * offsetX) : 0
      break
    case 'right':
      this.rectWidth += this.isWidthVaild ? offsetX : 0
      break
    case 'bottom-left':
      this.rectPositionX += this.isWidthVaild ? offsetX : 0
      this.rectHeight += this.isHeightValid ? offsetY : 0
      this.rectWidth += this.isWidthVaild ? (-1 * offsetX) : 0
      break
    case 'bottom':
      this.rectHeight += this.isHeightValid ? offsetY : 0
      break
    case 'bottom-right':
      this.rectHeight += this.isHeightValid ? offsetY : 0
      this.rectWidth += this.isWidthVaild ? offsetX : 0
      break
    default:
      break
    }
  }

  onDragStart(e: DragEvent): void {
    this.dragStartX = e.clientX
    this.dragStartY = e.clientY
  }

  onDragEnd(e: DragEvent): void {
    const offsetX = e.clientX - this.dragStartX
    const offsetY = e.clientY - this.dragStartY
    this.rectPositionX += offsetX
    this.rectPositionY += offsetY
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
    cursor:n-resize
  }

  .zoom-rect-top-left {
    cursor:nw-resize
  }

  .zoom-rect-top-right {
    cursor:ne-resize
  }

  .zoom-rect-right {
    cursor:e-resize
  }

  .zoom-rect-bottom {
    cursor:s-resize
  }

  .zoom-rect-bottom-left {
    cursor:sw-resize
  }

  .zoom-rect-bottom-right {
    cursor:se-resize
  }

  .zoom-rect-left {
    cursor:w-resize
  }
</style>