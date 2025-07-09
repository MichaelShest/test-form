<script lang="ts">
    import {defineStore} from 'pinia'
    import { ref, computed, watch} from 'vue'
    import type { Ref } from 'vue'

    type Account = {
        id: number,
        mark: [],
        type: object,
        login: string, 
        password?: string, 
    }

    export const useAccountStore = defineStore('accountStore', () => {
            const accountInLocalStorage = localStorage.getItem('accounts');
            const accounts: Ref<Account[]> =  ref([]); 
            if(accountInLocalStorage){
                accounts.value = JSON.parse(accountInLocalStorage);
            }
            const totalCountAccount = computed(()=>{
                return accounts.value.length;
            })

            const addNewAccount = () => {
                let newId = null;
                if(accounts.value.length > 0){
                    newId = accounts.value[accounts.value.length - 1].id + 1;
                }
                else{
                    newId = 1;
                }

                accounts.value.push({ 
                    id: newId,
                    mark: [],
                    type: 'LDAP' ,
                    login: '',
                    password: null,
                })
            }

            const saveAccount = (id, newType, newLogin, newPassword, newMarks ) => {
                accounts.value.forEach((item) => {
                    if(item.id === id){
                        item.type =  newType;
                        item.mark = newMarks;
                        item.login = newLogin;
                        item.password = newPassword;
                    }
                })
                localStorage.setItem('accounts', JSON.stringify(accounts.value))
            }

            const deleteAccount = ( id ) => {
                accounts.value.forEach( ( item , index) =>{
                    if(item.id === id){
                        accounts.value.splice(index, 1)
                    }
                })
                localStorage.setItem('accounts', JSON.stringify(accounts.value));
            }

            return {
                accounts, 
                totalCountAccount, 
                deleteAccount, 
                addNewAccount,
                saveAccount,
            }
        })

        
</script>