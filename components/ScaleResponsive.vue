<script>
export default {};
</script>
<script setup>
import { ref, onMounted, toRefs, reactive } from "vue";

const props = defineProps({
    width: {
        type: Number,
        default: 1920,
    },
    height: {
        type: Number,
        default: 1080,
    },
});

const emit = defineEmits(["onSetScale"]);

const styleObject = reactive({
    width: props.width + "px",
    height: props.height + "px",
});

const scaleEl = ref(null);

function getScale() {
    const { width, height } = props;
    const { innerWidth, innerHeight } = window;
    let vw = innerWidth / width;
    let vh = innerHeight / height;
    return vw < vh ? vw : vh;
}

function setScale() {
    let newScale = getScale();
    scaleEl.value.style.setProperty("--scale", newScale);
    emit("onSetScale", props, newScale);
}

function debouce(cb, delay) {
    let timer = null;
    return function () {
        let context = this,
            args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            typeof cb === "function" && cb.apply(context, [...args]);
        }, delay || 280);
    };
}

onMounted(() => {
    setScale();
    window.addEventListener("resize", debouce(setScale));
});
</script>

<template>
    <div class="scale-responsive" :style="styleObject" ref="scaleEl">
        <slot></slot>
    </div>
</template>

<style lang="css" scoped>
.scale-responsive {
    --scale: 1;
    transform: scale(var(--scale)) translate(-50%, -50%);
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transition: 0.3s;
}
</style>
