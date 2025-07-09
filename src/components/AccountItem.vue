<script setup lang="ts">
    import { ref, computed, watchEffect, onMounted } from 'vue'; 
    import type { Ref } from 'vue'
    import { useAccountStore } from '../stores/AccountStore.vue';

    const accountStore = useAccountStore();
    interface Props {
        id: number,
        mark: object,
        type: string,
        login: string, 
        password?: string, 
    }
    const invalidAccountList: Ref<Boolean> = ref(false);

    const listType: Array<object> = ref([
        {
            name: 'LDAP'
        }, 
        {
            name: "Локально"
        }
    ])

    const props = defineProps<Props>()

    const arrayMark: Array<object> = ref(props.mark);
    const mark: Ref<string> = ref('');
    mark.value = arrayMark.value?.map(item => {
        return item.text;
    }).join(';');

    const type: Ref<object>  = ref({name: props.type});
    const login: Ref<string>  = ref(props.login);
    const password: Ref<string> = ref(props.password);


    const onValidationPassword = computed(()=>{
        if(type.value.name === listType.value[1].name){
            const containsUppercase = /[A-Z]/.test(password.value);
            const containsLowercase = /[a-z]/.test(password.value);
            const containsNumber = /[0-9]/.test(password.value);
            const containsCount = password.value?.length >= 8 && password.value !== null;
            return containsUppercase && containsLowercase && containsNumber && containsCount
        }
        else{
            return true;
        }
    })
  
    const onValidationLogin = computed(() => {
        const containsCount = login.value.length > 0;
        return containsCount;
    })

    const validationAccount = computed(() => {
        if(onValidationLogin.value && onValidationPassword.value){
            return true;
        }
        else{
            return false;
        }
    })

    function saveAccoutInStorage(){
        if(validationAccount.value){
            const arrayMarks = mark.value.split(';');
            const newMarks = [];
            arrayMarks.forEach( item => {
                newMarks.push({text: item});
            })

            if(type.value.name === listType.value[0].name){
                accountStore.saveAccount(props.id, type.value.name, login.value, null, newMarks);
            }
            else{
                accountStore.saveAccount(props.id, type.value.name, login.value, password.value, newMarks )
            }
        }
        else{
            console.log('Не сохранилось');
        }
    }
    
    onMounted(()=>{
        // watchEffect(()=>{
        //     if(validationAccount.value){
        //         const arrayMarks = mark.value.split(';');
        //         const newMarks = [];
        //         arrayMarks.forEach( item => {
        //             newMarks.push({text: item});
        //         })

        //         if(type.value.name === listType.value[0].name){
        //             accountStore.saveAccount(props.id, type.value.name, login.value, null, newMarks);
        //         }
        //         else{
        //             accountStore.saveAccount(props.id, type.value.name, login.value, password.value, newMarks )
        //         }
        //     }
        // })
    })
    
    function deleteAccount(id){
        accountStore.deleteAccount(id);
    }

</script>
<template lang="">
    <div class="account-item ">
        <TextArea 
            class="account-item__mark" 
            v-model='mark'
            placeholder='mark1; mark2'
            maxlength = "50"
            rows="1"
            autoResize
            :onFocusout = "saveAccoutInStorage()"
        ></TextArea>

        <Select 
            class="account-item__type" 
            v-model='type' 
            :options="listType" 
            optionLabel="name" 
            name="city.name"
            @change = "saveAccoutInStorage()"
            />


        <InputText 
            class="account-item__login" 
            :class="type.name === listType[1].name ? '' : 'without-password'" 
            v-model='login'
            placeholder='admin'
            maxlength = "100"
            :invalid = "!onValidationLogin"
            :onFocusout = "saveAccoutInStorage()"
            >
        </InputText>
        
        <Password
            v-if='type.name === listType[1].name'
            class="account-item__password" 
            v-model='password'
            placeholder='1234'
            toggleMask
            maxlength = "100"
            :invalid = "!onValidationPassword"
            :onBlur = "saveAccoutInStorage()">
            <template #footer>
                <div class="account-item__password-hint">
                    <span> Пароль должен состоять минимум: </span>
                    <ul>
                        <li>1 буква строчна</li>
                        <li>1 буква заглавная</li>
                        <li>1 цифра</li>
                        <li>Минимум 8 символов</li>
                    </ul>
                </div>
                
            </template>
        </Password>

        <Button 
            icon="pi pi-trash" 
            class="account-item__delete" 
            severity="danger" 
            @click='deleteAccount(props.id)'>
        </Button>        
    </div>
</template>

<style lang="scss">
    .account-item {
        display: grid;
        gap: 10px;
        align-items: start;
        grid-template-columns: 150px 150px 150px 150px 50px;
        grid-row: 1fr;
        justify-content: space-evenly;

		&__mark {
            width: 100%;
		}

		&__type {
            width: 100%;
		}

		&__login {
            width: 100%;
            &.without-password{
                grid-column-start: 3;
                grid-column-end: 5;
            }
		}

		&__password {
            width: 100%;
            max-width: 150px;
            &>.p-inputtext{
                width: 100%;
            }
            
		}
        &__password-hint{
            display: flex;
            flex-direction: column;
            gap: 5px;

            margin-top: 10px;
            span{
                font-size: 14px;
                font-weight: 600;
            }
            ul{
                list-style-type: none;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
        }

		&__delete {
            grid-row-start: 1;
            grid-row-end: 2;
            grid-column-start: 5;
            grid-column-end: 6;
		}
    }
</style>