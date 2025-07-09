<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type { Ref } from 'vue';
    import AccountItem from './AccountItem.vue';

    interface Props {
        accounts?: object,
    }
    const props = defineProps<Props>()
    const isMounted: Ref<Boolean> = ref(false);
        
    onMounted(() => {
        isMounted.value = true;
    })

</script>

<template>

    <div class="account-list" v-if="isMounted">
        <template v-if="props.accounts?.length > 0">
            <div class="account-list__head">
                <span>Метки</span>
                <span>Тип Записи</span>
                <span>Логин</span>
                <span>Пароль</span>
            </div>
            <template v-for="account in props.accounts" :key="account.id">
                <AccountItem 
                    :id = 'account.id'
                    :mark = 'account.mark'
                    :type = 'account.type'
                    :login = 'account.login'
                    :password = 'account.password'>
                </AccountItem>
            </template>              
        </template>    
        <template v-else>
            <div class="account-list__empty">
                <p>Создайте новые аккаунты</p>
            </div>
        </template>  
      
    </div>
 
</template>

<style scoped lang="scss">

.account-list{
    display: flex;
    gap: 5px;
    flex-direction: column;
    &__head{
        display: grid;
        gap: 10px;
        align-items: start;
        grid-template-columns: 150px 150px 150px 150px 50px;
        grid-row: 1fr;
        justify-content: space-evenly;
        margin-bottom: 10px;
        span{
            font-size: 16px;
            color: rgb(172, 172, 172);
        }
    }

    &__empty{
        align-self: center;
        justify-self: center;
        p{

        }
    }
}
 
</style>
