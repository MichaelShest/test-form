<script setup lang="ts">

    interface Props {
        label: string
    }
    
    const props = withDefaults(defineProps<Props>(), {
            label: "Подсказка",
        })

</script>

<template>
    <div class="hint"> 
      <i class="pi pi-info-circle"></i>
      <span>{{ props.label }}</span>
    </div>
</template>

<style lang="scss" scoped>
    .hint{
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: rgba(197, 197, 255, 0.508);
        padding: 10px;
        border-radius: 10px;
        i{
            width: 16px;
            height: 16px;
        }

        span{

        }
    }
</style>
