<template>
    <div id="myeditor"></div>
</template>

<script setup>
import { onMounted,defineEmits,defineProps } from 'vue';
import E from 'wangeditor'
//定义子传父的方法
const emit=defineEmits('event')
//存储子接受父的数据
const props=defineProps({
    content:String
})
onMounted(() => {
    const editor = new E('#myeditor')
    editor.create()
    //设置编辑器内容初始值
    props.content && editor.txt.html(props.content)
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
        // console.log("change 之后最新的 html", newHtml);
        //子传父
        emit('event',newHtml)
    };
})
</script>

<style lang="scss" scoped></style>