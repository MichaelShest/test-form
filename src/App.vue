<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Hint from './components/Hint.vue';
  import AccountList from './components/AccountList.vue';
  import { useAccountStore } from './stores/AccountStore.vue';

  const accountStore = useAccountStore();
  console.log( accountStore);

  function addAccount(){
    accountStore.addNewAccount();
  }


</script>

<template>
  <main>
    <div class="container"> 

      <div class="header">
        <h1>Учетная запись</h1>
        <Button icon="pi pi-plus" rounded @click="addAccount()"> </Button>
      </div>
      <Hint :label="'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;'"></Hint>
      <AccountList :accounts="accountStore.accounts"></AccountList>
    </div>
  </main>
 
</template>

<style scoped lang="scss">
  main{    
    display: flex;
    width: 100%;
    height: 100%;
    .container{
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 130px;
      padding: 25px 35px;
      border-radius: 20px;
      border: 1px solid gray;
      max-width: 900px;
    }
    .header{
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
</style>
