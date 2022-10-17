<script>
export default {};
</script>
<script setup>
import { emit } from "process";
import { ref, onMounted, unref, computed } from "vue";

const props = defineProps({
    // 容器（设计稿）大小
    width: {
        type: String,
        default: "auto",
    },
    height: {
        type: String,
        default: "auto",
    },
    // 容器比例 v-model:scale
    scale: {
        type: Number,
        default: 1,
        required: true,
    },
});

const emits = defineEmits(["onScale", "update:scale"]);

const minScale = 0.1;
const maxScale = 2;
const isDraging = ref(false);
const chartBox = ref(null);
const wrapBox = ref(null);
const wrapBoxScale = computed({
    get() {
        return unref(props).scale;
    },
    set(val) {
        emits("update:scale", val);
    },
});
const wrapBoxTranslateX = ref(0);
const wrapBoxTranslateY = ref(0);

const wheelZoom = (e) => {
    // 获取最外层根缩放的scale
    let rootScale = getComputedStyle(document.body).getPropertyValue("--scale");
    let wrap = wrapBox.value;
    const wrapWidth = wrap.clientWidth * rootScale;
    const wrapHeight = wrap.clientHeight * rootScale;
    let translate = {
        x: wrapBoxTranslateX.value,
        y: wrapBoxTranslateY.value,
    };
    // 开始缩放时 - 缩放比
    let scale = wrapBoxScale.value;

    // 每次缩放的幅度
    let step = e.deltaY > 0 ? 1 / 1.1 : 1.1;

    // 计算新的scale
    scale *= step;
    if (scale > maxScale) {
        step = 1;
        scale = maxScale;
    }
    if (scale < minScale) {
        step = 1;
        scale = minScale;
    }

    // 计算偏移量
    const origin = {
        x: (step - 1) * wrapWidth * 0.5,
        y: (step - 1) * wrapHeight * 0.5,
    };

    translate.x -= (step - 1) * (e.clientX - translate.x) - origin.x;
    translate.y -= (step - 1) * (e.clientY - translate.y) - origin.y;

    wrapBoxTranslateX.value = translate.x;
    wrapBoxTranslateY.value = translate.y;

    wrapBoxScale.value = scale;
    emits("onScale", scale);
};

const dragMove = (e) => {
    isDraging.value = true;
    let rootScale = getComputedStyle(document.body).getPropertyValue("--scale");
    let wrap = wrapBox.value;

    // 鼠标按下时的指针点位
    let lastPointerMove = {
        x: e.clientX,
        y: e.clientY,
    };

    // 添加指针移动事件
    wrap.addEventListener("pointermove", move, { passive: false });
    function move(e) {
        e.preventDefault();
        wrap.setPointerCapture(e.pointerId);

        const curPointer = {
            x: e.clientX,
            y: e.clientY,
        };

        wrapBoxTranslateX.value +=
            (curPointer.x - lastPointerMove.x) / rootScale / wrapBoxScale.value;
        wrapBoxTranslateY.value +=
            (curPointer.y - lastPointerMove.y) / rootScale / wrapBoxScale.value;

        lastPointerMove = {
            x: curPointer.x,
            y: curPointer.y,
        };
    }
    // 添加鼠标抬起事件，鼠标抬起，将事件移除
    wrap.addEventListener(
        "pointerup",
        () => {
            isDraging.value = false;
            wrap.removeEventListener("pointermove", move, { passive: false });
        },
        { passive: false }
    );
    // 指针事件中断
    wrap.addEventListener(
        "pointercancel",
        () => {
            wrap.removeEventListener("pointermove", move, { passive: false });
        },
        { passive: false }
    );
};
</script>

<template>
    <div class="zoom-drag-box" ref="chartBox">
        <div
            ref="wrapBox"
            class="wrap-box"
            @mousewheel.prevent="wheelZoom"
            @pointerdown.prevent="dragMove"
            :style="{
                cursor: isDraging ? 'grabbing' : 'grab',
                width: props.width,
                height: props.height,
                transform:
                    'scale(' +
                    wrapBoxScale +
                    ') translate(' +
                    wrapBoxTranslateX +
                    'px, ' +
                    wrapBoxTranslateY +
                    'px)',
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.zoom-drag-box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .wrap-box {
        position: relative;
        transition: translate 0.05s ease;
    }
}
</style>
